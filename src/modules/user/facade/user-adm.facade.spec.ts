import UserAdmFacadeFactory from "../factory/user-adm.factory";

describe("Admin user facade test", () => {
  beforeEach(async () => {
    const token = process.env.TOKEN_TEST;
    const facade = UserAdmFacadeFactory.configure(token);

    const email = "testeUser@facade.com";

    try {
      await facade.delete(email);
    } catch (error) {
      if (error.name !== "UserNotFoundException") {
        throw error;
      }
    }
  });
  it("Create and delete user", async () => {
    const token = process.env.TOKEN_TEST;
    const facade = UserAdmFacadeFactory.configure(token);

    const input = {
      email: "testeUser@facade.com",
    };

    await expect(facade.create(input)).resolves.toBeUndefined();
    await expect(facade.delete(input.email)).resolves.toBeUndefined();
  });

  it("Check if user exists", async () => {
    const token = process.env.TOKEN_TEST;
    const facade = UserAdmFacadeFactory.configure(token);

    const input = {
      email: "testeUser@facade.com",
    };

    await expect(facade.create(input)).resolves.toBeUndefined();
    await expect(facade.create(input)).rejects.toThrow(
      "An account with the given email already exists."
    );

    await expect(facade.delete(input.email)).resolves.toBeUndefined();
    await expect(facade.delete(input.email)).rejects.toThrow(
      "User does not exist."
    );
  });

  it("Activate and deactivate user", async () => {
    const token = process.env.TOKEN_TEST;
    const facade = UserAdmFacadeFactory.configure(token);

    const input = {
      email: "testeUser@facade.com",
    };

    await expect(facade.create(input)).resolves.toBeUndefined();
    await expect(facade.activate(input.email)).resolves.toBeUndefined();
    await expect(facade.deactivate(input.email)).resolves.toBeUndefined();

    await expect(facade.delete(input.email)).resolves.toBeUndefined();
    await expect(facade.activate(input.email)).rejects.toThrow(
      "User does not exist."
    );
    await expect(facade.deactivate(input.email)).rejects.toThrow(
      "User does not exist."
    );
  });
});
