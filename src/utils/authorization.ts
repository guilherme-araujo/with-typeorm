import { Request, Response, NextFunction } from 'express'

const auth = function (req: Request, res: Response, next: NextFunction) {
  if (req.header('Authorization') === 'MOnkjnbB32143435795689754yuNEB') {
    next()
  } else {
    res.status(401).send()
  }
}

export default auth
