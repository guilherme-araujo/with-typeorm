import app from './app'
import { createConnection } from 'typeorm'

createConnection().then(connection => {
  console.log('Database connected!')
  app.listen(3333)
}).catch((e) => {
  console.log('Database error')
})
