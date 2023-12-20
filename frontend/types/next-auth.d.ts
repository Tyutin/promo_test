import NextAuth, { Account, DefaultSession, User } from 'next-auth'
import 'next-auth/adapters'

declare module 'next-auth' {
  interface DefaultUser {
    id: string
    name?: string | null
    email?: string | null
    image?: string | null
  }
  interface User extends DefaultUser {
    firstName?: string | null
    lastName?: string | null
  }
  interface DefaultSession {
    user?: {
      name?: string | null
      email?: string | null
      image?: string | null
    }
    expires: ISODateString
  }
  interface Session extends DefaultSession {
    user: User
  }
}

declare module 'next-auth/adapters' {
  interface AdapterUser extends User {
    id: string
    email: string
    emailVerified: Date | null
  }
  interface AdapterAccount extends Account {
    userId: string
  }
  interface AdapterSession {
    /** A randomly generated value that is used to get hold of the session. */
    sessionToken: string
    /** Used to connect the session to a particular user */
    userId: string
    expires: Date
  }
}