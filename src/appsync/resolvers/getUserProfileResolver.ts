import { get } from '@aws-appsync/utils/dynamodb'
import { util } from '@aws-appsync/utils'
import { GetUserProfileQueryContext } from '../../common/types/DTO/User/GetUserProfile'
import { dynamoDbUserProfileToUserProfile } from '../../common/mappers/UserMapper'
import { extractUserIdFromResolverContext } from 'src/common/aws/appsync'

export function request(ctx: GetUserProfileQueryContext) {
  const userId = extractUserIdFromResolverContext(ctx)

  return get({
    key: {
      userId,
      sk: 'profile#'
    }
  })
}

export function response(ctx: GetUserProfileQueryContext) {
  const {
    result: dynamodbUserProfile,
    error,
  } = ctx

  if (error) util.error('Error getting user profile', 'GetUserProfileError', error, error)
  if (!dynamodbUserProfile) return null

  return dynamoDbUserProfileToUserProfile(dynamodbUserProfile)
}
