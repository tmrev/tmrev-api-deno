import {
  IsDateString,
  IsDefined,
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { ExampleReviewResponseDTO } from "../../reviews/dto/review.dto.ts";

export class SearchReviewQueryDTO {
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

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    required: false,
    example: "averagedAdvancedScore.desc",
  })
  readonly sort_by?: string;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => +value)
  @ApiProperty({
    type: Number,
    required: false,
    example: 630,
  })
  readonly tmdbID?: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    required: false,
    example: "qnydtrfNxWSKBZrZvLYkvMIY7k72",
  })
  readonly userId?: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({
    type: String,
    required: false,
    description: "Date format: YYYY-MM-DD ",
  })
  readonly reviewDateGte?: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({
    type: String,
    required: false,
    description: "Date format: YYYY-MM-DD",
  })
  readonly reviewDateLte?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    description: "Genre of movie to filter by separated by commas",
    required: false,
  })
  readonly genre?: string;

  @IsNumber()
  @Transform(({ value }) => +value)
  @IsOptional()
  @ApiProperty({
    type: Number,
    description: "min budget of movie to filter by",
    required: false,
  })
  readonly minBudget?: number;

  @IsNumber()
  @Transform(({ value }) => +value)
  @IsOptional()
  @ApiProperty({
    type: Number,
    description: "maximum budget of movie to filter by",
    required: false,
  })
  readonly maxBudget?: number;

  @IsNumber()
  @Transform(({ value }) => +value)
  @IsOptional()
  @ApiProperty({
    type: Number,
    description: "min runtime of movie to filter by",
    required: false,
  })
  readonly minRuntime?: number;

  @IsNumber()
  @Transform(({ value }) => +value)
  @IsOptional()
  @ApiProperty({
    type: Number,
    description: "maximum runtime of movie to filter by",
    required: false,
  })
  readonly maxRuntime?: number;

  @IsNumber()
  @Transform(({ value }) => +value)
  @IsOptional()
  @ApiProperty({
    type: Number,
    description: "min revenue of movie to filter by",
    required: false,
  })
  readonly minRevenue?: number;

  @IsNumber()
  @Transform(({ value }) => +value)
  @IsOptional()
  @ApiProperty({
    type: Number,
    description: "maximum revenue of movie to filter by",
    required: false,
  })
  readonly maxRevenue?: number;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    description: "Id of the cast member to filter by separated by commas",
    required: false,
  })
  readonly withCast?: string;
}

export class SearchResponseDTO {
  @IsNumber()
  readonly pageNumber!: number;

  @IsNumber()
  readonly pageSize!: number;

  @IsNumber()
  readonly totalNumberOfPages!: number;

  @IsNumber()
  readonly totalCount!: number;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => ExampleReviewResponseDTO)
  @ApiProperty()
  public reviews!: ExampleReviewResponseDTO[];
}
