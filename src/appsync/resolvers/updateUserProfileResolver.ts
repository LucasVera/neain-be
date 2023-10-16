import { operations, update } from '@aws-appsync/utils/dynamodb'
import { util } from '@aws-appsync/utils'
import { dynamoDbUserProfileToUserProfile } from '../../common/mappers/UserMapper'
import { UpdateUserProfileQueryContext } from 'src/common/types/DTO/User/UpdateUserProfile'
import { extractUserIdFromResolverContext } from 'src/common/aws/appsync'

const prepareUpdateOperation = (ctx: UpdateUserProfileQueryContext) => {
  const { args: { input: { dateOfBirth, name, nickname } } } = ctx

  const updateOperationObj = {} as any
  if (dateOfBirth) updateOperationObj.dateOfBirth = operations.replace(dateOfBirth)
  if (name) updateOperationObj.name = operations.replace(name)
  if (nickname) updateOperationObj.nickname = operations.replace(nickname)

  return updateOperationObj
}

const handleError = (err: { message: string, type: string }) => {
  const {
    message,
    type,
  } = err

  if (type === 'ConditionalCheckFailedException') return util.error('User profile does not exist', 'UserProfileDoesNotExist', message, err)

  return util.error('Error updating user profile', 'UpdateUserProfileError', message, err)
}

export function request(ctx: UpdateUserProfileQueryContext) {
  const userId = extractUserIdFromResolverContext(ctx)
  const updateParams = prepareUpdateOperation(ctx)

  return update({
    key: {
      userId,
      sk: 'profile#'
    },
    update: updateParams,
    condition: {
      userId: { eq: userId },
      sk: { eq: 'profile#' },
    } as any,
  })
}

export function response(ctx: UpdateUserProfileQueryContext) {
  const {
    result: dynamodbUserProfile,
    error,
  } = ctx

  if (error) handleError(error)
  if (!dynamodbUserProfile) return null

  return dynamoDbUserProfileToUserProfile(dynamodbUserProfile)
}
