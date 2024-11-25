import UserAdmGateway from "../gateway/userAdm.gateway";
import {
  AdminCreateUserCommand,
  AdminCreateUserRequest,
  AdminDeleteUserCommand,
  AdminDeleteUserRequest,
  AdminDisableUserCommand,
  AdminDisableUserRequest,
  AdminEnableUserCommand,
  AdminEnableUserRequest,
  CognitoIdentityProviderClient,
} from "@aws-sdk/client-cognito-identity-provider";
import { cognitoUserPool } from "@libs/cognito-user-pool";
import { BaseDatabaseQuery } from "@shared/extendedJwtPayload";
import User from "../domain/user.entity";
import { Database } from "@shared/database";

export default class UserAdmRepository implements UserAdmGateway {
  constructor(
    private readonly cognitoIdentityProviderClient: CognitoIdentityProviderClient,
    private readonly baseDatabaseQuery: BaseDatabaseQuery
  ) {}

  async create(input: User): Promise<void> {
    const { schema } = this.baseDatabaseQuery;

    const props: AdminCreateUserRequest = {
      UserPoolId: cognitoUserPool.UserPoolId,
      Username: input.email,
      UserAttributes: [
        { Name: "email", Value: input.email },
        { Name: "zoneinfo", Value: schema },
      ],
      DesiredDeliveryMediums: ["EMAIL"],
    };

    if (input.password) {
      props.TemporaryPassword = input.password;
    }

    const command = new AdminCreateUserCommand(props);
    const user = await this.cognitoIdentityProviderClient.send(command);

    await this.createDatabase({
      email: input.email,
      sub: user.User.Username,
      schema: schema,
    });
  }

  async delete(email: string): Promise<void> {
    const input: AdminDeleteUserRequest = {
      UserPoolId: cognitoUserPool.UserPoolId,
      Username: email,
    };

    const command = new AdminDeleteUserCommand(input);
    await Promise.all([
      this.cognitoIdentityProviderClient.send(command),
      this.deleteDatabase(email),
    ]);
  }

  async activate(email: string): Promise<void> {
    const input: AdminEnableUserRequest = {
      UserPoolId: cognitoUserPool.UserPoolId,
      Username: email,
    };

    const command = new AdminEnableUserCommand(input);
    await this.cognitoIdentityProviderClient.send(command);
  }

  async deactivate(email: string): Promise<void> {
    const input: AdminDisableUserRequest = {
      UserPoolId: cognitoUserPool.UserPoolId,
      Username: email,
    };

    const command = new AdminDisableUserCommand(input);
    await this.cognitoIdentityProviderClient.send(command);
  }

  private async createDatabase(input: User): Promise<void> {
    const insert = `INSERT INTO usuario (
      email,
      id_cliente_amazon,
      ativo,
      id_cliente_galgtec
    )
    VALUES (
      $1,$2,$3,(SELECT id FROM cliente_galgtec WHERE schema_db = $4 LIMIT 1))`;

    const values = [input.email, input.sub, true, input.schema];

    await Database.query(insert, values);
  }

  private async deleteDatabase(email: string): Promise<void> {
    const insert = `DELETE FROM usuario WHERE email = $1`;
    const values = [email];

    await Database.query(insert, values);
  }

  async update(input: User): Promise<void> {
    const { sub } = this.baseDatabaseQuery;

    const insert = `UPDATE usuario
      SET
        oab = $1,
        permissoes = $2,
        perfil = $3,
        fone = $4,
        primeiro_nome = $5,
        ultimo_nome = $6
      WHERE id_cliente_amazon = $7`;

    const values = [
      input.oab,
      input.permissoes,
      input.perfil,
      input.fone,
      input.primeiro_nome,
      input.ultimo_nome,
      sub,
    ];

    await Database.query(insert, values);
  }
}
