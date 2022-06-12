const request = require("supertest")(require("../../src/app"));
const mongoose = require("mongoose");
const redisService = require("../../src/services/redis.service");

describe("Get products route:", () => {
    it("401 Unauthorized Error", async () => {
        const response = await request.get("/api/v1/products/");
        expect(response.status).toBe(401);
        expect(response.body.name).toMatch(/Unauthorized Error/);
    });
});

afterAll(async () => {
    await mongoose.disconnect();
    await redisService.client.quit();
});
