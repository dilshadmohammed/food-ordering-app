import { closeDatabaseConnection, connectToDatabase } from "@/dbconnect/dbConnect";
import { User } from "@/models/User";
import bcrypt from 'bcrypt';
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from 'next-auth/providers/google'
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/libs/mongoConnect";

const handler = NextAuth({
  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
  },
  adapter: MongoDBAdapter(clientPromise),
    providers: [ 
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      }),
        CredentialsProvider({
          name: 'Credentials',
          id: 'credentials',
          credentials: {
            email: { label: "Email", type: "email", placeholder: "test@example.com" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials) {
            const email = credentials?.email
            const password = credentials?.password

            try {
              await connectToDatabase();
              
              const user = await User.findOne({ email })
              
              if (user && bcrypt.compareSync(password, user.password)) {
                return user;
              } else {
                return Promise.reject('/auth/signin?error=InvalidCredentials');
              }
            } catch (error) {
              return Promise.reject('/auth/signin?error=UnknownError');
            } finally {
              await closeDatabaseConnection();
            }
          }
        })
      ],
      
})

export { handler as GET, handler as POST }