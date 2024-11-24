import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, type PipelineStage } from "mongoose";
import { FirebaseAdmin } from "../../config/firebase.setup.ts";
import { Reviews, ReviewsDocument } from "../schema/reviews.schema.ts";
import {
  SearchResponseDTO,
  SearchReviewQueryDTO,
} from "./dto/searchReview.dto.ts";
import { type DecodedIdToken } from "firebase-admin/auth";
import { variableMovieDetailsPipeline } from "../pipelines/movieDetails.ts";
import convertSortOrder from "../utils/convertSortOrder.ts";
import { capitalizeFirstLetter } from "../utils/capitalisation.ts";

@Injectable()
export class SearchService {
  constructor(
    @InjectModel(Reviews.name) private reviewModal: Model<ReviewsDocument>,
    private readonly admin: FirebaseAdmin,
  ) {}

  async searchReviews(
    searchQuery: SearchReviewQueryDTO,
    authToken?: string,
  ): Promise<SearchResponseDTO> {
    const app = this.admin.setup();
    let user: DecodedIdToken | undefined = undefined;
    const pipeline: PipelineStage[] = [];

    if (authToken) {
      user = await app?.auth().verifyIdToken(authToken);
    }

    // lookup the movie details for the review
    pipeline.push(...variableMovieDetailsPipeline(!!searchQuery.withCast));

    if (searchQuery.userId) {
      pipeline.push({
        $match: {
          userId: searchQuery.userId,
        },
      });
    }

    if (searchQuery.userId && !user) {
      pipeline.push({
        $match: {
          public: true,
        },
      });
    }

    if (searchQuery.withCast) {
      const cast = searchQuery.withCast.split(",").map((actor) => +actor);
      pipeline.push({
        $match: {
          "movieDetails.credits.cast.id": {
            $in: cast,
          },
        },
      });
    }

    if (searchQuery.tmdbID) {
      pipeline.push({
        $match: {
          tmdbID: searchQuery.tmdbID,
        },
      });
    }

    if (searchQuery.maxRevenue) {
      pipeline.push({
        $match: {
          "movieDetails.revenue": {
            $lte: searchQuery.maxRevenue,
          },
        },
      });
    }

    if (searchQuery.minRevenue) {
      pipeline.push({
        $match: {
          "movieDetails.revenue": {
            $gte: searchQuery.minRevenue,
          },
        },
      });
    }

    if (searchQuery.maxBudget) {
      pipeline.push({
        $match: {
          "movieDetails.budget": {
            $lte: searchQuery.maxBudget,
          },
        },
      });
    }

    if (searchQuery.minBudget) {
      pipeline.push({
        $match: {
          "movieDetails.budget": {
            $gte: searchQuery.minBudget,
          },
        },
      });
    }

    if (searchQuery.maxRuntime) {
      pipeline.push({
        $match: {
          "movieDetails.runtime": {
            $lte: searchQuery.maxRuntime,
          },
        },
      });
    }

    if (searchQuery.minRuntime) {
      pipeline.push({
        $match: {
          "movieDetails.runtime": {
            $gte: searchQuery.minRuntime,
          },
        },
      });
    }

    if (searchQuery.reviewDateGte) {
      pipeline.push({
        $match: {
          reviewedDate: {
            $gte: searchQuery.reviewDateGte,
          },
        },
      });
    }

    if (searchQuery.reviewDateLte) {
      pipeline.push({
        $match: {
          reviewedDate: {
            $lte: searchQuery.reviewDateLte,
          },
        },
      });
    }

    if (searchQuery.genre) {
      const genres = searchQuery.genre.split(",").map((genre) =>
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

    if (searchQuery.sort_by) {
      const [name, order, category] = searchQuery.sort_by.split(".");

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

    pipeline.push({
      $unset: "movieDetails.credits",
    });

    const countPipeline = [...pipeline];

    pipeline.push({
      $skip: searchQuery.pageNumber * searchQuery.pageSize,
    });

    pipeline.push({
      $limit: searchQuery.pageSize,
    });

    countPipeline.push({
      $count: "totalCount",
    });

    const reviews = await this.reviewModal.aggregate(pipeline);
    const countResult = await this.reviewModal.aggregate(countPipeline);
    const totalCount = countResult[0]?.totalCount || 0;

    const totalNumberOfPages = Math.floor(totalCount / searchQuery.pageSize);

    return {
      pageNumber: searchQuery.pageNumber,
      pageSize: searchQuery.pageSize,
      totalNumberOfPages,
      totalCount,
      reviews,
    };
  }

  async searchUsers() {}

  async searchLists() {}
}
