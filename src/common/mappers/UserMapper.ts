import { UserProfile } from "../types/User"

type DynamoDbUserProfile = Omit<UserProfile, 'id'> & { sk: string, userId: string }
export const dynamoDbUserProfileToUserProfile = (dynamoDbUserProfile: DynamoDbUserProfile): UserProfile => ({
  id: dynamoDbUserProfile.userId,
  email: dynamoDbUserProfile.email,
  emailVerified: dynamoDbUserProfile.emailVerified,
  name: dynamoDbUserProfile.name,
  nickname: dynamoDbUserProfile.nickname,
  dateOfBirth: dynamoDbUserProfile.dateOfBirth,
  createdAt: dynamoDbUserProfile.createdAt,
  updatedAt: dynamoDbUserProfile.updatedAt,
  lastLoggedInAt: dynamoDbUserProfile.lastLoggedInAt,
  identities: dynamoDbUserProfile.identities,
})
