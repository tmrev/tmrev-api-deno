import { Controller } from "@nestjs/common";
import { AppService } from "./app.service.ts";

@Controller("hello")
export class AppController {
  constructor(private readonly appService: AppService) {}
}
