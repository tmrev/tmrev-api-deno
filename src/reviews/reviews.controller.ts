import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { ReviewsService } from "./reviews.service.ts";
import { RequestHeader } from "../decorator/request-header.decorator.ts";
import {
  AuthDTO,
  CreateReviewDTO,
  ExampleReviewResponseDTO,
  OptionalAuthDTO,
  ReviewQueryDTO,
} from "./dto/review.dto.ts";
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { movieReviewExampleObject } from "../swagger/example/reviews.ts";

@ApiTags("Reviews")
@ApiBearerAuth("authorization")
@Controller("movie/review")
export class ReviewsController {
  constructor(private reviewService: ReviewsService) {}

  @ApiOperation({ description: "Return all reviews from a specific user." })
  @ApiParam({
    name: "userId",
    description: "The firebase user id",
    example: "qnydtrfNxWSKBZrZvLYkvMIY7k72",
    type: String,
  })
  @ApiHeader({
    name: "authorization",
    description: "Firebase Auth Token",
    required: false,
  })
  @ApiResponse({
    type: ExampleReviewResponseDTO,
    description: "The review object",
    example: movieReviewExampleObject,
  })
  @Get(":userId")
  async getUserReviews(
    @Param("userId") userId: string,
    @Query() reviewQuery: ReviewQueryDTO,
    @RequestHeader(OptionalAuthDTO) headers: { authToken: string },
  ) {
    const result = await this.reviewService.getUserReviews(
      userId,
      headers.authToken || undefined,
      reviewQuery,
    );

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
