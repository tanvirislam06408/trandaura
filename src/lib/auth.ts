import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/database";
const client = new MongoClient(mongoUri);
const db = client.db("trandaura");

export const auth = betterAuth({
    database: mongodbAdapter(db, {
        // Optional: if you don't provide a client, database transactions won't be enabled.
        client
    }),

    //...other options
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },


   user: {
    additionalFields: {
      role: {
        type: ["user", "admin"],
        required: false,
        defaultValue: "user",
        input: false, // don't allow user to set role
      },
      status: {
        type: ["active" , "blocked"],
        required: false,
        defaultValue: "active",
        input: false, // don't allow user to set role
      }
    },
  },

session: {
        cookieCache: {
            enabled: true,
            strategy: "jwt",

            // 7 days
            maxAge: 7 * 24 * 60 * 60
        }
    },

    plugins: [
        jwt()
    ]

});