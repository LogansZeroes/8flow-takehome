import mongoose from "mongoose"
import request from "supertest"
import app from "../src/app"
  
describe("GET /cupcake", () => {
    it("returns status code 200", async () => {
        const res = await request(app)
            .get("/v2/cupcake")
            // .send({})
        expect(res.statusCode).toEqual(200)
    })

    it("returns a list of cupcakes", async () => {
        const res = await request(app)
            .get("/v2/cupcake")
            // .send({})
        expect(res.statusCode).toEqual(200)
    })
})