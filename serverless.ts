import type { AWS } from '@serverless/typescript'
import {
  dataSources,
  pipelineFunctions,
  resolvers,
} from './src/appsync/sls-config'
import LambdaExecutionRoleStatements from './deployment/lambdaExecutionRoleStatements'
import * as functions from './src/functions'
import Resources from './deployment/Resources'

const serverlessConfiguration: AWS & { appSync: any } = {
  service: 'neain-be',
  frameworkVersion: '3',
  plugins: [
    'serverless-appsync-plugin',
    'serverless-esbuild'
  ],
  useDotenv: true,
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    stage: process.env.STAGE || '${env:STAGE, "dev"}',
    region: 'us-east-1',
    memorySize: 1024,
    logRetentionInDays: 30,
    iam: {
      role: {
        statements: LambdaExecutionRoleStatements,
      }
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      USER_TABLE_NAME: process.env.USER_TABLE_NAME || '${env:USER_TABLE_NAME}',
    },
  },
  package: { individually: true },
  custom: {
    cognitoUserPoolId: process.env.COGNITO_USER_POOL_ID || '${env:COGNITO_USER_POOL_ID}',
    cognitoUserPoolName: process.env.COGNITO_USER_POOL_NAME || '${env:COGNITO_USER_POOL_NAME}',
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
  appSync: {
    name: '${self:service}-${self:provider.stage}',
    authentication: { type: 'API_KEY' },
    additionalAuthentications: [
      {
        type: 'AMAZON_COGNITO_USER_POOLS',
        config: {
          awsRegion: '${self:provider.region}',
          userPoolId: '${self:custom.cognitoUserPoolId}',
          defaultAction: 'ALLOW',
        },
      }
    ],
    apiKeys: [{ name: '${self:service}-${self:provider.stage}-apiKey', description: 'API Key for accessing services for ${self:service}' }],
    logging: { level: 'ALL' },
    xrayEnabled: true,

    ...dataSources,
    ...pipelineFunctions,
    ...resolvers,
  },

  functions,
  resources: {
    Resources
  }
}

module.exports = serverlessConfiguration
