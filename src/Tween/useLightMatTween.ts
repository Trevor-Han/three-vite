import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { glPositionKeyType, useGameStore } from '@/utils/Store.ts'

export default function UseLightMatTween(config:any) {
  const { modelRef } = config
  const tabs:glPositionKeyType | undefined = useGameStore(state => state.tabs)
  useGSAP(() => {
    gsap.killTweensOf(modelRef.current.lightMat)
    if (tabs === 'radar' || tabs === 'windDrag') {
      gsap.to(modelRef.current.lightMat, {
        opacity: 0,
        duration: 1
      })
    } else {
      gsap.to(modelRef.current.lightMat, {
        opacity: 1,
        duration: 1
      })
    }
  },
  { dependencies: [tabs] }
  )
}
