import * as THREE from 'three'
import {
  Color,
  Matrix4,
  Vector2,
  Texture,
  IUniform,
  SRGBColorSpace,
  TextureLoader,
  LinearSRGBColorSpace,
  RepeatWrapping,
  NearestFilter,
  MeshPhysicalMaterial, Material
} from 'three'
import CustomShaderMaterial from "three-custom-shader-material/vanilla";
import floorVertex from "@/pages/three/shader/floot/floorver.glsl";
import floorFrag from "@/pages/three/shader/floot/floorfrag.glsl";
interface nameType {
    [propName:string]: any
}
interface UniformType{
  [key: string]: IUniform
}
export default class Car {
  model: any
  groundLoader: any
  uniforms: UniformType
  nameToMeshDic: nameType | undefined
  wheel: nameType | undefined
  constructor(model:any = null) {
    this.model = model
    this.wheel = {
      wheel_back_right: null,
      wheel_back_left: null,
      wheel_front_right: null,
      wheel_front_left: null
    }
    this.uniforms = {
      uColor: { value: new Color('#000') },
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
      if (['topLigt', 'radar', 'empennage'].includes(child.name)) {
        if (this.nameToMeshDic !== undefined) {
          this.nameToMeshDic[child.name] = child
        }
      }
      if (['wheel_back_right', 'wheel_back_left', 'wheel_front_right', 'wheel_front_left'].includes(child.name)) {
        if (this.wheel !== undefined) {
          this.wheel[child.name] = child
        }
      }
      if (child.name === 'Object_18') {
        if (this.nameToMeshDic !== undefined) {
          this.nameToMeshDic['MeshColor'] = child
        }
      }
      if (child.name === '平面') {
        // child.material.normalMap.flipY = false
        // child.material.normalMap.colorSpace = LinearSRGBColorSpace
        // child.material.normalMap.wrapS = RepeatWrapping
        // child.material.normalMap.wrapT = RepeatWrapping
        //
        // child.material.roughnessMap.flipY = false
        // child.material.roughnessMap.colorSpace = LinearSRGBColorSpace
        // child.material.roughnessMap.wrapS = RepeatWrapping
        // child.material.roughnessMap.wrapT = RepeatWrapping
        //
        // child.material.aoMap.flipY = false;
        // child.material.aoMap.colorSpace = LinearSRGBColorSpace;
        // child.material.aoMap.minFilter = NearestFilter;
        // child.material.aoMap.magFilter = NearestFilter;
        // child.material.aoMap.channel = 1;
        //
        // child.material.lightMap.channel = 1;
        // child.material.lightMap.flipY = false;
        // child.material.lightMap.colorSpace = SRGBColorSpace;
        // child.material.envMapIntensity = 0.5;


        this.groundLoader = child
      }
      if (child.type === 'Mesh') {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    return this.model
  }
  update(name:string, gltf: Material){
    this.model.scene.traverse((child:any)=>{
      if (child.name === name){
        child.material = gltf
      }
    })
  }
}
