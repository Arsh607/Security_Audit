import request from "supertest";
import app from "../src/app";

describe("Bins API", () => {
  it("GET /api/v1/bins should return 200 and an array", async () => {
    const res = await request(app).get("/api/v1/bins");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
