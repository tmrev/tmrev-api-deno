import { Module } from "@nestjs/common";
import { UserController } from "./user.controller.ts";
import { UserService } from "./user.service.ts";
import { FirebaseAdmin } from "../../config/firebase.setup.ts";

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, FirebaseAdmin],
  exports: [UserService],
})
export class UserModule {}
