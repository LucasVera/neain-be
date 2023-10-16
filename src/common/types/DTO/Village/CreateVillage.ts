import { Context } from '@aws-appsync/utils'
import { DynamoDbVillageDetails } from 'src/common/mappers/VillageMapper'

type TArgs = {
  input: {
    name: string
    reCreate?: boolean
  }
}
type TStash = any
type TPrev = any
type TSource = any
type TResult = DynamoDbVillageDetails

export type CreateVillageMutationContext = Context<TArgs, TStash, TPrev, TSource, TResult>
