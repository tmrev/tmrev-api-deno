import {
  IsBoolean,
  IsDateString,
  IsDefined,
  IsNotEmptyObject,
  IsNumber,
  IsString,
  ValidateNested,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Expose, Transform, Type } from "class-transformer";

export class AuthDTO {
  @IsString()
  @IsDefined()
  @Expose({ name: "authorization" })
  readonly authToken!: string;
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
