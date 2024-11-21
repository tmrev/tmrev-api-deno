import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UnauthorizedException,
} from "@nestjs/common";
import { ReviewsService } from "./reviews.service.ts";
import { RequestHeader } from "../decorator/request-header.decorator.ts";
import {
  CreateReviewDTO,
  ExampleReviewResponseDTO,
  OptionalAuthDTO,
  ReviewQueryDTO,
} from "./dto/review.dto.ts";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import {
  createPrivateReviewExampleObject,
  createPublicReviewExampleObject,
  multipleMovieReviewExampleObject,
  singleMovieReviewExampleObject,
  updateReviewExampleObject,
} from "../swagger/example/reviews.ts";

@ApiTags("Reviews")
@ApiBearerAuth("authorization")
@Controller("movie")
export class ReviewsController {
  constructor(private reviewService: ReviewsService) {}

  @ApiOperation({ description: "Return all reviews from a specific user." })
  @ApiParam({
    name: "userId",
    description: "The firebase user id",
    example: "qnydtrfNxWSKBZrZvLYkvMIY7k72",
    type: String,
  })
  @ApiResponse({
    type: ExampleReviewResponseDTO,
    description: "The review object",
    example: multipleMovieReviewExampleObject,
  })
  @Get("reviews/:userId")
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

  @Get("review/:reviewId")
  @ApiParam({
    name: "reviewId",
    description: "The review id",
    example: "5f9c8d3e3f3e4c001f6d1a3d",
    type: String,
  })
  @ApiResponse({
    type: ExampleReviewResponseDTO,
    description: "The review object",
    example: singleMovieReviewExampleObject,
  })
  async getReview(
    @Param("reviewId") reviewId: string,
    @RequestHeader(OptionalAuthDTO) headers: { authToken: string },
  ) {
    const result = await this.reviewService.getReview(
      reviewId,
      headers.authToken || undefined,
    );

    return result;
  }

  @Post("/review")
  @ApiBody({
    type: CreateReviewDTO,
    description: "The review object",
    examples: {
      "publicReview": {
        summary: "Public Review",
        description: "Create a review for a movie",
        value: createPublicReviewExampleObject,
      },
      "privateReview": {
        summary: "Private Review",
        description: "Create a review for a movie",
        value: createPrivateReviewExampleObject,
      },
    },
  })
  async createReview(
    @Body() createReview: CreateReviewDTO,
    @RequestHeader(OptionalAuthDTO) headers: { authToken: string },
  ) {
    const { authToken } = headers;

    if (!authToken) {
      throw new UnauthorizedException("No authorization token provided");
    }

    const result = await this.reviewService.createUserReview(
      createReview,
      authToken,
    );

    return result;
  }

  @Put("review/:reviewId")
  @ApiParam({
    name: "reviewId",
    description: "The review id",
    example: "5f9c8d3e3f3e4c001f6d1a3d",
    type: String,
  })
  @ApiBody({
    type: CreateReviewDTO,
    description: "The review object",
    examples: {
      "updateReview": {
        summary: "Update Review",
        description: "Update a review for a movie",
        value: updateReviewExampleObject,
      },
    },
  })
  async updateReview(
    @Param("reviewId") reviewId: string,
    @Body() updateReview: CreateReviewDTO,
    @RequestHeader(OptionalAuthDTO) headers: { authToken: string },
  ) {
    const { authToken } = headers;

    if (!authToken) {
      throw new UnauthorizedException("No authorization token provided");
    }

    const result = await this.reviewService.updateUserReview(
      reviewId,
      updateReview,
      authToken,
    );

    return result;
  }
}
