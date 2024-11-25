import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      cognitoUserPool: {
        pool: "us-east-1_9woxEwp6M",
        trigger: "CustomMessage" as const,
        existing: true,
      },
    },
  ],
};
