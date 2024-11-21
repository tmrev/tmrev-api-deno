import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Reviews, type ReviewsDocument } from "../schema/reviews.schema.ts";
import { Model, type PipelineStage } from "mongoose";
import { FirebaseAdmin } from "../../config/firebase.setup.ts";
import { type DecodedIdToken } from "firebase-admin/auth";
import type {
  CreateReviewDTO,
  ReviewQueryDTO,
  ReviewResponseDTO,
} from "./dto/review.dto.ts";
import getAveragedScore from "../utils/getAveragedScore.ts";
import { movieDetailsPipeline } from "../pipelines/movieDetails.ts";
import convertSortOrder from "../utils/convertSortOrder.ts";
import { capitalizeFirstLetter } from "../utils/capitalisation.ts";

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Reviews.name) private reviewModal: Model<ReviewsDocument>,
    private readonly admin: FirebaseAdmin,
  ) {}

  async getUserReviews(
    userId: string,
    authToken?: string,
    query: ReviewQueryDTO = {
      pageNumber: 0,
      pageSize: 10,
    },
  ): Promise<ReviewResponseDTO> {
    const app = this.admin.setup();
    let user: DecodedIdToken | undefined = undefined;
    const pipeline: PipelineStage[] = [];

    if (authToken) {
      user = await app?.auth().verifyIdToken(authToken);
    }

    if (query.advancedScore) {
      pipeline.push({
        $match: {
          userId,
          [`advancedScore.${query.advancedScore.category}`]:
            query.advancedScore.score,
        },
      });
    }

    // lookup the movie details for the review
    pipeline.push(...movieDetailsPipeline);

    // Match the user's reviews
    if (query.textSearch) {
      pipeline.push({
        $match: {
          userId,
          "movieDetails.title": {
            $regex: query.textSearch,
            $options: "i", // Case-insensitive search
          },
        },
      });
    } else {
      pipeline.push({
        $match: {
          userId,
        },
      });
    }

    if (!user) {
      pipeline.push({
        $match: {
          public: true,
        },
      });
    }

    if (query.sort_by) {
      const [name, order, category] = query.sort_by.split(".");

      if (category) {
        pipeline.push({
          $sort: {
            [`${category}.${name}`]: convertSortOrder(order),
          },
        });
      } else {
        pipeline.push({
          $sort: {
            [name]: convertSortOrder(order),
          },
        });
      }
    }

    if (query.genre) {
      const genres = query.genre.split(",").map((genre) =>
        capitalizeFirstLetter(genre.trim())
      );
      pipeline.push({
        $match: {
          "movieDetails.genres.name": {
            $in: genres,
          },
        },
      });
    }

    const countPipeline = [...pipeline];

    pipeline.push({
      $skip: query.pageNumber * query.pageSize,
    });

    pipeline.push({
      $limit: query.pageSize,
    });

    countPipeline.push({
      $count: "totalCount",
    });

    console.log(pipeline);

    const reviews = await this.reviewModal.aggregate(pipeline);
    const countResult = await this.reviewModal.aggregate(countPipeline);
    const totalCount = countResult[0]?.totalCount || 0;

    const totalNumberOfPages = Math.floor(totalCount / query.pageSize);

    return {
      pageNumber: query.pageNumber,
      pageSize: query.pageSize,
      totalNumberOfPages,
      totalCount,
      reviews,
    };
  }

  async createUserReview(
    review: CreateReviewDTO,
    authToken: string,
  ): Promise<ReviewsDocument> {
    const app = this.admin.setup();
    const user = await app?.auth().verifyIdToken(authToken);

    if (!user) {
      throw new NotFoundException("User not found or invalid token");
    }

    const payload: Reviews = {
      ...review,
      votes: {
        upVote: [],
        downVote: [],
      },
      averagedAdvancedScore: getAveragedScore(review.advancedScore),
      userId: user.uid,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const newReview = new this.reviewModal(payload);

    return newReview.save();
  }
}
