import DeleteUserUseCase from "./delete-user.usecase";

export const MockRepository = () => {
  return {
    create: jest.fn(),
    delete: jest.fn(),
    activate: jest.fn(),
    deactivate: jest.fn(),
    update: jest.fn(),
  };
};

describe("Delete user unit test", () => {
  it("Should delete a user successfully", async () => {
    const repository = MockRepository();
    const usecase = new DeleteUserUseCase(repository);
    const email = "testeUser@unit.com";

    await expect(usecase.execute(email)).resolves.toBeUndefined();
    expect(repository.delete).toHaveBeenCalledWith(email);
  });

  it("When the user does not exist", async () => {
    const repository = MockRepository();
    const usecase = new DeleteUserUseCase(repository);
    const email = "testeUser@unit.com";

    repository.delete.mockRejectedValueOnce(new Error("User does not exist."));
    await expect(usecase.execute(email)).rejects.toThrow(
      "User does not exist."
    );
  });
});
