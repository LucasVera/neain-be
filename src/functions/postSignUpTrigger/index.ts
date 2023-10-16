import { handlerPath } from "@libs/handler-resolver"

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      cognitoUserPool: {
        pool: "${self:custom.cognitoUserPoolName}",
        trigger: "PostConfirmation" as any,
        existing: true,
        forceDeploy: true,
      },
    },
  ],
  name: "${self:service}-${self:provider.stage}-postSignUpTrigger",
}
