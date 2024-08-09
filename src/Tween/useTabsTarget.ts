import { glPositionKeyType, useGameStore } from '@/utils/Store.ts'
import { useGSAP } from '@gsap/react'
import { Vector3 } from 'three'
import gsap from 'gsap'
import { useThree } from '@react-three/fiber'
import { setObject3DVIS } from '@/utils'
import { useEffect } from 'react'

type glPositionType = {
    [key in glPositionKeyType]: Vector3;
};

export default function UseTabsTarget() {
  const tabs:glPositionKeyType | undefined = useGameStore(state => state.tabs)
  const glCamera = useThree((state) => state.camera)
  const glControls = useThree((state) => state.controls)
  const touch = useGameStore(state => state.touch)
  const scene = useThree((state) => state.scene)

  useEffect(() => {
    if (tabs === 'radar') {
      if (touch) {
        setObject3DVIS(scene, 'radarGroup', true)
      } else {
        setObject3DVIS(scene, 'radarGroup', false)
      }
    }
  }, [scene, tabs, touch])

  useGSAP(() => {
    if (!tabs) return
    const glPosition:glPositionType = {
      'tunnel': new Vector3(-0.0908, 0.8, -3.9976),
      'carBody': new Vector3(1.5835, 0.8, 2.5314),
      'windDrag': new Vector3(1.5290, 0.8, -2.5425),
      'radar': new Vector3(-1.5097, 5.2665, -0.0144)
    }
    gsap.killTweensOf(glCamera.position)
    gsap.killTweensOf(glControls)
    gsap.to(glCamera.position, {
      x: glPosition[tabs].x,
      y: glPosition[tabs].y,
      z: glPosition[tabs].z,
      duration: 2,
      ease: 'power2.out'
    })

    // ==========================glControls=============================
    if (!glControls) return
    if (tabs === 'radar') {
      gsap.to(glControls, {
        maxDistance: 7,
        minDistance: 7,
        duration: 1,
        onUpdate: () => {
          glCamera.updateProjectionMatrix()
        }
      })
    } else {
      gsap.to(glControls, {
        maxDistance: 4,
        minDistance: 4,
        duration: 1,
        onUpdate: () => {
          glCamera.updateProjectionMatrix()
        }
      })
    }
  },
  { dependencies: [tabs] }
  )
  useGSAP(() => {
    if (touch) {
      gsap.to(glCamera, {
        fov: 75,
        duration: 1,
        ease: 'none',
        onUpdate: () => {
          glCamera.updateProjectionMatrix()
        }
      })
    } else {
      gsap.to(glCamera, {
        fov: 60,
        duration: 1,
        ease: 'none',
        onUpdate: () => {
          glCamera.updateProjectionMatrix()
        }
      })
    }
  },
  { dependencies: [touch] }
  )
}
