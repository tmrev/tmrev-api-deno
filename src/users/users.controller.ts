import {
  Controller,
  Delete,
  Get,
  NotImplementedException,
  Post,
  Put,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UsersService } from "./users.service.ts";

@ApiTags("User")
@ApiBearerAuth("authorization")
@Controller("user")
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post("/")
  async createUser() {
    throw new NotImplementedException();
  }

  @Get("/")
  async getUser() {
    throw new NotImplementedException();
  }

  @Put("/")
  async updateUser() {
    throw new NotImplementedException();
  }

  @Delete("/")
  async deleteUser() {
    throw new NotImplementedException();
  }

  @Get("/usernameAvailable")
  async isUser() {
    throw new NotImplementedException();
  }
}
