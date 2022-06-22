import {query as q, query} from 'faunadb'
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import {fauna} from '../../../services/faunadb'

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
  ],
  callbacks: {//essa função será chamada toda vez que o usuario fazer o login. 
    async signIn({ user, account, profile, credentials }) {
      const {email} = user

      try{
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(
                  q.Index('user_by_email'),
                  q.Casefold(user.email),
                ),
              ),
            ),
            q.Create(
              q.Collection('users'),
              {data:{email}}
            ),
            q.Get(
              q.Match(
                q.Index('user_by_email'),
                q.Casefold(user.email),
              )
            )
          )
        )
        return true
      }

      catch{
        return false
      }

      // const isAllowedToSignIn = true
      // if (isAllowedToSignIn) {
      //   return true
      // } else {
      //   // Return false to display a default error message
      //   return false
      //   // Or you can return a URL to redirect to:
      //   // return '/unauthorized'
      // }

    }
  }
})