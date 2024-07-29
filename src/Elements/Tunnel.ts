import vertexShader from '@/pages/three/shader/tunnel/vert.glsl'
import fragmentShader from '@/pages/three/shader/tunnel/frag.glsl'
import { ShaderMaterial, DoubleSide } from 'three'

interface nameType {
  [propName:string]: any
}
export default class Tunnel {
  model:any
  build(gltf:any) {
    this.model = gltf
    gltf.scene.traverse((child:any) => {
      if (child.type === 'Mesh') {
        // child.material.opacity = 0

        child.material = new ShaderMaterial({
          transparent: true,
          side: DoubleSide,
          vertexShader: vertexShader,
          fragmentShader: fragmentShader,
          uniforms: {
            uOpacity: { value: 1.0 },
            uSpeed: { value: 1.0 },
            iTime: { value: 0.0 }
          }
        })
      }
    })
    return this.model
  }
  MeshChildren() {
    const tunnelMeshDic:nameType = { 'a': '11' }
    const gltf = this.build(this.model)
    gltf.scene.traverse((child:any) => {
      tunnelMeshDic['tunnel'] = child
    })
    return [tunnelMeshDic]
  }
}
