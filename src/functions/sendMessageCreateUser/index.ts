import { cognitoUserPool } from "@libs/cognito-user-pool";
import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      cognitoUserPool: {
        pool: cognitoUserPool.UserPoolId,
        trigger: "CustomMessage" as const,
        existing: true,
      },
    },
  ],
};
