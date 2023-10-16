import { PostConfirmationTriggerEvent } from "aws-lambda"
import UserService from "src/common/services/UserService"
import handleCatch from "src/common/util/exceptions/handleCatch"

const createVillage = async (event: PostConfirmationTriggerEvent) => {
  try {
    await UserService.createProfileForSignedUpUser(event)

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

export const main = createVillage
