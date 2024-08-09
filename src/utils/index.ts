import CustomShaderMaterial from 'three-custom-shader-material/vanilla'
import { type GLTF } from 'three-stdlib'
import { useLayoutEffect } from 'react'
import { MeshStandardMaterial, Mesh, Object3D, Group, Vector3, MeshBasicMaterial, Scene } from 'three'
import { ObjectMap } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'

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
export const setObject3DVIS = (scene: Scene, name: string, boolean:boolean) => {
  scene.traverse(child => {
    if (child.name === name) {
      child.visible = boolean
    }
  })
}
export const setEnvMapIntensity = (gltf: GLTF & ObjectMap, intensity:number) => {
  gltf.scene.traverse((child: Object3D) => {
    if ((child as Mesh).isMesh) {
      const mesh = child as Mesh
      const mat = mesh.material as MeshStandardMaterial
      mat.envMapIntensity = intensity
    }
  })
}

export const setRadarMesh = (radar:Mesh) => {
  const radarGroup = new Group()
  const radarVertexArray = []
  const meshArray:Mesh[] = []
  const boxGeo = new THREE.BoxGeometry(0.02, 0.01, 0.1)
  const positionAttributes = radar.geometry.getAttribute('position')
  for (let i = 0; i < positionAttributes.count; i++) {
    const vec3 = new Vector3()
    vec3.fromBufferAttribute(positionAttributes, i)
    radarVertexArray.push(vec3)
  }

  radarGroup.name = 'radarGroup'
  radarGroup.visible = false
  if (!meshArray.length) {
    radarGroup.position.set(0, 0.3, 0)
    for (let k = 0; k < 6; k++) {
      for (let i = 0; i < radarVertexArray.length; i++) {
        const boxMat = new MeshBasicMaterial({ color: 0xffffff, depthWrite: false, depthTest: false })
        const boxMesh = new Mesh(boxGeo, boxMat)
        boxMesh.visible = false
        boxMesh.position.copy(radarVertexArray[i])
        boxMesh.lookAt(0, 0.4, 0)
        boxMesh.userData['originPos'] = boxMesh.position.clone()
        boxMesh.translateZ(-5)
        boxMesh.userData['targetPos'] = boxMesh.position.clone()
        boxMesh.translateZ(5)

        radarGroup.add(boxMesh)
        meshArray.push(boxMesh)
        if (k === 0) {
          boxMesh.userData['delay'] = 0
        } else if (k === 1) {
          boxMesh.userData['delay'] = 0.5
        } else if (k === 2) {
          boxMesh.userData['delay'] = 1
        } else if (k === 3) {
          boxMesh.userData['delay'] = 2
        } else if (k === 4) {
          boxMesh.userData['delay'] = 2.5
        } else if (k === 5) {
          boxMesh.userData['delay'] = 3
        }
      }
      for (let j = 0; j < meshArray.length; j++) {
        gsap.to(meshArray[j].position, {
          x: meshArray[j].userData['targetPos'].x,
          y: meshArray[j].userData['targetPos'].y,
          z: meshArray[j].userData['targetPos'].z,
          duration: 4,
          delay: meshArray[j].userData['delay'],
          repeat: -1,
          ease: 'none',
          onStart: () => {
            meshArray[j].visible = true
          }
        })
      }
    }
  }
  return { radarGroup, meshArray }
}
