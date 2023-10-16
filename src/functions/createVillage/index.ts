import { handlerPath } from "@libs/handler-resolver"

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [],
  name: "${self:service}-${self:provider.stage}-createVillage",
}
