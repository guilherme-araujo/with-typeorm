import express from 'express'
import bodyParser from 'body-parser'
import router from './routes'
import auth from './utils/authorization'

const app = express()

app.use(auth)
app.use(bodyParser.json())
app.use(router)

export default app
