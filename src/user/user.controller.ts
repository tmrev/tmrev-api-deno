import {
  Controller,
  Delete,
  Get,
  NotImplementedException,
  Post,
  Put,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service.ts";

@ApiTags("User")
@ApiBearerAuth("authorization")
@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

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
