import User from "../domain/user.entity";

export default interface UserAdmGateway {
  create(input: User): Promise<void>;
  delete(email: string): Promise<void>;
  activate(email: string): Promise<void>;
  deactivate(email: string): Promise<void>;
  update(input: User): Promise<void>;
}
