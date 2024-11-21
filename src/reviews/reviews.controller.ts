import {
  Body,
  Controller,
  Get,
  Param,
  Post,
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
  movieReviewExampleObject,
} from "../swagger/example/reviews.ts";

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
      throw new UnauthorizedException();
    }

    const result = await this.reviewService.createUserReview(
      createReview,
      authToken,
    );

    return result;
  }
}
