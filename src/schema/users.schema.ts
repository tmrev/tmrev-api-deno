import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Date, HydratedDocument, Types } from "mongoose";

export type UsersDocument = HydratedDocument<Users>;

@Schema()
export class Users {
  @Prop({ required: true })
  email!: string;

  @Prop({ required: true })
  username!: string;

  @Prop({ required: true })
  firstName!: string;

  @Prop({ required: true })
  lastName!: string;

  @Prop()
  bio?: string;

  @Prop()
  location?: string;

  @Prop()
  photoUrl?: string;

  @Prop({ type: Boolean })
  public!: boolean;

  @Prop({ type: [Types.ObjectId], ref: "users" })
  followers!: Types.ObjectId[];

  @Prop({ type: [Types.ObjectId], ref: "users" })
  following!: Types.ObjectId[];

  @Prop({ required: true })
  uuid!: string;

  @Prop()
  createdAt!: Date;

  @Prop()
  updatedAt!: Date;

  @Prop({ type: [Types.ObjectId], ref: "reviews" })
  pinned!: Types.ObjectId[];

  @Prop()
  devices!: string[];
}

export const UsersSchema = SchemaFactory.createForClass(Users);
