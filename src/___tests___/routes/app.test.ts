/* eslint-disable no-undef */
import { createConnection } from 'typeorm'
import request from 'supertest'
import app from '../../app'
import { Pilots } from '../../models/Pilot'
import { Vehicles } from '../../models/Vehicles'

describe('Route testings', () => {
  beforeAll(async () => {
    const db = await createConnection({
      type: 'sqlite',
      database: ':memory:',
      dropSchema: true,
      entities: [Pilots, Vehicles],
      synchronize: true,
      logging: false
    })
    const v = new Vehicles()
    v.manufacturer = 'Test manufacturer'
    v.name = 'Test vehicle'
    v.passengers = 100
    await db.getRepository(Vehicles).save(v)
    return db
  })

  test('Should return an http 201 and the new pilot should be on the pilots list', async () => {
    const r = Math.random().toString(36).substring(10)
    const res = await request(app).post('/pilot').send(
      {
        pilot: {
          name: r,
          mass: 80,
          height: 180,
          vehicles: [1]
        }
      }
    ).set('Authorization', 'MOnkjnbB32143435795689754yuNEB')
    expect(res.status).toEqual(201)
    const req2 = await request(app).get('/pilots').set('Authorization', 'MOnkjnbB32143435795689754yuNEB')
    const userList = req2.body
    let match = false
    let hasVehicle = false
    for (const user of userList) {
      if (user.name === r) {
        match = true
        if (user.vehicles.length > 0) {
          hasVehicle = true
        }
        break
      }
    }

    expect(match).toBe(true)
    expect(hasVehicle).toBe(true)
  })

  test('Sould return ok', async () => {
    const req = await request(app).get('/').set('Authorization', 'MOnkjnbB32143435795689754yuNEB')
    const { ok } = req.body
    expect(ok).toBe('Ok!')
  })

  test('Should return 401', async () => {
    const req = await request(app).get('/')
    expect(req.status).toBe(401)
  })

// A validação do retorno 404 irei deixar como desafio
})
