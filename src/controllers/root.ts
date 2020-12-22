import { Request, Response } from 'express'

export const root = async (req: Request, res: Response) => {
  res.json({ ok: 'Ok!' })
}
