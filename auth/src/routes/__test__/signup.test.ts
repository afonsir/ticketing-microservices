import request from 'supertest'
import { app } from '../../app'

it('returns a 201 on successful signup', () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    .expect(201)
})
