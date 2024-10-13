import NextAuth, { type DefaultSession } from "next-auth"
import authConfig from "@/auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./lib/db";
import { UserRole } from "@prisma/client";
import { LOGIN_URI ,ERROR_URI} from "./routes";
// import { getUserById } from "./data/user";


declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      role: UserRole
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession["user"]
  }
}


export const { handlers,
  signIn,
  signOut,
  auth } = NextAuth({
    pages : {
      signIn : LOGIN_URI,
      error : ERROR_URI,
    },
    events :{
      async linkAccount({user}){
        await db.user.update({
          where :{id: user.id},
          data : {
            emailVerified : new Date()
          }
        })
      }
    },
    callbacks: {
      // async signIn({user}){
      //       const existingUser = await getUserById(user?.id as string)
      //       if(!existingUser || !existingUser?.emailVerified ){
      //           return false;
      //       }
      //       return true;
      // },
      async session({ session, token }) {

        if (token.sub && session.user) {
          session.user.id = token.sub;
        }
        if (token.role && session.user) {
          session.user.role = token.role as UserRole;
        }
        return session;
      },
      async jwt({ token, user }) {
        if (user) {
          token.role = user?.role;
        }
        if (!token.sub) return token;
        // const existingUser = await getUserById(token.sub)
        // if(!existingUser) return token;
        // token.role = existingUser.role
        return token;
      }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig
  })