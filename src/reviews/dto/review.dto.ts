import {
  IsBoolean,
  IsDateString,
  IsDefined,
  IsNotEmptyObject,
  IsNumber,
  IsString,
  ValidateNested,
} from "class-validator";
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
  readonly acting!: number;

  @IsDefined()
  @IsNumber()
  readonly characters!: number;

  @IsDefined()
  @IsNumber()
  readonly cinematography!: number;

  @IsDefined()
  @IsNumber()
  readonly climax!: number;

  @IsDefined()
  @IsNumber()
  readonly ending!: number;

  @IsDefined()
  @IsNumber()
  readonly music!: number;

  @IsDefined()
  @IsNumber()
  readonly personalScore!: number;

  @IsDefined()
  @IsNumber()
  readonly plot!: number;

  @IsDefined()
  @IsNumber()
  readonly theme!: number;

  @IsDefined()
  @IsNumber()
  readonly visuals!: number;
}

export class CreateReviewDTO {
  @IsString()
  readonly title!: string;

  @IsBoolean()
  @Transform(({ value }) =>
    value === "true" ? true : value === "false" ? false : value
  )
  readonly public!: boolean;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => AdvancedScoreDTO)
  readonly advancedScore!: AdvancedScoreDTO;

  @IsDefined()
  @IsNumber()
  readonly tmdbID!: number;

  @IsDefined()
  readonly notes!: string;

  @IsDateString({ "strictSeparator": true })
  readonly reviewedDate!: string;
}
