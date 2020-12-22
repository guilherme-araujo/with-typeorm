import { Request, Response } from 'express'
import { getManager } from 'typeorm'
import { Pilots } from '../../models/Pilot'

export const getPilots = async (req: Request, res: Response) => {
  const pilotsRepository = getManager().getRepository(Pilots)
  const pilots = await pilotsRepository.find({ relations: ['vehicles'] })
  res.json(pilots)
}
