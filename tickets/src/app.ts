import express from 'express'
import 'express-async-errors'
import cookieSession from 'cookie-session'

import { errorHandler, NotFoundError } from '@afonsir-ticketing/common'

const app = express()

app.set('trust proxy', true)

app.use(express.json())

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
  })
)

app.all('*', async (request, response) => {
  throw new NotFoundError()
})

app.use(errorHandler)

export { app }
