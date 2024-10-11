import NextAuth from "next-auth"
import authConfig from "@/auth.config"
import { PrismaAdapter } from './node_modules/@auth/prisma-adapter/index';
import { db } from "./lib/db";
export const { handlers , signIn, signOut, auth } = NextAuth({
 adapter :PrismaAdapter(db),
 session : {strategy : "jwt"},
  ...authConfig
})