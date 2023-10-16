import { CognitoPostSignUpTriggerUserAttributes, CognitoUserIdentity } from "../types/Cognito"
import { UserProfile, UserIdentity, UserIdentityProvider } from "../types/User"

const cognitoIdentitiesToUserIdentities = (cognitoIdentitiesStr: string): UserIdentity[] => {
  const cognitoIdentities: CognitoUserIdentity[] = JSON.parse(cognitoIdentitiesStr)
  const userIdentities: UserIdentity[] = cognitoIdentities.map((cognitoIdentity: CognitoUserIdentity) => ({
    providerType: cognitoIdentity.providerType as UserIdentityProvider,
    primary: cognitoIdentity.primary,
    dateCreated: cognitoIdentity.dateCreated,
    userId: cognitoIdentity.userId,
  }))

  return userIdentities
}

export const cognitoPostSignUpUserAttributesToUser = (cognitoPostSignupUserAttributes: CognitoPostSignUpTriggerUserAttributes): UserProfile => ({
  id: cognitoPostSignupUserAttributes.sub,
  email: cognitoPostSignupUserAttributes.email,
  emailVerified: cognitoPostSignupUserAttributes.email_verified === 'true',
  identities: cognitoIdentitiesToUserIdentities(cognitoPostSignupUserAttributes.identities),
})
