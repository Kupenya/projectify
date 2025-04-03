const request = require("supertest");
const app = require("../server");
const User = require("../models/user");

describe("Auth Routes", () => {
  it("should register a user", async () => {
    const response = await request(app).post("/api/auth/register").send({
      username: "testuser",
      password: "password123",
      role: "user",
    });
    expect(response.status).toBe(201);
    expect(response.body.token).toBeDefined();
  });

  it("should login a user", async () => {
    const response = await request(app).post("/api/auth/login").send({
      username: "testuser",
      password: "password123",
    });
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });
});
