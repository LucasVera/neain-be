type ExecutionRoleStatement = {
  Effect: 'Allow' | 'Deny'
  Action: string[]
  Resource: string | { 'Fn::GetAtt': string[] } | { Ref: string }
}

export default [
  {
    Effect: 'Allow',
    Action: [
      'dynamodb:putItem',
      'dynamodb:updateItem',
      'dynamodb:getItem',
    ],
    Resource: {
      'Fn::GetAtt': [
        'UsersTable',
        'Arn',
      ],
    },
  }
] as ExecutionRoleStatement[]
