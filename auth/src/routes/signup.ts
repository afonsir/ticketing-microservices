import express from 'express'

const router = express.Router()

router.post('/api/users/signup', (request, response) => {
  response.send('Hi there again!')
})

export { router as signupRouter }
