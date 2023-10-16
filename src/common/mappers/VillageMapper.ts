import { VillageDetails } from "../types/Village"

export type DynamoDbVillageDetails = VillageDetails & { sk: string }
export const dynamoDbVillageDetailsToVillageDetails = (dynamoDbVillageDetails: DynamoDbVillageDetails): VillageDetails => ({
  villageId: dynamoDbVillageDetails.villageId,
  userId: dynamoDbVillageDetails.userId,
  name: dynamoDbVillageDetails.name,
  commonerPopulation: dynamoDbVillageDetails.commonerPopulation,
  heroPopulation: dynamoDbVillageDetails.heroPopulation,
  gold: dynamoDbVillageDetails.gold,
  food: dynamoDbVillageDetails.food,
  reputation: dynamoDbVillageDetails.reputation,
  defenseRating: dynamoDbVillageDetails.defenseRating,
  createdAt: dynamoDbVillageDetails.createdAt,
  updatedAt: dynamoDbVillageDetails.updatedAt,
})
