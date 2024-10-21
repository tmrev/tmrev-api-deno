import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ReviewsService } from "./reviews.service.ts";
import { RequestHeader } from "../decorator/request-header.decorator.ts";
import { AuthDTO, CreateReviewDTO } from "./dto/review.dto.ts";

@Controller("movie/review")
export class ReviewsController {
  constructor(private reviewService: ReviewsService) {}

  @Get(":userId")
  async getUserReviews(@Param("userId") userId: string) {
    const result = await this.reviewService.getUserReviews(userId);

    return result;
  }

  @Post()
  async createReview(
    @Body() createReview: CreateReviewDTO,
    @RequestHeader(AuthDTO) headers: { authToken: string },
  ) {
    const result = await this.reviewService.createUserReview(
      createReview,
      headers.authToken,
    );

    return result;
  }
}
