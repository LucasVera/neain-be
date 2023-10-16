import aws from "../aws"
import { dynamoDbVillageDetailsToVillageDetails } from "../mappers/VillageMapper"
import { VillageDetails } from "../types/Village"

const userTableName = process.env.USER_TABLE_NAME

type VillageDetailsDynamoDto = VillageDetails & { sk: string }

export default {
  saveVillageDetails: async (userId: string, villageDetails: VillageDetails) => {
    const savedVillageDetails = await aws.dynamodb.putItem<VillageDetailsDynamoDto>(userTableName, {
      ...villageDetails,
      sk: `village#`,
      userId,
    })

    return dynamoDbVillageDetailsToVillageDetails(savedVillageDetails)
  },
  fetchVillageDetails: async (userId: string) => {
    const dynamodbVillageDetails = await aws.dynamodb.getItem<VillageDetailsDynamoDto>(userTableName, [
      { itemName: 'userId', itemValue: userId },
      { itemName: 'sk', itemValue: 'village#' }
    ])

    return dynamoDbVillageDetailsToVillageDetails(dynamodbVillageDetails)
  }
}
