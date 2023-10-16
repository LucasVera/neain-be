export default {
  dataSources: {

    noneDs: {
      type: 'NONE',
    },

    usersTableDs: {
      type: 'AMAZON_DYNAMODB',
      name: '${self:provider.stage}-users-table',
      config: {
        tableName: process.env.USER_TABLE_NAME || '${env:USER_TABLE_NAME}',
      }
    },
  }
}
