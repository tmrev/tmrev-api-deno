import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { env } from "./common/env.ts";
import { AppController } from "./app.controller.ts";
import { AppService } from "./app.service.ts";
import { ReviewsModule } from "./reviews/reviews.module.ts";
import { SearchModule } from "./search/search.module.ts";
import { UsersModule } from "./users/users.module.ts";
import { ListsModule } from './lists/lists.module';

@Module({
  imports: [
    MongooseModule.forRoot(env.MONGO_URI),
    ReviewsModule,
    SearchModule,
    UsersModule,
    ListsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
