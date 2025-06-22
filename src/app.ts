import express from 'express'
import { errorHandler } from './errors/errorHandler'
import router from './routes/routeHandler'
import cors from 'cors'


const app = express()
app.use(express.json())
app.use(cors())

//Routes
app.use('/api',router)

//global error mgmt
app.use(errorHandler)

export default app;