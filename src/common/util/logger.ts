import { inspect } from "util"

export const logMessage = (message: string, ...rest) => {
  let messageToLog = message
  if (rest && rest.length) messageToLog += ` ${inspect(rest)}`

  console.log(new Date().toISOString(), messageToLog)
}
