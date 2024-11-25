import {
  formatJSONResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import schema from "./schema";
import UserAdmFacadeFactory from "@modules/user/factory/user-adm.factory";

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const token = event.headers.Authorization;
  const { email } = event.pathParameters;

  try {
    const userAdm = UserAdmFacadeFactory.configure(token);
    await userAdm.delete(email);

    return formatJSONResponse(204);
  } catch (error) {
    console.error(error);
    return formatJSONResponse(400, {
      error: error.message,
    });
  }
};

export const main = middyfy(handler);
