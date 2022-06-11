const cryptoService = require("./../../src/services/crypto.service");

describe("cryptoService.hash():", () => {
    const password = "hello1234";
    it("Get successful", async () => {
        try {
            const hash = await cryptoService.hash(password);
            expect(hash).not.toBeFalsy();
        } catch (err) {
            throw new Error();
        }
    });
    it("Get failure", async () => {
        try {
            await cryptoService.hash();
        } catch (err) {
            expect(err.message).toBe("data and salt arguments required");
        }
    })
})

describe("cryptoService.compare():", () => {
    const password = "hello1234";
    it("Get successful", async () => {
        const hash = await cryptoService.hash(password);
        const res = await cryptoService.compare(password, hash);
        expect(res).toBe(true);
    });
    it("Get failure", async () => {
        const hash = await cryptoService.hash(password);
        const res = await cryptoService.compare("hello", hash);
        expect(res).toBe(false);
    })
})