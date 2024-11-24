import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { SearchController } from "./search.controller.ts";
import { SearchService } from "./search.service.ts";
import { FirebaseAdmin } from "../../config/firebase.setup.ts";
import { Reviews, ReviewsSchema } from "../schema/reviews.schema.ts";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Reviews.name, schema: ReviewsSchema }]),
  ],
  controllers: [SearchController],
  providers: [SearchService, FirebaseAdmin],
  exports: [SearchService],
})
export class SearchModule {}
