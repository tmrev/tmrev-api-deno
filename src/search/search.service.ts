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

    const matchConditions: { [key: string]: any } = {
      userId: searchQuery.userId,
      tmdbID: searchQuery.tmdbID,
      "movieDetails.revenue": {
        $lte: searchQuery.maxRevenue,
        $gte: searchQuery.minRevenue,
      },
      "movieDetails.budget": {
        $lte: searchQuery.maxBudget,
        $gte: searchQuery.minBudget,
      },
      "movieDetails.runtime": {
        $lte: searchQuery.maxRuntime,
        $gte: searchQuery.minRuntime,
      },
      reviewedDate: {
        $gte: searchQuery.reviewDateGte,
        $lte: searchQuery.reviewDateLte,
      },
    };

    for (const [key, value] of Object.entries(matchConditions)) {
      if (value !== undefined && value !== null) {
        if (typeof value === "object" && !Array.isArray(value)) {
          const subConditions = Object.entries(value).filter(([_, v]) =>
            v !== undefined && v !== null
          );
          if (subConditions.length > 0) {
            pipeline.push({
              $match: { [key]: Object.fromEntries(subConditions) },
            });
          }
        } else {
          pipeline.push({ $match: { [key]: value } });
        }
      }
    }

    if (searchQuery.userId && !user) {
      pipeline.push({ $match: { public: true } });
    }

    if (searchQuery.withCast) {
      const cast = searchQuery.withCast.split(",").map((actor) => +actor);
      pipeline.push({
        $match: { "movieDetails.credits.cast.id": { $in: cast } },
      });
    }

    if (searchQuery.genre) {
      const genres = searchQuery.genre.split(",").map((genre) =>
        capitalizeFirstLetter(genre.trim())
      );
      pipeline.push({
        $match: { "movieDetails.genres.name": { $in: genres } },
      });
    }

    if (searchQuery.sort_by) {
      const [name, order, category] = searchQuery.sort_by.split(".");
      const sortField = category ? `${category}.${name}` : name;
      pipeline.push({ $sort: { [sortField]: convertSortOrder(order) } });
    }

    // remove the cast from the movie details, cause the request to be large
    pipeline.push({ $unset: "movieDetails.credits" });

    const countPipeline = [...pipeline];

    pipeline.push({ $skip: searchQuery.pageNumber * searchQuery.pageSize });
    pipeline.push({ $limit: searchQuery.pageSize });

    countPipeline.push({ $count: "totalCount" });

    console.dir(pipeline, { depth: null });

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
