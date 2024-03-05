import { json } from 'body-parser'
import express from "express"
import mongoose from 'mongoose'
import { cupcakeRouter } from "./routes"

mongoose.connect('mongodb://localhost:27017/cupcake-db').then(() => {
    console.log("Connected to MongoDB")
})

const app = express()
app.use(json())
app.use("/v2", cupcakeRouter)

export default app