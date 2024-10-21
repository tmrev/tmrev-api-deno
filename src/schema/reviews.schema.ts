import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

type AdvancedScore = {
  acting: number;
  characters: number;
  cinematography: number;
  climax: number;
  ending: number;
  music: number;
  personalScore: number;
  plot: number;
  theme: number;
  visuals: number;
};

type ReviewVotes = {
  upVote: string[];
  downVote: string[];
};

export type ReviewsDocument = HydratedDocument<Reviews>;

@Schema()
export class Reviews {
  @Prop()
  userId!: string;

  @Prop()
  averagedAdvancedScore!: number;

  @Prop()
  notes!: string;

  @Prop()
  tmdbID!: number;

  @Prop(
    raw({
      acting: Number,
      characters: Number,
      cinematography: Number,
      climax: Number,
      ending: Number,
      music: Number,
      personalScore: Number,
      plot: Number,
      theme: Number,
      visuals: Number,
    }),
  )
  advancedScore!: AdvancedScore;

  @Prop()
  public!: boolean;

  @Prop()
  title!: string;

  @Prop(raw({ upVote: [String], downVote: [String] }))
  votes!: ReviewVotes;

  @Prop()
  createdAt!: Date;

  @Prop()
  updatedAt!: Date;

  @Prop()
  reviewedDate!: string;
}

export const ReviewsSchema = SchemaFactory.createForClass(Reviews);

export type { AdvancedScore, ReviewVotes };
