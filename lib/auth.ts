
import { setServers } from "node:dns";
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

// DNS workaround for the MongoDB SRV lookup issue on your computer.
setServers(["8.8.8.8", "8.8.4.4"]);

const mongodbUri = process.env.MONGODB_URI;

if (!mongodbUri) {
  throw new Error("MONGODB_URI is missing from environment variables");
}

const client = new MongoClient(mongodbUri);
const db = client.db("bazardor");

export const auth = betterAuth({
  // Allow requests from local development and your production website.
  trustedOrigins: [
    "http://localhost:3000",
    "https://bazardor-ceu6.vercel.app",
  ],

  // MongoDB database connection
  database: mongodbAdapter(db),

  // Email and password authentication
  emailAndPassword: {
    enabled: true,
  },

  // Account linking for Google and GitHub
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "github"],
      updateUserInfoOnLink: true,
    },
  },

  // Social authentication providers
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    },

    github: {
      clientId: process.env.GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
    },
  },
});