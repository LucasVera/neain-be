import { Context } from '@aws-appsync/utils'
import { UserProfile } from '../../User'

type TArgs = {
  input: {
    name?: string
    nickname?: string
    dateOfBirth?: string
  }
}
type TStash = any
type TPrev = any
type TSource = any
type TResult = UserProfile & { sk: string }

export type UpdateUserProfileQueryContext = Context<TArgs, TStash, TPrev, TSource, TResult>
