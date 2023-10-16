import { util } from '@aws-appsync/utils'
import { PutInput, put } from "@aws-appsync/utils/dynamodb"
import { extractUserIdFromResolverContext } from 'src/common/aws/appsync'
import { VillageStartingValues } from 'src/common/constants/VillageConstants'
import { dynamoDbVillageDetailsToVillageDetails } from 'src/common/mappers/VillageMapper'
import { CreateVillageMutationContext } from "src/common/types/DTO/Village/CreateVillage"

const {
  commoners: [fromCommoners, toCommoners],
  heroes: [fromHeroes, toHeroes],
  gold: [fromGold, toGold],
  food: [fromFood, toFood],
  reputation: [fromReputation, toReputation],
} = VillageStartingValues

const generateStartingVillageValues = () => ({
  commoners: util.math.randomWithinRange(fromCommoners, toCommoners),
  heroes: util.math.randomWithinRange(fromHeroes, toHeroes),
  gold: util.math.randomWithinRange(fromGold, toGold),
  food: util.math.randomWithinRange(fromFood, toFood),
  reputation: util.math.randomWithinRange(fromReputation, toReputation),
})

export function request(ctx: CreateVillageMutationContext) {
  const {
    args: {
      input,
    },
    identity
  } = ctx

  const {
    name,
  } = input

  console.log('identity', identity)


  const villageId = util.autoId()
  const sk = 'village#'

  const {
    commoners,
    heroes,
    gold,
    food,
    reputation,
  } = generateStartingVillageValues()

  const userId = extractUserIdFromResolverContext(ctx)

  const putObjParams: PutInput<any> = {
    key: { userId, sk } as any,
    item: {
      villageId,
      sk,
      name,
      commonerPopulation: commoners,
      heroPopulation: heroes,
      gold,
      food,
      reputation,
      defenseRating: 0,
      createdAt: util.time.nowEpochSeconds(),
      updatedAt: util.time.nowEpochSeconds(),
    },
    condition: { sk: { notContains: 'village#' } },
  }

  return put(putObjParams)
}

export function response(ctx: CreateVillageMutationContext) {
  const {
    result: dynamodbVillage,
    error,
  } = ctx

  if (error) util.error('Error creating village', 'CreateVillageError', error, error)
  if (!dynamodbVillage) return null

  return dynamoDbVillageDetailsToVillageDetails(dynamodbVillage)
}
