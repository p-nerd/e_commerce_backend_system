const request = require("supertest")(require("../../src/app"));
const mongoose = require("mongoose");
const redisService = require("../../src/services/redis.service");
const { BASE_URL } = require("../../src/utils/config");

describe("Get products route:", () => {
    it("401 Unauthorized Error", async () => {
        const response = await request.get(BASE_URL + "/products");
        expect(response.status).toBe(200);
        expect(response.body.error).toBe(false);
        expect(response.body.success).toBe(true);
    });
});

afterAll(async () => {
    await mongoose.disconnect();
    await redisService.client.quit();
});
