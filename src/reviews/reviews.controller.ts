import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ReviewsService } from "./reviews.service.ts";
import { RequestHeader } from "../decorator/request-header.decorator.ts";
import {
  AuthDTO,
  CreateReviewDTO,
  ExampleReviewResponseDTO,
} from "./dto/review.dto.ts";
import { ApiBody, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";

@ApiTags("Reviews")
@Controller("movie/review")
export class ReviewsController {
  constructor(private reviewService: ReviewsService) {}

  @ApiOperation({ description: "Return all reviews from a specific user." })
  @ApiParam({
    name: "userId",
    description: "The firebase user id",
  })
  @ApiBody({
    type: ExampleReviewResponseDTO,
    description: "The review object",
    examples: {
      movieReview: {
        summary: "Movie Review Object",
        value: [{
          "userId": "qnydtrfNxWSKBZrZvLYkvMIY7k72",
          "averagedAdvancedScore": 5,
          "notes": "Testing notes validation! :)",
          "tmdbID": 37169,
          "advancedScore": {
            "acting": 5,
            "characters": 5,
            "cinematography": 5,
            "climax": 5,
            "ending": 5,
            "music": 5,
            "personalScore": 5,
            "plot": 5,
            "theme": 5,
            "visuals": 5,
          },
          "public": false,
          "title": "test",
          "votes": {
            "upVote": [],
            "downVote": [],
          },
          "createdAt": "2024-10-21T19:09:37.239Z",
          "updatedAt": "2024-10-21T19:09:37.239Z",
          "reviewedDate": "2024-05-02",
          "_id": "6716a6f1f03c97646ca20773",
          "__v": 0,
        }] as ExampleReviewResponseDTO[],
      },
    },
  })
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
