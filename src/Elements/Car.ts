import { Color } from 'three'

export default class Car {
  model: any
  constructor(model:any = null) {
    this.model = model
  }
  build(gltf:any) {
    this.model = gltf
    this.model.scene.traverse((child:any) => {
      if (child.name === 'body') {
        child.color = new Color('#26d6e9')
      }
      if (child.type === 'Mesh') {
        child.material.envMapIntensity = 10
      }
    })
    return this.model
  }
}
