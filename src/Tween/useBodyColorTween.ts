import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useGameStore } from '@/utils/Store.ts'
import { Color } from 'three'

export default function UseBodyColorTween(config:any) {
  const { modelRef } = config
  const bodyColor = useGameStore((state) => state.bodyColor)
  const par = {
    color: modelRef.current.bodyMat!.color,
    targetColor: new Color(bodyColor)
  }
  useGSAP(() => {
    gsap.killTweensOf(par)
    gsap.to(par.color, {
      duration: 1,
      ease: 'power1.out',
      r: par.targetColor.r,
      g: par.targetColor.g,
      b: par.targetColor.b,
      onUpdate: () => {
        modelRef.current.bodyMat?.color.set(par.color)
        useGameStore.setState({ preColor: par.color })
      },
      onComplete: () => {
        useGameStore.setState({ preColor: par.color })
      }
    })
  },
  { dependencies: [bodyColor] }
  )
}
