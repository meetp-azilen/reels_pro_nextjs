import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { dbConnect } from "./db";
import User from "@/models/user.models";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if(!credentials?.email || !credentials?.password){
         throw new Error("Email and password are required");
        }

        try{
          await dbConnect();
          // Await the User.findOne() query to get the document or null
          const user = await User.findOne({ email: credentials.email }).exec();

          if (!user) {
            // It's often better to use a generic message for security reasons
            throw new Error("Invalid email or password");
          }

          // Now user is the actual document, so user.password is the hashed password from the DB
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            throw new Error("Invalid email or password");
          }

          // User is authenticated, return the user object for the session
          return {
            id: user._id.toString(), // user._id is accessible here
            email: user.email,
          };
        } catch (error: any) {
          // Log the error for debugging, but throw a more generic error to the client
          console.error("Authorization Error:", error.message);
          throw new Error(error.message || "Authentication failed");
        }
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
};
