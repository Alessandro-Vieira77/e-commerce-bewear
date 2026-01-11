import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "@/src/db";
import * as schema from "@/src/db/schema";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  baseURL: process.env.NEXT_PUBLIC_BASE_URL as string,
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  user: {
    modelName: "userTable",
  },
  session: {
    modelName: "sessionTable",
  },
  account: {
    modelName: "accountTable",
  },
  verification: {
    modelName: "verificationTable",
  },
});
