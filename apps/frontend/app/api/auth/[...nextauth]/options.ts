import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import axios from "axios"

export const authOptions: AuthOptions = {

  providers: [
    CredentialsProvider({
      name: "Ethereum",
      credentials: {
        message: { label: "Message", type: "text" },
        signature: { label: "Signature", type: "text" },
      },

      async authorize(credentials) {
        if (!credentials?.message || !credentials?.signature) {
          return null
        }

        try {
          const response = await axios.post(
            "http://localhost:8000/api/auth/siwe", // your express API endpoint
            {
              message: credentials.message,
              signature: credentials.signature,
            },
            {
              headers: { "Content-Type": "application/json" },
            }
          )

          const user = response.data.user

          if (user && user.address) {
            return {
              id: user.address, // wallet address becomes ID
              wallet: user.address,
              name: user.name || null,
              email: user.email || null, // optional if you want to bind email later
              token: response.data.token, // JWT from backend
            }
          }

          return null
        } catch (error: any) {
          console.error("❌ SIWE authorize error:", error?.response?.data || error.message)
          return null
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user
      return token
    },
    async session({ session, token }) {
      if (token.user) session.user = token.user as any
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
}
