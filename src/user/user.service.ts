import { Injectable } from "@nestjs/common";
import { FirebaseAdmin } from "../../config/firebase.setup.ts";

@Injectable()
export class UserService {
  constructor(private readonly admin: FirebaseAdmin) {}
}
