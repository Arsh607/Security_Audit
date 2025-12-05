import request from "supertest";
import app from "../src/app";

describe("Requests API", () => {
  it("GET /api/v1/requests should return 200 and an array", async () => {
    const res = await request(app).get("/api/v1/requests");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
