import Car from './Car.ts'
import EnvMap from '@/Elements/EnvMap.ts'
import Tunnel from '@/Elements/Tunnel.ts'
export default class World {
  car:Car
  env:EnvMap
  tunnel:Tunnel
  constructor() {
    this.car = new Car()
    this.env = new EnvMap()
    this.tunnel = new Tunnel()
  }
  build(model:any) {
    const loadMap:any = {}
    for (const key in model.resources) {
      loadMap[key] = model.resources[key]
    }
    const carLoad = this.car.build(loadMap['carLoad'])
    const envLight = this.env.build(loadMap['env_light'])
    const tunnelLoader = this.tunnel.build(loadMap['tunnelLoader'])
    return { carLoad, envLight, tunnelLoader }
  }
}
