import { Module } from "@nestjs/common";
import { ListsController } from "./lists.controller.ts";
import { ListsService } from "./lists.service.ts";

@Module({
  controllers: [ListsController],
  providers: [ListsService],
})
export class ListsModule {}
