import * as THREE from 'three'
import { UnsignedByteType } from 'three'
import { useFBO } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import dynamicEnvVertexShader from '@/shaders/dynamicEnv/vertex.glsl'
import dynamicEnvFragmentShader from '@/shaders/dynamicEnv/fragment.glsl'
import { FullScreenQuad } from 'three-stdlib'

export interface DynamicEnvConfig {
    resolution: [number, number];
    envMap1: THREE.Texture;
    envMap2: THREE.Texture;
}

export default class DynamicEnv {
  fbo:THREE.WebGLRenderTarget
  renderer:THREE.WebGLRenderer
  material:THREE.ShaderMaterial
  quad:FullScreenQuad
  constructor(config:Partial<DynamicEnvConfig>) {
    const { resolution = [512, 512], envMap1, envMap2 } = config
    const [width, height] = resolution

    this.fbo = useFBO(width, height, {
      type: UnsignedByteType
    })
    this.renderer = useThree((state) => state.gl)
    this.material = new THREE.ShaderMaterial({
      vertexShader: dynamicEnvVertexShader,
      fragmentShader: dynamicEnvFragmentShader,
      uniforms: {
        uEnvmap1: {
          value: envMap1
        },
        uEnvmap2: {
          value: envMap2
        },
        uWeight: {
          value: 0
        },
        uIntensity: {
          value: 1
        }
      }
    })
    this.quad = new FullScreenQuad(this.material)
  }
  update() {
    this.renderer.setRenderTarget(this.fbo)
    this.quad.render(this.renderer)
    this.renderer.setRenderTarget(null)
  }
  get envmap() {
    return this.fbo.texture
  }
  setWeight(value: number) {
    this.material.uniforms.uWeight.value = value
  }
  setIntensity(value: number) {
    this.material.uniforms.uIntensity.value = value
  }
}
