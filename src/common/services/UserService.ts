import { PostConfirmationTriggerEvent } from "aws-lambda"
import { cognitoPostSignUpUserAttributesToUser } from "../mappers/Cognito"
import { UserProfile } from "../types/User"
import { getTimestamp } from "../util/date"
import { CognitoPostSignUpTriggerUserAttributes } from "../types/Cognito"
import UserRepository from "../repositories/UserRepository"

const addNewUserProps = (user: UserProfile): UserProfile => {
  return {
    ...user,
    createdAt: getTimestamp(),
    updatedAt: getTimestamp(),
  }
}

export default {
  createProfileForSignedUpUser: async (event: PostConfirmationTriggerEvent): Promise<UserProfile> => {
    const mappedUser = cognitoPostSignUpUserAttributesToUser(event.request.userAttributes as CognitoPostSignUpTriggerUserAttributes)
    const profile = addNewUserProps(mappedUser)
    const savedProfile = await UserRepository.saveProfile(profile)

    return savedProfile
  },
  fetchProfile: async (userId: string): Promise<UserProfile> => {
    const user = await UserRepository.fetchProfile(userId)

    return user
  },
}
