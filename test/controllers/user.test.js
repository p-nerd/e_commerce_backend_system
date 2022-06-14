const mongoose = require("mongoose");
const app = require("../../src/app");
const request = require("supertest")(app);
const redisService = require("../../src/services/redis.service");
const userService = require("./../../src/services/user.service");
const cryptoService = require("./../../src/services/crypto.service");
const { BASE_URL } = require("../../src/utils/config.util");

jest.mock("./../../src/services/user.service");
jest.mock("./../../src/services/crypto.service");

userService.saveOne.mockImplementation(async (payload) => payload);
cryptoService.hash.mockImplementation(async (password) => "hashed " + password);

describe("Create user route:", () => {
    const payload = {
        name: "Shihab Mahamud",
        email: "shihab4t4000@gmail.com",
        password: "something"
    };
    it("return validation error", async () => {
        delete payload.password;
        const response = await request.post(BASE_URL + "/users/").send(payload);
        expect(response.status).toBe(400);
        expect(response.body.error).toBe(true);
        expect(response.body.success).toBe(false);
    });
    it("return successful result", async () => {
        const payload = {
            name: "Shihab Mahamud",
            email: "shihab4t4000@gmail.com",
            password: "something"
        };
        const response = await request.post(BASE_URL + "/users/").send(payload);
        expect(response.status).toBe(201);
        expect(response.body.error).toBe(false);
        expect(response.body.success).toBe(true);
    });
});

afterAll(async () => {
    await mongoose.disconnect();
    await redisService.client.quit();
});
