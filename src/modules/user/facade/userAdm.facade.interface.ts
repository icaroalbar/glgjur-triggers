export interface CreateUserFacadeInputDto {
  email: string;
  password?: string;
}

export default interface UserAdmFacadeInterface {
  create(input: CreateUserFacadeInputDto): Promise<void>;
  delete(email: string): Promise<void>;
  activate(email: string): Promise<void>;
  deactivate(email: string): Promise<void>;
}
