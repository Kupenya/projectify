const request = require("supertest");
const app = require("../server");

describe("Project Routes", () => {
  it("should create a project", async () => {
    const response = await request(app)
      .post("/api/projects")
      .send({
        title: "Test Project",
        description: "A project for testing",
        status: "not started",
      })
      .set("Authorization", "Bearer <your_token>");

    expect(response.status).toBe(201);
    expect(response.body.title).toBe("Test Project");
  });

  it("should fetch all projects", async () => {
    const response = await request(app)
      .get("/api/projects")
      .set("Authorization", "Bearer <your_token>");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
