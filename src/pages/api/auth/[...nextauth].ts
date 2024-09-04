//---------------------------- IMPORTS -----------------------------------

import NextAuth from "next-auth/next";

import GoogleProvider from 'next-auth/providers/google'

//-----------------------------CONECT GOOGLE -----------------------------

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        })
    ],
    secreat: process.env.JWT_SECRET as string,
}

export default NextAuth(authOptions);

