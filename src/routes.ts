import { Router } from 'express'
import * as controllers from './controllers'

const router = Router()

router.get('/', controllers.root)

router.get('/pilots', controllers.getPilots)

router.post('/pilot', controllers.newPilot)

export default router
