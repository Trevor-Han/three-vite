import * as THREE from 'three'
import CustomShaderMaterial from 'three-custom-shader-material/vanilla'
import floorVertex from '@/pages/three/shader/floot/floorver.glsl'
import floorFrag from '@/pages/three/shader/floot/floorfrag.glsl'
import {
  Color,
  IUniform,
  LinearSRGBColorSpace,
  Matrix4,
  RepeatWrapping,
  SRGBColorSpace,
  Texture,
  TextureLoader,
  Vector2
} from 'three'
interface UniformType{
    [key: string]: IUniform
}
export default class Room {
  model: any
  groundLoader: any
  uniforms: UniformType
  constructor(model:any = null) {
    this.model = model
    this.uniforms = {
      uColor: { value: new Color('#fff') },
      uReflectMatrix: { value: new Matrix4() },
      uReflectTexture: { value: new Texture() },
      uReflectIntensity: { value: 15 },
      uIntensity: { value: 0 },
      uLevel: { value: 0 },
      uResolution: { value: new Vector2() },
      uTime: { value: 0 }
    }
  }
  build(gltf:any) {
    this.model = gltf
    this.model.scene.traverse((child:any) => {
      if (child.name === 'ReflecFloor') {
        const floornormalMap = new TextureLoader().load('textures/t_floor_normal.webp')
        const floorroughnessMap = new TextureLoader().load('textures/t_floor_roughness.webp')
        const lightMap = new TextureLoader().load('textures/t_startroom_light.raw.jpg')
        const startRoomAoMap = new TextureLoader().load('textures/t_startroom_ao.raw.jpg')

        floorroughnessMap.colorSpace = LinearSRGBColorSpace
        floorroughnessMap.wrapS = floorroughnessMap.wrapT = RepeatWrapping
        floornormalMap.colorSpace = LinearSRGBColorSpace
        floornormalMap.wrapS = floornormalMap.wrapT = RepeatWrapping
        startRoomAoMap.channel = 1
        startRoomAoMap.flipY = false
        startRoomAoMap.colorSpace = LinearSRGBColorSpace
        lightMap.channel = 1
        lightMap.flipY = false
        lightMap.colorSpace = SRGBColorSpace

        const floorMat = child.material as THREE.MeshPhysicalMaterial
        floorMat.roughnessMap = floorroughnessMap
        floorMat.normalMap = floornormalMap
        floorMat.aoMap = startRoomAoMap
        floorMat.lightMap = lightMap
        floorMat.envMapIntensity = 0.5

        child.material = new CustomShaderMaterial({
          baseMaterial: floorMat,
          uniforms: this.uniforms,
          vertexShader: floorVertex,
          fragmentShader: floorFrag,
          silent: true
        })

        this.groundLoader = child
      }
      if (child.type === 'Mesh') {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    return this.model
  }
}
