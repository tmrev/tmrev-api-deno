import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { env } from "./common/env.ts";
import { AppController } from "./app.controller.ts";
import { AppService } from "./app.service.ts";
import { ReviewsModule } from "./reviews/reviews.module.ts";
import { SearchModule } from "./search/search.module.ts";

@Module({
  imports: [MongooseModule.forRoot(env.MONGO_URI), ReviewsModule, SearchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
