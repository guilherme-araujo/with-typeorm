import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Pilots } from './Pilot'

@Entity()
export class Vehicles {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  manufacturer: string

  @Column()
  passengers: number

  @ManyToMany(type => Pilots, pilot => pilot.vehicles)
  pilots: Pilots[]
}
