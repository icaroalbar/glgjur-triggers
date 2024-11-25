import UserAdmGateway from "@modules/user/gateway/userAdm.gateway";
import UseCaseInterface from "@shared/usecase/use-case.interface";
import { CreateUserDto } from "./create-user.dto";

export default class CreateUserUseCase implements UseCaseInterface {
  constructor(private readonly userAdmRepository: UserAdmGateway) {}

  async execute(input: CreateUserDto): Promise<void> {
    await this.userAdmRepository.create(input);
  }
}
