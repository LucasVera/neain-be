export default {
  resolvers: {
    'Query.getUserProfile': {
      functions: [
        'getUserProfileResolver'
      ]
    },

    'Mutation.updateUserProfile': {
      functions: [
        'updateUserProfileResolver'
      ]
    },

    'Mutation.createVillage': {
      functions: [
        'createVillageResolver'
      ]
    }
  },
}
