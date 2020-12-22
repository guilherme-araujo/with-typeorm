import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Vehicles } from './Vehicles'

@Entity()
export class Pilots {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  mass: number

  @Column()
  height: number

  @ManyToMany(type => Vehicles, vehicles => vehicles.pilots)
  @JoinTable({
    name: 'pilot_vehicles',
    joinColumn: {
      name: 'pilotId',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'vehicleId',
      referencedColumnName: 'id'
    }
  })
  vehicles: Vehicles[]
}
