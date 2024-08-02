import { Color, Material, TextureLoader, LinearSRGBColorSpace, NearestFilter } from 'three'

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
        child.material.envMapIntensity = 5
      }
      if (child.type === 'Mesh') {
        child.material.envMapIntensity = 5
        // const aoMap = new TextureLoader().load("/textures/t_car_body_AO.raw.jpg");
        // aoMap.flipY = false;
        // aoMap.colorSpace = LinearSRGBColorSpace;
        // aoMap.minFilter = NearestFilter;
        // aoMap.magFilter = NearestFilter;
        // aoMap.channel = 1;
        // child.material.aoMap = aoMap
        // child.castShadow = true
        // child.receiveShadow = true
      }
    })
    return this.model
  }
}
