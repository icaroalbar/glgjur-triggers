import UserAdmGateway from "@modules/user/gateway/userAdm.gateway";
import UseCaseInterface from "@shared/usecase/use-case.interface";

export default class DeleteUserUseCase implements UseCaseInterface {
  constructor(private readonly userAdmRepository: UserAdmGateway) {}

  async execute(email: string): Promise<void> {
    await this.userAdmRepository.delete(email);
  }
}
