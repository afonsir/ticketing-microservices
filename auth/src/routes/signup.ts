import express, { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import { RequestValidationError } from '../errors/request-validation-error'
import { BadRequestError } from '../errors/bad-request-error'

import { User } from '../models/user'

const router = express.Router()

router.post(
  '/api/users/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 6, max: 20 })
      .withMessage('Password must be between 6 and 20 characters')
  ],
  async (request: Request, response: Response) => {
    const errors = validationResult(request)

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const { email, password } = request.body

    const existingUser = await User.findOne({ email })

    if(existingUser) {
      throw new BadRequestError('Email already in use')
    }

    const user = User.build({ email, password })
    await user.save()

    response.status(201).send(user)
})

export { router as signupRouter }
