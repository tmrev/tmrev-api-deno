import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller.ts";
import { UsersService } from "./users.service.ts";
import { FirebaseAdmin } from "../../config/firebase.setup.ts";
import { MongooseModule } from "@nestjs/mongoose";
import { Users, UsersSchema } from "../schema/users.schema.ts";

@Module({
  imports: [
    // MongooseModule.forFeature([{
    //   name: Users.name,
    //   schema: UsersSchema,
    // }]),
  ],
  controllers: [UsersController],
  providers: [UsersService, FirebaseAdmin],
  exports: [UsersService],
})
export class UsersModule {}
