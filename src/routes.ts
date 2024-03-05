import express, {Request, Response} from 'express'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
    return res.status(200).send({message: "Hello world"})
})


export {router as cupcakeRouter}
