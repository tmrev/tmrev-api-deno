import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import admin from "firebase-admin";

let app: admin.app.App | null = null;

@Injectable()
export class FirebaseAdmin implements OnApplicationBootstrap {
  async onApplicationBootstrap() {
    if (!app) {
      const firebaseServiceAccountFile = await Deno.readTextFile(
        "./config/firebaseServiceAccountKey.json",
      );

      const serviceAccount = await JSON.parse(firebaseServiceAccountFile);

      app = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    }
  }
  setup() {
    return app;
  }
}
