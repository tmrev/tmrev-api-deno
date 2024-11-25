import { Injectable } from "@nestjs/common";
import { FirebaseAdmin } from "../../config/firebase.setup.ts";
import { InjectModel } from "@nestjs/mongoose";
import { Users, UsersDocument } from "../schema/users.schema.ts";
import { Model } from "mongoose";

@Injectable()
export class UsersService {
  constructor(
    // @InjectModel(Users.name) private userModel: Model<UsersDocument>,
    private readonly admin: FirebaseAdmin,
  ) {}
}
