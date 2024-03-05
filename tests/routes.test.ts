import mongoose from "mongoose"
import request from "supertest"
import app from "../src/app"
import { Cupcake } from "../src/models/cupcake"
import { disconnectDBForTesting } from "./dbConnection";

const cup = new Cupcake({name: 'Test Cupcake', price: 10})

beforeAll(async () => {
    await cup.save()
});

afterAll(async () => {
    await Cupcake.collection.drop();
    await disconnectDBForTesting();
});
  
describe("GET /cupcake", () => {
    it("returns status code 200", async () => {
        const res = await request(app)
            .get("/v2/cupcake")
        expect(res.statusCode).toEqual(200)
    })

    it("returns a list of cupcakes", async () => {
        const res = await request(app)
            .get("/v2/cupcake")
        expect(Array.isArray(res.body)).toBe(true)
        expect(res.body.length).toEqual(1)
        expect(res.body[0].name).toBe(cup.name)
    })
})

describe("POST /cupcake", () => {
    const data = {
        name: "Post Cupcake",
        price: 1337
    }
    it("returns status code 405", async () => {
        const res = await request(app)
            .post("/v2/cupcake")
            .send(data)
        expect(res.statusCode).toEqual(405)
    })

    it("does not add a cupcake", async () => {
        const beforeCupcakes = await Cupcake.find({})
        expect(beforeCupcakes.length).toEqual(1)
        await request(app)
            .post("/v2/cupcake")
            .send(data)
        const afterCupcakes = await Cupcake.find({})
        expect(afterCupcakes.length).toEqual(1)
    })
})

describe("GET /cupcake/{cupcakeId}", () => {
    it("returns success when cupcake is found", async () => {
        const res = await request(app)
            .get(`/v2/cupcake/${cup.id}`)
        expect(res.statusCode).toEqual(200)
        expect(res.body.name).toEqual(cup.name)
    })

    it("returns status 400 when invalid ID supplied", async () => {
        const longerId = await request(app)
            .get(`/v2/cupcake/${cup.id + "xyz"}`)
        expect(longerId.statusCode).toEqual(400)

        const shorterId = await request(app)
            .get(`/v2/cupcake/${cup.id.slice(5)}`)
        expect(shorterId.statusCode).toEqual(400)

        const bogusId = await request(app)
            .get(`/v2/cupcake/1234`)
        expect(bogusId.statusCode).toEqual(400)
    })

    it("returns status 404 when cupcake not found", async () => {
        const len = cup.id.length
        const half = Math.floor(len/2)
        const fakeId = cup.id.slice(0, half - 2) + "0000" + cup.id.slice(half + 2)

        const res = await request(app)
            .get(`/v2/cupcake/${fakeId}`)
        expect(res.statusCode).toEqual(404)
    })
})

describe("PUT /cupcake/{cupcakeId}", () => {
    const data = {
        name: "New Cupcake",
        price: 10000
    }
    it("returns 405 when cupcake is found", async () => {
        const res = await request(app)
            .put(`/v2/cupcake/${cup.id}`)
            .send(data)
        expect(res.statusCode).toEqual(405)
    })

    it("returns status 400 when invalid ID supplied", async () => {
        const longerId = await request(app)
            .put(`/v2/cupcake/${cup.id + "xyz"}`)
            .send(data)
        expect(longerId.statusCode).toEqual(400)

        const shorterId = await request(app)
            .put(`/v2/cupcake/${cup.id.slice(5)}`)
            .send(data)
        expect(shorterId.statusCode).toEqual(400)

        const bogusId = await request(app)
            .put(`/v2/cupcake/xyz`)
            .send(data)
        expect(bogusId.statusCode).toEqual(400)
    })

    it("returns status 404 when cupcake not found", async () => {
        const len = cup.id.length
        const half = Math.floor(len/2)
        const fakeId = cup.id.slice(0, half - 2) + "0000" + cup.id.slice(half + 2)

        const res = await request(app)
            .put(`/v2/cupcake/${fakeId}`)
            .send(data)
        expect(res.statusCode).toEqual(404)
    })
})

describe("DELETE /cupcake/{cupcakeId}", () => {
    it("returns status 400 when invalid ID supplied", async () => {
        const longerId = await request(app)
            .delete(`/v2/cupcake/${cup.id + "xyz"}`)
        expect(longerId.statusCode).toEqual(400)

        const shorterId = await request(app)
            .delete(`/v2/cupcake/${cup.id.slice(5)}`)
        expect(shorterId.statusCode).toEqual(400)

        const bogusId = await request(app)
            .delete(`/v2/cupcake/xyz`)
        expect(bogusId.statusCode).toEqual(400)
    })
    
    it("does not delete when cupcake is found", async () => {
        const beforeCupcakes = await Cupcake.find({})
        expect(beforeCupcakes.length).toEqual(1)
        await request(app)
            .delete(`/v2/cupcake/${cup.id}`)
        const afterCupcakes = await Cupcake.find({})
        expect(afterCupcakes.length).toEqual(1)
    })

    it("returns status 404 when cupcake is found", async () => {
        const len = cup.id.length
        const half = Math.floor(len/2)
        const fakeId = cup.id.slice(0, half - 2) + "0000" + cup.id.slice(half + 2)

        const res = await request(app)
            .delete(`/v2/cupcake/${cup.id}`)
        expect(res.statusCode).toEqual(404)
    })

    it("returns status 404 when cupcake is not found", async () => {
        const len = cup.id.length
        const half = Math.floor(len/2)
        const fakeId = cup.id.slice(0, half - 2) + "0000" + cup.id.slice(half + 2)

        const res = await request(app)
            .delete(`/v2/cupcake/${fakeId}`)
        expect(res.statusCode).toEqual(404)
    })
})