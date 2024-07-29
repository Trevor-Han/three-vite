import * as THREE from 'three'
import { WebGLCubeRenderTarget, Color, Matrix4, Vector2, Texture, IUniform } from 'three'
interface nameType {
    [propName:string]: any
}
interface UniformType{
  [key: string]: IUniform
}
export default class Car {
  model: any
  groundLoader: any
  uniforms: UniformType | undefined
  constructor(model:any = null) {
    this.model = model
    this.uniforms = {
      uColor: { value: new Color('white') },
      uReflectMatrix: { value: new Matrix4() },
      uReflectTexture: { value: new Texture() },
      uReflectIntensity: { value: 15 },
      uIntensity: { value: 1 },
      uLevel: { value: 2 },
      uResolution: { value: new Vector2() },
      uTime: { value: 1 }
    }
  }
  build(gltf:any) {
    this.model = gltf
    this.model.scene.traverse((child:any) => {
      if (child.name === 'topLigt') {
        // child.material.emissiveIntensity = 0
      }
      if (child.name === '平面') {
        child.material.normalMap = new THREE.TextureLoader().load('images/t_floor_normal.webp')
        child.material.roughnessMap = new THREE.TextureLoader().load('images/t_floor_roughness.webp')

        child.material.normalMap.flipY = false
        child.material.normalMap.colorSpace = THREE.LinearSRGBColorSpace
        child.material.normalMap.wrapS = THREE.RepeatWrapping
        child.material.normalMap.wrapT = THREE.RepeatWrapping

        child.material.roughnessMap.flipY = false
        child.material.roughnessMap.colorSpace = THREE.LinearSRGBColorSpace
        child.material.roughnessMap.wrapS = THREE.RepeatWrapping
        child.material.roughnessMap.wrapT = THREE.RepeatWrapping
      }
      if (child.type === 'Mesh') {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    return this.model
  }
  updateFBO(fbo: WebGLCubeRenderTarget) {
    this.model.scene.traverse((child:any) => {
      if (child.name === '平面') {
        child.material.envMap = fbo.texture
        this.groundLoader = child
      }
    })
  }
  MeshChildren() {
    const nameToMeshDic:nameType = { 'a': '11' }
    const wheel:nameType = {
      wheel_back_right: null,
      wheel_back_left: null,
      wheel_front_right: null,
      wheel_front_left: null
    }
    const gltf = this.build(this.model)
    gltf.scene.traverse((child:any) => {
      if (['topLigt', 'radar', 'empennage'].includes(child.name)) {
        if (nameToMeshDic !== undefined) {
          nameToMeshDic[child.name] = child
        }
      }
      if (['wheel_back_right', 'wheel_back_left', 'wheel_front_right', 'wheel_front_left'].includes(child.name)) {
        if (wheel !== undefined) {
          wheel[child.name] = child
        }
      }
      if (child.name === '平面') {
        nameToMeshDic['ground'] = child
      }
      if (child.name === 'Object_18') {
        nameToMeshDic['MeshColor'] = child
      }
    })
    return [nameToMeshDic, wheel]
  }
}
