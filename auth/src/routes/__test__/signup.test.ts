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

it('returns a 400 with an invalid email', () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'invalid_email',
      password: 'any_password'
    })
    .expect(400)
})

it('returns a 400 with an invalid password', () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'any_email@mail.com',
      password: 'any'
    })
    .expect(400)
})

it('returns a 400 with missing email and password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'any_email@mail.com',
    })
    .expect(400)

  await request(app)
    .post('/api/users/signup')
    .send({
      password: 'any_password'
    })
    .expect(400)
})

it('disallows duplicated emails', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    .expect(201)

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    .expect(400)
})

it('sets a cookie after successful signup', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    .expect(201)

  expect(response.get('Set-Cookie')).toBeDefined()
})
