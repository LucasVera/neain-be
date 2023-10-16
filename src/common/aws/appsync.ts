import { AppSyncIdentityCognito, util } from '@aws-appsync/utils'
import { Context } from "@aws-appsync/utils"

const DEFAULT_USER_EMAIL = 'lucas@lucasdev.info'

enum AuthTypes {
  IAM = 'IAM Authorization',
  USER_POOL = 'User Pool Authorization',
  OPEN_ID = 'Open ID Connect Authorization',
  API_KEY = 'API Key Authorization',
}

export const extractUserIdFromResolverContext = (ctx: Context): string => {
  const authType = util.authType() as AuthTypes

  if (authType === AuthTypes.USER_POOL) return (ctx.identity as AppSyncIdentityCognito).sub
  if (authType === AuthTypes.API_KEY) return DEFAULT_USER_EMAIL

  return util.error('No email extractor for auth type', 'NoEmailExtractorForAuthType', { authType }, { authType })
}
