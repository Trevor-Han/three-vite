import { ShaderMaterial, DoubleSide, Color, AdditiveBlending } from 'three'
import vertexShader from '@/pages/three/shader/wind/vertex.glsl'
import fragmentShader from '@/pages/three/shader/wind/fragment.glsl'

export default class WindLine {
  model:any
  build(gltf:any) {
    this.model = gltf
    gltf.scene.traverse((child:any) => {
      if (child.isMesh) {
        child.material = new ShaderMaterial({
          side: DoubleSide,
          uniforms: {
            vTime: { value: 0 },
            color: { value: new Color(1, 0, 0.13) },
            vProgress: { value: 1 },
            opacity: { value: 0 },
            random: { value: Math.random() }
          },
          transparent: true,
          depthWrite: false,
          blending: AdditiveBlending,
          vertexShader,
          fragmentShader
        })
      }
    })
    return this.model
  }
  MeshChildren() {}
}

