import {
  DynamoDBClient,
  PutItemCommand,
  PutItemCommandInput,
  PutItemCommandOutput,
  UpdateItemCommand,
  UpdateItemCommandInput,
  UpdateItemCommandOutput,
  GetItemCommand,
  GetItemCommandOutput,
  GetItemCommandInput,
} from '@aws-sdk/client-dynamodb'
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb'
import { ServerException } from '../util/exceptions/Exception'

const dynamoDbConfig = {
  region: process.env.AWS_REGION,
}

const dynamoDbClient = new DynamoDBClient(dynamoDbConfig)

export type DynamoDbItem = {
  itemName: string
  itemValue: string
}

export default {
  putItem: async <T>(TableName: string, jsItem: object): Promise<T> => {
    const params: PutItemCommandInput = {
      TableName,
      Item: marshall(jsItem),
    }

    const command = new PutItemCommand(params)
    const output: PutItemCommandOutput = await dynamoDbClient.send(command)

    if (output.$metadata.httpStatusCode !== 200) throw new ServerException('Failed to put item')

    return jsItem as T
  },
  updateItem: async <T>(TableName: string, jsItem: object, keys: DynamoDbItem[]): Promise<T> => {
    // transform keys array to dynamodb key object
    const Key = marshall(keys.reduce((acc, key) => ({ ...acc, [key.itemName]: key.itemValue }), {}))

    let UpdateExpression = 'SET '
    const ExpressionAttributeNames = {}
    const ExpressionAttributeValues = {}

    // transform jsItem object to dynamodb update object
    Object.entries(jsItem).forEach(([key, value], index) => {
      const name = `#key${index}`
      const val = `:value${index}`

      UpdateExpression += `${name} = ${val},`
      ExpressionAttributeNames[name] = key
      ExpressionAttributeValues[val] = value
    })

    // remove trailing comma
    UpdateExpression = UpdateExpression.slice(0, -1)

    const params: UpdateItemCommandInput = {
      TableName,
      Key,
      UpdateExpression,
      ExpressionAttributeNames,
      ExpressionAttributeValues,
    }

    const command = new UpdateItemCommand(params)
    const output: UpdateItemCommandOutput = await dynamoDbClient.send(command)

    const outputItem = unmarshall(output.Attributes) as T

    return outputItem
  },

  getItem: async <T>(TableName: string, keys: DynamoDbItem[]): Promise<T> => {
    // transform keys array to dynamodb key object
    const Key = marshall(keys.reduce((acc, key) => ({ ...acc, [key.itemName]: key.itemValue }), {}))

    const params: GetItemCommandInput = {
      TableName,
      Key,
    }

    const command = new GetItemCommand(params)
    const output: GetItemCommandOutput = await dynamoDbClient.send(command)

    const outputItem = unmarshall(output.Item) as T

    return outputItem
  }
}
