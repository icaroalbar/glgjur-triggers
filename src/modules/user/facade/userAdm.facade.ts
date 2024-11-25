import UseCaseInterface from "@shared/usecase/use-case.interface";
import UserAdmFacadeInterface, {
  CreateUserFacadeInputDto,
} from "./userAdm.facade.interface";

export interface UseCaseProps {
  createUseCase: UseCaseInterface;
  deleteUseCase: UseCaseInterface;
  activateUseCase: UseCaseInterface;
  deactivateUseCase: UseCaseInterface;
}

export default class UserAdmFacade implements UserAdmFacadeInterface {
  private createUseCase: UseCaseInterface;
  private deleteUseCase: UseCaseInterface;
  private activateUseCase: UseCaseInterface;
  private deactivateUseCase: UseCaseInterface;

  constructor(usecaseProps: UseCaseProps) {
    this.createUseCase = usecaseProps.createUseCase;
    this.deleteUseCase = usecaseProps.deleteUseCase;
    this.activateUseCase = usecaseProps.activateUseCase;
    this.deactivateUseCase = usecaseProps.deactivateUseCase;
  }

  async create(input: CreateUserFacadeInputDto): Promise<void> {
    await this.createUseCase.execute(input);
  }

  async delete(email: string): Promise<void> {
    await this.deleteUseCase.execute(email);
  }

  async activate(email: string): Promise<void> {
    await this.activateUseCase.execute(email);
  }

  async deactivate(email: string): Promise<void> {
    await this.deactivateUseCase.execute(email);
  }
}
