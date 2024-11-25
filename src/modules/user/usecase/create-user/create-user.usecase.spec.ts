import CreateUserUseCase from "./create-user.usecase";

export const MockRepository = () => {
  return {
    create: jest.fn(),
    delete: jest.fn(),
    activate: jest.fn(),
    deactivate: jest.fn(),
    update: jest.fn(),
  };
};

describe("Create user unit test", () => {
  it("Should create a user successfully", async () => {
    const repository = MockRepository();
    const usecase = new CreateUserUseCase(repository);

    const input = {
      email: "testeUser@unit.com",
    };

    await expect(usecase.execute(input)).resolves.toBeUndefined();
    expect(repository.create).toHaveBeenCalledWith(input);
  });

  it("When the user already exists", async () => {
    const repository = MockRepository();
    const usecase = new CreateUserUseCase(repository);
    const input = {
      email: "testeUser@unit.com",
    };
    repository.create.mockRejectedValueOnce(
      new Error("An account with the given email already exists.")
    );
    await expect(usecase.execute(input)).rejects.toThrow(
      "An account with the given email already exists."
    );
  });
});
