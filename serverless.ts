import type { AWS } from "@serverless/typescript";
import * as dotenv from "dotenv";

dotenv.config({ path: __dirname + "/.env.development" });

import {
  createUser,
  deleteUser,
  activate,
  deactivate,
  sendMessageCreateUser,
} from "@functions/index";

export const apiName = `galgjur-back-end-admin-${process.env.API_NAME}`;

const serverlessConfiguration: AWS = {
  service: apiName,
  useDotenv: true,
  frameworkVersion: "3.39",
  plugins: [
    "serverless-dotenv-plugin",
    "serverless-webpack",
    "serverless-offline",
  ],
  provider: {
    name: "aws",
    runtime: "nodejs20.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    deploymentBucket: {
      name: `${apiName}-bucket`,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
    iam: {
      role: {
        statements: [
          {
            Effect: "Allow",
            Action: ["*"],
            Resource: ["*"],
          },
        ],
      },
    },
  },

  functions: {
    createUser,
    deleteUser,
    activate,
    deactivate,
    sendMessageCreateUser,
  },
  package: { individually: true, excludeDevDependencies: true },
  custom: {
    dotenv: {
      path: "./.env.development",
    },
    webpack: {
      webpackConfig: "./webpack.config.ts",
      includeModules: true,
      useChildProcesses: true,
      packager: "yarn",
      excludeFiles: "src/**/*.spec.*",
    },
  },
};

module.exports = serverlessConfiguration;
