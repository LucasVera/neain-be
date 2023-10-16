import { PostConfirmationTriggerEvent } from "aws-lambda"
import UserService from "src/common/services/UserService"
import VillageService from "src/common/services/VillageService"
import handleCatch from "src/common/util/exceptions/handleCatch"

const postSignUpTrigger = async (event: PostConfirmationTriggerEvent) => {
  try {
    await UserService.createProfileForSignedUpUser(event)
    await VillageService.fetchVillageDetails

    return {
      newUser: false,
      lastLoginTimestamp: new Date().toISOString()
    }
  }
  catch (ex) {
    handleCatch(ex)
    throw ex
  }
}

export const main = postSignUpTrigger
