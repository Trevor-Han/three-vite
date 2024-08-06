import CustomShaderMaterial from 'three-custom-shader-material/vanilla'
import { type GLTF } from 'three-stdlib'
import { useLayoutEffect } from 'react'
import { Mesh, Object3D } from 'three'
import { ObjectMap } from '@react-three/fiber'

export const useModifyCSM = (gltf: GLTF & ObjectMap, mat: CustomShaderMaterial) => {
  useLayoutEffect(() => {
    gltf.scene.traverse((child: Object3D) => {
      if ((child as Mesh).isMesh) {
        const mesh = child as Mesh
        mesh.material = mat
      }
    })
  }, [])
}
