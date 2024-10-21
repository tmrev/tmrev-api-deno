import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Reviews, type ReviewsDocument } from "../schema/reviews.schema.ts";
import { Model } from "mongoose";
import { FirebaseAdmin } from "../../config/firebase.setup.ts";
import { type DecodedIdToken } from "firebase-admin/auth";
import type { CreateReviewDTO } from "./dto/review.dto.ts";
import getAveragedScore from "../utils/getAveragedScore.ts";

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Reviews.name) private reviewModal: Model<ReviewsDocument>,
    private readonly admin: FirebaseAdmin,
  ) {}

  async getUserReviews(
    userId: string,
    authToken?: string,
  ): Promise<ReviewsDocument[]> {
    const app = this.admin.setup();
    let user: DecodedIdToken | undefined = undefined;

    if (authToken) {
      user = await app?.auth().verifyIdToken(authToken);
    }

    const results = await this.reviewModal.find({ userId, public: !!user })
      .exec();

    return results;
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
