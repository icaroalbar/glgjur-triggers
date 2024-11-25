import UserAdmGateway from "@modules/user/gateway/userAdm.gateway";
import UseCaseInterface from "@shared/usecase/use-case.interface";
import { UpdateUserInputDto } from "./update-user.dto";

export default class UpdateUserUseCase implements UseCaseInterface {
  constructor(private readonly userAdmRepository: UserAdmGateway) {}

  async execute(input: UpdateUserInputDto): Promise<void> {
    await this.userAdmRepository.update(input);
  }
}
