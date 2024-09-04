const request = require("supertest");
const { app } = require("../app/config"); // Corrected path to the Express app

describe("Authentication Security Tests", () => {
    // Test for SQL Injection
    test("SQL Injection attempt should fail", async () => {
        const response = await request(app)
            .post("/api/user/login")
            .send({ username: "' OR 1=1 --", password: "password" });
        expect(response.status).toBe(401); // Unauthorized
    });

    // Test for Brute Force Attack
    test("Brute force attack should be mitigated", async () => {
        for (let i = 0; i < 5; i++) {
            await request(app)
                .post("/api/user/login")
                .send({ username: "user", password: "wrongpassword" });
        }
        const response = await request(app)
            .post("/api/user/login")
            .send({ username: "user", password: "wrongpassword" });
        expect(response.status).toBe(429); // Too Many Requests
    });

    // Test for Weak Passwords
    test("Weak passwords should be rejected", async () => {
        const response = await request(app)
            .post("/api/user")
            .send({ username: "newuser", password: "123" });
        expect(response.status).toBe(400); // Bad Request
    });

    // Test for Session Hijacking
    test("Session hijacking attempt should fail", async () => {
        const loginResponse = await request(app)
            .post("/api/user/login")
            .send({ username: "user", password: "password" });
        const sessionCookie = loginResponse.headers["set-cookie"];

        // Simulate session hijacking by using the session cookie in another request
        const hijackResponse = await request(app)
            .get("/api/user/protected-route")
            .set("Cookie", sessionCookie);
        expect(hijackResponse.status).toBe(200); // OK

        // Invalidate the session
        await request(app).post("/api/user/logout").set("Cookie", sessionCookie);

        // Attempt to use the invalidated session cookie
        const invalidSessionResponse = await request(app)
            .get("/api/user/protected-route")
            .set("Cookie", sessionCookie);
        expect(invalidSessionResponse.status).toBe(401); // Unauthorized
    });
});
