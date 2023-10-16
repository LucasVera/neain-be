export type CognitoPostSignUpTriggerUserAttributes = {
  sub: string
  email_verified: string
  'cognito:user_status': string
  identities: string
  email: string
}

export type CognitoUserIdentity = {
  userId: string
  providerName: string
  providerType: string
  issuer?: string | null
  primary: boolean
  dateCreated: number
}
