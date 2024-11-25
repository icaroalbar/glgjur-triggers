import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";
import { cognitoUserPool } from "@libs/cognito-user-pool";
import UserAdmRepository from "./user.repository";
import CreateUserUseCase from "../usecase/create-user/create-user.usecase";
import { BaseDatabaseQuery } from "@shared/extendedJwtPayload";
import { UUID } from "crypto";
import DeleteUserUseCase from "../usecase/delete-user/delete-user.usecase";
import ActivateUserUseCase from "../usecase/activate-user/activate-user.usecase";
import DeactivateUserUseCase from "../usecase/deactivate-user/deactivate-user.usecase";

describe("User repo integration test", () => {
  beforeEach(async () => {
    const baseDatabaseQuery: BaseDatabaseQuery = {
      schema: process.env.SCHEMA_TEST,
      sub: process.env.SUB_TEST as UUID,
    };
    const email = "testeUser@repository.com";

    const client = new CognitoIdentityProviderClient(cognitoUserPool);
    const repository = new UserAdmRepository(client, baseDatabaseQuery);
    const deleteUser = new DeleteUserUseCase(repository);

    try {
      await deleteUser.execute(email);
    } catch (error) {
      if (error.name !== "UserNotFoundException") {
        throw error;
      }
    }
  });

  it("Create and delete user", async () => {
    const baseDatabaseQuery: BaseDatabaseQuery = {
      schema: process.env.SCHEMA_TEST,
      sub: process.env.SUB_TEST as UUID,
    };

    const input = {
      // email: "testeUser@repository.com",
      email: "icaro.albar@gmail.com",
    };

    const client = new CognitoIdentityProviderClient(cognitoUserPool);
    const repository = new UserAdmRepository(client, baseDatabaseQuery);

    const createUser = new CreateUserUseCase(repository);
    await expect(createUser.execute(input)).resolves.toBeUndefined();

    // const deleteUser = new DeleteUserUseCase(repository);
    // await expect(deleteUser.execute(input.email)).resolves.toBeUndefined();
  });

  it("Check if user exists", async () => {
    const baseDatabaseQuery: BaseDatabaseQuery = {
      schema: process.env.SCHEMA_TEST,
      sub: process.env.SUB_TEST as UUID,
    };

    const input = {
      email: "testeUser@repository.com",
    };

    const client = new CognitoIdentityProviderClient(cognitoUserPool);
    const repository = new UserAdmRepository(client, baseDatabaseQuery);

    const createUser = new CreateUserUseCase(repository);
    await expect(createUser.execute(input)).resolves.toBeUndefined();
    await expect(createUser.execute(input)).rejects.toThrow(
      "An account with the given email already exists."
    );

    const deleteUser = new DeleteUserUseCase(repository);
    await expect(deleteUser.execute(input.email)).resolves.toBeUndefined();
    await expect(deleteUser.execute(input.email)).rejects.toThrow(
      "User does not exist."
    );
  });

  it("Activate and deactivate user", async () => {
    const baseDatabaseQuery: BaseDatabaseQuery = {
      schema: process.env.SCHEMA_TEST,
      sub: process.env.SUB_TEST as UUID,
    };

    const input = {
      email: "testeUser@repository.com",
    };

    const client = new CognitoIdentityProviderClient(cognitoUserPool);
    const repository = new UserAdmRepository(client, baseDatabaseQuery);

    const createUser = new CreateUserUseCase(repository);
    await expect(createUser.execute(input)).resolves.toBeUndefined();

    const activateUser = new ActivateUserUseCase(repository);
    await expect(activateUser.execute(input.email)).resolves.toBeUndefined();

    const deactivateUser = new DeactivateUserUseCase(repository);
    await expect(deactivateUser.execute(input.email)).resolves.toBeUndefined();
  });

  it("Check if user activate exists", async () => {
    const baseDatabaseQuery: BaseDatabaseQuery = {
      schema: process.env.SCHEMA_TEST,
      sub: process.env.SUB_TEST as UUID,
    };

    const input = {
      email: "testeUser@repository.com",
    };

    const client = new CognitoIdentityProviderClient(cognitoUserPool);
    const repository = new UserAdmRepository(client, baseDatabaseQuery);

    const activateUser = new ActivateUserUseCase(repository);
    await expect(activateUser.execute(input.email)).rejects.toThrow(
      "User does not exist."
    );
  });
  it("Check if user deactivate exists", async () => {
    const baseDatabaseQuery: BaseDatabaseQuery = {
      schema: process.env.SCHEMA_TEST,
      sub: process.env.SUB_TEST as UUID,
    };

    const input = {
      email: "testeUser@repository.com",
    };

    const client = new CognitoIdentityProviderClient(cognitoUserPool);
    const repository = new UserAdmRepository(client, baseDatabaseQuery);

    const activateUser = new DeactivateUserUseCase(repository);
    await expect(activateUser.execute(input.email)).rejects.toThrow(
      "User does not exist."
    );
  });
});
