import request from 'supertest'
import { app } from '../../app'

it('responds with details about the current user', async () => {
  const cookie = await signin()

  const response = await request(app)
    .get('/api/users/current_user')
    .set('Cookie', cookie)
    .expect(200)

  expect(response.body.currentUser.email).toEqual('any_email@mail.com')
})

it('responds with null if not authenticated', async () => {
  const response = await request(app)
    .get('/api/users/current_user')
    .expect(200)

  expect(response.body.currentUser).toBeNull()
})
