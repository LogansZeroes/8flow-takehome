import express, { Request, Response } from 'express'
import { Cupcake } from './models/cupcake'

const router = express.Router()
// Used to validate mongoose ObjectId
const ObjectId = require('mongoose').Types.ObjectId;

router.get('/cupcake', async (req: Request, res: Response) => {
    const cupcakes = await Cupcake.find({})
    return res.status(200).send(cupcakes)
})

router.post('/cupcake', async (req: Request, res: Response) => {
    // TODO validate fields, persist new cupcake, send success response
    // const {name, price} = req.body
    return res.status(405).send("Invalid input")
})

router.get('/cupcake/:cupcakeId', async (req: Request, res: Response) => {
    if (!ObjectId.isValid(req.params.cupcakeId)) {
        return res.status(400).send({description: "Invalid ID supplied"})
    }

    const cupcake = await Cupcake.findById(req.params.cupcakeId)
    if (cupcake) {
        return res.status(200).send(cupcake)
    }

    return res.status(404).send({description: "Cupcake not found"})
})

router.put('/cupcake/:cupcakeId', async (req: Request, res: Response) => {
    if (!ObjectId.isValid(req.params.cupcakeId)) {
        return res.status(400).send({description: "Invalid ID supplied"})
    }

    const cupcake = await Cupcake.findById(req.params.cupcakeId)
    if (cupcake) {
        // TODO edit cupcake and return success response
        return res.status(405).send({description: "Validation exception"})
    }

    return res.status(404).send({description: "Cupcake not found"})
})

router.delete('/cupcake/:cupcakeId', async (req: Request, res: Response) => {
    // TODO delete cupcake and return success response
    if (!ObjectId.isValid(req.params.cupcakeId)) {
        return res.status(400).send({description: "Invalid ID supplied"})
    }

    return res.status(404).send({description: "Cupcake not found"})
})



export { router as cupcakeRouter }
