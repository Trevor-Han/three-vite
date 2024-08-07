import { useGSAP } from '@gsap/react'
import { MeshPhysicalMaterial } from 'three'
import gsap from 'gsap'
import { glPositionKeyType, useGameStore } from '@/utils/Store.ts'

export default function UseTunnelTween(config: any) {
  const tabs:glPositionKeyType | undefined = useGameStore((state) => state.tabs)
  const touch = useGameStore((state) => state.touch)
  const { params, modelRef, floorUniforms, tunnelUniforms } = config

  useGSAP(() => {
    if (tabs !== 'tunnel') return
    const baseParam = params.current
    const lightMat = modelRef.current.lightMat
    const flooMat = modelRef.current.floor?.material as MeshPhysicalMaterial
    // const wheel = modelRef.current.wheel
    const empennage = modelRef.current.empennage
    gsap.killTweensOf(floorUniforms.uColor.value)
    gsap.killTweensOf(baseParam)
    if (touch) {
      const t1 = gsap.timeline()
      t1.to(floorUniforms.uColor.value, {
        duration: 1.5,
        ease: 'power1.in',
        r: baseParam.speedupColor.r,
        g: baseParam.speedupColor.g,
        b: baseParam.speedupColor.b
      })

      t1.to(baseParam, {
        duration: 1.5,
        ease: 'power1.in',
        lightOpacity: 0,
        onUpdate: () => {
          lightMat && (lightMat.opacity = baseParam.lightOpacity)
        }
      },
      0
      )
      t1.to(
        baseParam,
        {
          duration: 1.5,
          ease: 'power1.in',
          speedFactor: 10,
          floorEnvIntensity: 0.5,
          bloomIntensity: 2,
          bloomThreshold: 0.1,
          wheelRoughness: 0,
          wheelEnvIntensity: 20,
          floorNormalSpeed: 1,
          emPosX: -0.42,
          emPosY: 236.14,
          emPosZ: -107.97,
          emrRotX: -0.189,
          onUpdate: () => {
            tunnelUniforms.uSpeed.value = baseParam.speedFactor
            flooMat && (flooMat.envMapIntensity = baseParam.floorEnvIntensity)
            empennage && (empennage.position.x = baseParam.emPosX)
            empennage && (empennage.position.y = baseParam.emPosY)
            empennage && (empennage.position.z = baseParam.emPosZ)
            empennage && (empennage.rotation.x = baseParam.emrRotX)
            // wheel.forEach((item) => {
            //   item.traverse((child) => {
            //     if (child?.material !== undefined) {
            //       const mat = child.material as MeshStandardMaterial
            //       mat.roughness = baseParam.wheelRoughness
            //       mat.envMapIntensity = baseParam.wheelEnvIntensity
            //     }
            //   })
            // })
          }
        },
        1
      )
    } else {
      const t2 = gsap.timeline()
      t2.to(baseParam, {
        duration: 1.5,
        ease: 'power1.in',
        speedFactor: 0,
        floorEnvIntensity: 0,
        bloomIntensity: 1,
        bloomThreshold: 1,
        wheelRoughness: 1,
        wheelEnvIntensity: 5,
        floorNormalSpeed: 0,
        emPosX: 0.735,
        emPosY: 230.15,
        emPosZ: -97.55,
        emrRotX: 0,
        onUpdate: () => {
          tunnelUniforms.uSpeed.value = baseParam.speedFactor
          flooMat && (flooMat.envMapIntensity = baseParam.floorEnvIntensity)
          empennage && (empennage.position.x = baseParam.emPosX)
          empennage && (empennage.position.y = baseParam.emPosY)
          empennage && (empennage.position.z = baseParam.emPosZ)
          empennage && (empennage.rotation.x = baseParam.emrRotX)
          // wheel.forEach((item) => {
          //   item.traverse((child) => {
          //     if (child?.material !== undefined) {
          //       const mat = child.material as MeshStandardMaterial
          //       mat.roughness = baseParam.wheelRoughness
          //       mat.envMapIntensity = baseParam.wheelEnvIntensity
          //     }
          //   })
          // })
        }
      })
      t2.to(floorUniforms.uColor.value, {
        duration: 1.5,
        ease: 'power1.in',
        r: baseParam.initColor.r,
        g: baseParam.initColor.g,
        b: baseParam.initColor.b
      },
      '-=1'
      )

      t2.to(
        baseParam,
        {
          duration: 1.5,
          ease: 'power1.in',
          lightOpacity: 1,
          onUpdate: () => {
            lightMat && (lightMat.opacity = baseParam.lightOpacity)
          }
        },
        '-=1'
      )
    }
  }, [tabs, touch])
}
