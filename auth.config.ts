import type { NextAuthConfig } from "next-auth"
import { LoginSchem } from "./schemas"
import  Credential from "next-auth/providers/credentials"
import { getUserByEmail } from "./data/user"
import  bcrypt  from 'bcryptjs';
// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
     Credential({
      async authorize(credentials){
        const validatedFields = LoginSchem.safeParse(credentials)
        if(validatedFields.success){
          const {email,password}= validatedFields.data
          const userExistis = await getUserByEmail(email);
          if(!userExistis || !userExistis.password) return null;
          const passwordMatch = await bcrypt.compare(
            password,
            userExistis.password
          )
          if(passwordMatch) return userExistis;
        }
        return null;
      }
    })
  ],
} satisfies NextAuthConfig