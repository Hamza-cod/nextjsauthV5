import type { NextAuthConfig } from "next-auth"
import { LoginSchem } from "./schemas"
import  Credential from "next-auth/providers/credentials"
import { getUserByEmail } from "./data/user"
import  bcrypt  from 'bcryptjs';
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"
// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Google({
      clientId : process.env.GOOGLE_CLIENT_ID,
      clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    }),
    Github ({
      clientId : process.env.GITHUB_CLIENT_ID,
      clientSecret : process.env.GITHUB_CLIENT_SECRET,
    }),
     Credential({
      async authorize(credentials)  {
        const validatedFields = LoginSchem.safeParse(credentials)
        if(!validatedFields.success){
          return null;
        }
        const {email,password}= validatedFields.data
        const userExistis = await getUserByEmail(email);
        if(!userExistis || !userExistis.password) return null;
        const passwordMatch = await bcrypt.compare(
          password,
          userExistis.password
        )
        if(!passwordMatch) return null;
        return userExistis;
      }
    })
  ],
} satisfies NextAuthConfig