import express from 'express'

const router = express.Router()

router.get('/api/users/current_user', (request, response) => {
  response.send('Hi there again!')
})

export { router as currentUserRouter }
