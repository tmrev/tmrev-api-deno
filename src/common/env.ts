import "jsr:@std/dotenv/load";

const MONGO_URI = Deno.env.get("DB_HOST") || "";

const env = {
  MONGO_URI,
};

export { env };
