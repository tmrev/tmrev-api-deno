import { SearchService } from "./search.service.ts";
import {
  Controller,
  Get,
  NotImplementedException,
  Query,
} from "@nestjs/common";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { SearchReviewQueryDTO } from "./dto/searchReview.dto.ts";
import { RequestHeader } from "../decorator/request-header.decorator.ts";
import {
  ExampleReviewResponseDTO,
  OptionalAuthDTO,
} from "../reviews/dto/review.dto.ts";
import { multipleMovieReviewExampleObject } from "../swagger/example/reviews.ts";

@ApiTags("Search")
@ApiBearerAuth("authorization")
@Controller("search")
export class SearchController {
  constructor(private searchService: SearchService) {}

  @ApiResponse({
    type: ExampleReviewResponseDTO,
    description: "The review object",
    example: multipleMovieReviewExampleObject,
  })
  @Get("/reviews")
  async searchReviews(
    @Query() searchQuery: SearchReviewQueryDTO,
    @RequestHeader(OptionalAuthDTO) headers: { authToken: string },
  ) {
    const result = await this.searchService.searchReviews(
      searchQuery,
      headers.authToken,
    );

    return result;
  }

  @Get("/users")
  async searchUsers() {
    throw new NotImplementedException();
  }

  @Get("/lists")
  async searchLists() {
    throw new NotImplementedException();
  }
}
