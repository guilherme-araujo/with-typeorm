import { Request, Response } from 'express'
import { getManager } from 'typeorm'
import { Pilots } from '../../models/Pilot'
import { Vehicles } from '../../models/Vehicles'

export const newPilot = async (req: Request, res: Response) => {
  const pilotsRepository = getManager().getRepository(Pilots)
  const vehiclesRepository = getManager().getRepository(Vehicles)

  const { name, mass, height, vehicles } = req.body.pilot

  const vehiclesList = []

  for (const vehicle of vehicles) {
    const vehicleObj = await vehiclesRepository.findOne(vehicle)
    vehiclesList.push(vehicleObj)
  }

  const newPilot = new Pilots()

  newPilot.height = height
  newPilot.mass = mass
  newPilot.name = name
  newPilot.vehicles = vehiclesList

  await pilotsRepository.save(newPilot)

  res.status(201).send()
}
