import aws from "../aws"
import { dynamoDbUserProfileToUserProfile } from "../mappers/UserMapper"
import { UserProfile } from "../types/User"

const userTableName = process.env.USER_TABLE_NAME

type UserProfileDynamoDto = UserProfile & { sk: string, userId: string }

export default {
  saveProfile: async (user: UserProfile) => {
    const savedUserProfile = await aws.dynamodb.putItem<UserProfileDynamoDto>(userTableName, {
      ...user,
      sk: 'profile#',
    })

    return dynamoDbUserProfileToUserProfile(savedUserProfile)
  },
  updateOne: async (user: UserProfile) => {
    const updateUser = await aws.dynamodb.updateItem<UserProfileDynamoDto>(
      userTableName,
      { ...user, sk: 'profile#' },
      [{ itemName: 'userId', itemValue: user.id }, { itemName: 'sk', itemValue: 'profile#' }]
    )

    return dynamoDbUserProfileToUserProfile(updateUser)
  },
  fetchProfile: async (userId: string) => {
    const dynamodbUserProfile = await aws.dynamodb.getItem<UserProfileDynamoDto>(userTableName, [
      { itemName: 'userId', itemValue: userId },
      { itemName: 'sk', itemValue: 'profile#' }
    ])

    return dynamoDbUserProfileToUserProfile(dynamodbUserProfile)
  },
}
