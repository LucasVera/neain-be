export default {
  pipelineFunctions: {
    getUserProfileResolver: {
      dataSource: 'usersTableDs',
      description: 'Get user profile resolver',
      code: './src/appsync/resolvers/build/getUserProfileResolver.js',
    },

    updateUserProfileResolver: {
      dataSource: 'usersTableDs',
      description: 'Update user profile resolver',
      code: './src/appsync/resolvers/build/updateUserProfileResolver.js',
    },

    createVillageResolver: {
      dataSource: 'usersTableDs',
      description: 'Create village resolver',
      code: './src/appsync/resolvers/build/createVillageResolver.js',
    }
  }
}
