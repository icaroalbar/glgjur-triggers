import DeactivateUserUseCase from "./deactivate-user.usecase";

export const MockRepository = () => {
  return {
    create: jest.fn(),
    delete: jest.fn(),
    activate: jest.fn(),
    deactivate: jest.fn(),
    update: jest.fn(),
  };
};

describe("Deactivate user unit test", () => {
  it("Should create a user successfully", async () => {
    const repository = MockRepository();
    const usecase = new DeactivateUserUseCase(repository);

    const email = "testeUser@unit.com";

    await expect(usecase.execute(email)).resolves.toBeUndefined();
    expect(repository.deactivate).toHaveBeenCalledWith(email);
  });

  it("When the user already exists", async () => {
    const repository = MockRepository();
    const usecase = new DeactivateUserUseCase(repository);
    const input = {
      email: "testeeUser@unit.com",
    };
    repository.deactivate.mockRejectedValueOnce(
      new Error("User does not exist.")
    );
    await expect(usecase.execute(input.email)).rejects.toThrow(
      "User does not exist."
    );
  });
});
