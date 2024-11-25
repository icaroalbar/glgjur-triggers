import UserAdmFacade from "../facade/userAdm.facade";
import UserAdmRepository from "../repository/user.repository";
import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";
import { cognitoUserPool } from "@libs/cognito-user-pool";
import {
  BaseDatabaseQuery,
  ExtendedJwtPayload,
} from "@shared/extendedJwtPayload";
import { jwtDecode } from "jwt-decode";
import { UUID } from "crypto";
import CreateUserUseCase from "../usecase/create-user/create-user.usecase";
import DeleteUserUseCase from "../usecase/delete-user/delete-user.usecase";
import ActivateUserUseCase from "../usecase/activate-user/activate-user.usecase";
import DeactivateUserUseCase from "../usecase/deactivate-user/deactivate-user.usecase";

export default class UserAdmFacadeFactory {
  static configure(token: string) {
    const decodedToken = jwtDecode<ExtendedJwtPayload>(token);

    const baseDatabaseQuery: BaseDatabaseQuery = {
      schema: decodedToken.zoneinfo,
      sub: decodedToken.sub as UUID,
    };

    const client = new CognitoIdentityProviderClient(cognitoUserPool);
    const repository = new UserAdmRepository(client, baseDatabaseQuery);
    const createUserUseCase = new CreateUserUseCase(repository);
    const deleteUserUseCase = new DeleteUserUseCase(repository);
    const activateUseCase = new ActivateUserUseCase(repository);
    const deactivateUseCase = new DeactivateUserUseCase(repository);

    const facade = new UserAdmFacade({
      createUseCase: createUserUseCase,
      deleteUseCase: deleteUserUseCase,
      activateUseCase: activateUseCase,
      deactivateUseCase: deactivateUseCase,
    });
    return facade;
  }
}
