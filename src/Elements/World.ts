import Car from './Car.ts'
import EnvMap from '@/Elements/EnvMap.ts'
import Tunnel from '@/Elements/Tunnel.ts'
import Room from '@/Elements/Room.ts'
import WindLine from '@/Elements/WindLine.ts'

// interface modelType{
//   [propName:string]: any
// }
export default class World {
  car:Car
  env:EnvMap
  tunnel:Tunnel
  room:Room
  windLine:WindLine
  model:any
  constructor() {
    this.car = new Car()
    this.env = new EnvMap()
    this.tunnel = new Tunnel()
    this.room = new Room()
    this.windLine = new WindLine()
  }
  build(model:any) {
    const carLoad = this.car.build(model['carLoad'])
    const startRoom = this.room.build(model['startRoom'])
    const tunnelLoader = this.tunnel.build(model['tunnelLoader'])
    const windLine = this.windLine.build(model['windLine'])
    const cubeGround = model['cubeGround']

    this.model = { carLoad, startRoom, tunnelLoader, cubeGround, windLine }
  }
}
