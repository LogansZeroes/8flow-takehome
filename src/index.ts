import express from "express"
import {json} from 'body-parser'

const PORT = 3456

const app = express()
app.use(json())

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})