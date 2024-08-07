import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'
import { Mesh, ShaderMaterial } from 'three'
import { glPositionKeyType, useGameStore } from '@/utils/Store.ts'
import { setEnvMapIntensity } from '@/utils'
export default function UseWindTween(config:any) {
  const params = useRef({
    opacity: 0
  })
  const { windModel, carLoad } = config
  const tabs:glPositionKeyType | undefined = useGameStore((state) => state.tabs)

  useGSAP(() => {
    gsap.killTweensOf(params.current)
    if (tabs === 'windDrag') {
      gsap.to(params.current, {
        opacity: 1,
        duration: 2,
        onUpdate: () => {
          windModel.forEach((item: Mesh) => {
            if (item.isMesh) {
              const mat = item.material as ShaderMaterial
              mat.uniforms.opacity.value = params.current.opacity
            }
          })
          setEnvMapIntensity(carLoad, 2)
        }
      })
    } else {
      gsap.to(params.current, {
        opacity: 0,
        duration: 2,
        onUpdate: () => {
          windModel.forEach((item: Mesh) => {
            if (item.isMesh) {
              const mat = item.material as ShaderMaterial
              mat.uniforms.opacity.value = params.current.opacity
            }
          })
          setEnvMapIntensity(carLoad, 10)
        }
      })
    }
  }, [tabs])
}
