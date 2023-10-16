export interface UserProfile {
  id: string
  email: string
  emailVerified?: boolean
  name?: string
  nickname?: string
  dateOfBirth?: string
  createdAt?: number
  updatedAt?: number
  lastLoggedInAt?: number
  identities?: UserIdentity[]
  avatar?: string | null
}

export type UserIdentity = {
  providerType?: UserIdentityProvider
  primary?: boolean
  dateCreated?: number
  userId: string
}

export type UserIdentityProvider = 'Google' | 'Unknown'
