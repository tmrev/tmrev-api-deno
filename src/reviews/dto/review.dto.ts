import {
  IsBoolean,
  IsDateString,
  IsDefined,
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Expose, Transform, Type } from "class-transformer";
import { reviewAdvancedScoreExampleObject } from "../../swagger/example/reviews.ts";

export class OptionalAuthDTO {
  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    description: "Firebase Auth Token",
    name: "authorization",
    required: false,
  })
  @Expose({ name: "authorization" })
  readonly authToken?: string;
}

export class AuthDTO {
  @IsString()
  @IsDefined()
  @Expose({ name: "authorization" })
  readonly authToken!: string;
}

export class AdvancedScoreQueryDTO {
  @IsString()
  @IsDefined()
  category?: string;

  @IsNumber()
  @IsDefined()
  score!: number;
}

export class AdvancedScoreDTO {
  @IsDefined()
  @IsNumber()
  @ApiProperty()
  readonly acting!: number;

  @IsDefined()
  @IsNumber()
  @ApiProperty()
  readonly characters!: number;

  @IsDefined()
  @IsNumber()
  @ApiProperty()
  readonly cinematography!: number;

  @IsDefined()
  @IsNumber()
  readonly climax!: number;

  @IsDefined()
  @IsNumber()
  @ApiProperty()
  readonly ending!: number;

  @IsDefined()
  @IsNumber()
  @ApiProperty()
  readonly music!: number;

  @IsDefined()
  @IsNumber()
  @ApiProperty()
  readonly personalScore!: number;

  @IsDefined()
  @IsNumber()
  @ApiProperty()
  readonly plot!: number;

  @IsDefined()
  @IsNumber()
  @ApiProperty()
  readonly theme!: number;

  @IsDefined()
  @IsNumber()
  @ApiProperty()
  readonly visuals!: number;
}

export class ReviewVotesDTO {
  @IsString({ each: true })
  @ApiProperty()
  readonly upVote!: string[];

  @IsString({ each: true })
  @ApiProperty()
  readonly downVote!: string[];
}

export class ExampleReviewResponseDTO {
  @IsString()
  @ApiProperty({
    title: "ID",
    description: "The unique identifier of the review",
  })
  public _id!: string;

  @IsNumber()
  @ApiProperty({
    title: "Version",
    description: "The version of the review",
  })
  public __v!: number;

  @IsString()
  @ApiProperty({
    title: "User ID",
    description: "The firebase user id",
  })
  public userId!: string;

  @IsNumber()
  @ApiProperty({
    title: "Averaged Advanced Score",
    description: "The pre-calculated average of the advanced score",
  })
  public averagedAdvancedScore!: number;

  @IsString()
  @ApiProperty({
    title: "Notes",
    description: "The user created notes of the review",
  })
  public notes!: string;

  @IsNumber()
  @ApiProperty({
    title: "TMDB ID",
    description: "The TMDB ID of the movie",
  })
  public tmdbID!: number;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => AdvancedScoreDTO)
  @ApiProperty({
    title: "Advanced Score",
    description: "The advanced score of the review",
  })
  public advancedScore!: AdvancedScoreDTO;

  @IsBoolean()
  @ApiProperty({
    title: "Public",
    description: "The visibility of the review",
  })
  public public!: boolean;

  @IsString()
  @ApiProperty({
    title: "Title",
    description: "The title of the review, defaults to the movie title",
  })
  public title!: string;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => ReviewVotesDTO)
  @ApiProperty({
    title: "Votes",
    description: "The votes of the review",
  })
  public votes!: ReviewVotesDTO;

  @IsDateString()
  @ApiProperty({
    title: "Created At",
    description: "The date the review was created",
  })
  public createdAt!: string;

  @IsDateString()
  @ApiProperty({
    title: "Updated At",
    description: "The date the review was last updated",
  })
  public updatedAt!: string;

  @IsDateString()
  @ApiProperty({
    title: "Reviewed Date",
    description:
      "The date the review was reviewed. Able to be updated by user.",
  })
  public reviewedDate!: string;
}

export class CreateReviewDTO {
  @IsString()
  @ApiProperty()
  readonly title!: string;

  @IsBoolean()
  @ApiProperty()
  @Transform(({ value }) =>
    value === "true" ? true : value === "false" ? false : value
  )
  readonly public!: boolean;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @ApiProperty()
  @Type(() => AdvancedScoreDTO)
  readonly advancedScore!: AdvancedScoreDTO;

  @IsDefined()
  @IsNumber()
  @ApiProperty()
  readonly tmdbID!: number;

  @IsDefined()
  @ApiProperty()
  readonly notes!: string;

  @IsDateString({ "strictSeparator": true })
  @ApiProperty()
  readonly reviewedDate!: string;
}

export class ReviewQueryDTO {
  @IsNumber()
  @IsDefined()
  @Transform(({ value }) => +value)
  @ApiProperty({
    type: Number,
    description: "The page number starts at 0",
    example: 0,
  })
  readonly pageNumber!: number;

  @IsNumber()
  @IsDefined()
  @Transform(({ value }) => +value)
  @ApiProperty({
    type: Number,
    description: "The number of reviews per page",
    example: 10,
  })
  readonly pageSize!: number;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    description: "Genre of movie to filter by separated by commas",
    example: "Action",
    required: false,
  })
  readonly genre?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => AdvancedScoreQueryDTO)
  @ApiProperty({
    type: AdvancedScoreQueryDTO,
    description: "User score review",
    example: reviewAdvancedScoreExampleObject,
    required: false,
  })
  readonly advancedScore?: AdvancedScoreQueryDTO;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: "Search text; searches title and notes",
    required: false,
  })
  readonly textSearch?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    required: false,
    example: "averagedAdvancedScore.desc",
  })
  readonly sort_by?: string;
}

export class ReviewResponseDTO {
  @IsNumber()
  @ApiProperty({
    type: Number,
    description: "The total number of pages",
    example: 1,
  })
  public totalNumberOfPages!: number;

  @IsNumber()
  @ApiProperty({
    type: Number,
    description: "The current page number starts at 0",
    example: 0,
  })
  public pageNumber!: number;

  @IsNumber()
  @ApiProperty({
    type: Number,
    description: "The number of reviews per page",
    example: 10,
  })
  public pageSize!: number;

  @IsNumber()
  @ApiProperty({
    type: Number,
    description: "The total number of reviews",
    example: 1,
  })
  public totalCount!: number;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => ExampleReviewResponseDTO)
  @ApiProperty()
  public reviews!: ExampleReviewResponseDTO[];
}
