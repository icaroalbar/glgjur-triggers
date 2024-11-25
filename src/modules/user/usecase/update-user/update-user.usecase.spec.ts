import { UpdateUserInputDto } from "./update-user.dto";
import UpdateUserUseCase from "./update-user.usecase";

export const MockRepository = () => {
  return {
    create: jest.fn(),
    delete: jest.fn(),
    activate: jest.fn(),
    deactivate: jest.fn(),
    update: jest.fn(),
  };
};

describe("Update user unit test", () => {
  it("Should update a user successfully", async () => {
    const repository = MockRepository();
    const usecase = new UpdateUserUseCase(repository);

    const props: UpdateUserInputDto = {
      id: "33",
      fone: "2198457892",
      oab: "123456RJ",
      perfil: "admin",
      permissoes: "f2610b199d8294537f5846a418a77760dndZpgHvo",
      primeiro_nome: "Teste",
      ultimo_nome: "Unitário",
    };

    await expect(usecase.execute(props)).resolves.toBeUndefined();
    expect(repository.update).toHaveBeenCalledWith(props);
  });

  it("When the user does not exist", async () => {
    const repository = MockRepository();
    const usecase = new UpdateUserUseCase(repository);

    const props: UpdateUserInputDto = {
      id: "33",
      fone: "2198457892",
      oab: "123456RJ",
      perfil: "admin",
      permissoes: "f2610b199d8294537f5846a418a77760dndZpgHvo",
      primeiro_nome: "Teste",
      ultimo_nome: "Unitário",
    };

    repository.update.mockRejectedValueOnce(new Error("User does not exist."));
    await expect(usecase.execute(props)).rejects.toThrow(
      "User does not exist."
    );
  });
});
