import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Reviews, ReviewsSchema } from "../schema/reviews.schema.ts";
import { ReviewsService } from "./reviews.service.ts";
import { ReviewsController } from "./reviews.controller.ts";
import { FirebaseAdmin } from "../../config/firebase.setup.ts";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Reviews.name, schema: ReviewsSchema }]),
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService, FirebaseAdmin],
  exports: [ReviewsService],
})
export class ReviewsModule {}
