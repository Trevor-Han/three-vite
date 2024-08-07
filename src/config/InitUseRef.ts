import { useRef } from 'react'
import { Color, Mesh, MeshStandardMaterial } from 'three'

export default function InitUseRef() {
  const modelRef = useRef({
    wheel: [] as Mesh[],
    bodyMat: null as MeshStandardMaterial | null,
    floor: null as Mesh | null,
    empennage: null as Mesh | null,
    lightMat: null as MeshStandardMaterial | null
  })
  const params = useRef({
    speedFactor: 0,
    initColor: new Color('#fff'),
    speedupColor: new Color('#000'),
    floorColor: new Color('#fff'),
    floorNormalSpeed: 0,
    bloomIntensity: 1,
    bloomThreshold: 0.9,
    lightOpacity: 1,
    floorEnvIntensity: 0,
    wheelRoughness: 1,
    emPosX: 0.735,
    emPosY: 230.15,
    emPosZ: -97.55,
    emrRotX: 0,
    wheelEnvIntensity: 5
  })

  return {
    modelRef,
    params
  }
}

