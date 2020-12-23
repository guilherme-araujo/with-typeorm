/* eslint-disable no-undef */
import { createConnection, getRepository } from 'typeorm'
import { Pilots } from '../models/Pilot'
import { Vehicles } from '../models/Vehicles'

describe('Inserting pilots and their vehicles', () => {
  beforeEach(async () => {
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

  test('New pilot has an existing vehicle', async () => {
    const p = new Pilots()
    const v = await getRepository(Vehicles).findOne(1)
    p.name = 'Test pilot'
    p.mass = 60
    p.height = 150
    p.vehicles = [v]
    await getRepository(Pilots).save(p)
    const newPilot = await getRepository(Pilots).findOne(1)
    if (newPilot) {
      expect(newPilot.name).toBe('Test pilot')
    } else {
      fail()
    }
  })
})
