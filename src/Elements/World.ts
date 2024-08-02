import Car from './Car.ts'
import EnvMap from '@/Elements/EnvMap.ts'
import Tunnel from '@/Elements/Tunnel.ts'
import Room from '@/Elements/Room.ts'

// interface modelType{
//   [propName:string]: any
// }
export default class World {
  car:Car
  env:EnvMap
  tunnel:Tunnel
  room:Room
  model:any
  constructor() {
    this.car = new Car()
    this.env = new EnvMap()
    this.tunnel = new Tunnel()
    this.room = new Room()
  }
  build(model:any) {
    const carLoad = this.car.build(model['carLoad'])
    const startRoom = this.room.build(model['startRoom'])
    const tunnelLoader = this.tunnel.build(model['tunnelLoader'])

    this.model = { carLoad, startRoom, tunnelLoader }
  }
}
