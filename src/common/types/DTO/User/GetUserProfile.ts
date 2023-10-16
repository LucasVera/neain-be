import { Context } from '@aws-appsync/utils'
import { UserProfile } from '../../User'

type TArgs = {
  input: {}
}
type TStash = any
type TPrev = any
type TSource = any
type TResult = UserProfile & { sk: string }

export type GetUserProfileQueryContext = Context<TArgs, TStash, TPrev, TSource, TResult>
