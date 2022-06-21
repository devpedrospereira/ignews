import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        params: { 
          scope: 'read:user' //irá devolver apenas as informações basicas de perfil do usuario (name, username, email, avatar...)
        }
      }
      
    }),
    // ...add more providers here
  ],
})