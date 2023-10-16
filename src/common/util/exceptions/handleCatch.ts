import { inspect } from "util"
import { Exception } from "./Exception"
import { logMessage } from "../logger"

export default function handleCatch(ex: any) {
  if (ex instanceof Exception) return handleCustomException(ex)
  if (ex instanceof Error) return handleNodeError(ex)

  return handleUnknownError(ex)
}

const handleCustomException = (ex: Exception) => {
  const exceptionMessage = ex.toString()
  logMessage(ex.toJson(), ex.name)

  return exceptionMessage
}

const handleNodeError = (ex: Error) => {
  const exceptionMessage = ex.message
  logMessage(JSON.stringify({ message: ex.message, stack: ex.stack }), ex.name)

  return exceptionMessage
}

const handleUnknownError = (ex: any) => {
  const errorStr = inspect(ex)
  logMessage(errorStr, "Unknown Error")

  return errorStr
}
