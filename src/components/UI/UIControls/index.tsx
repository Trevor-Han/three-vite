import { useEffect, useRef, useState } from 'react'
import { res } from './res'
import { GameWrapper } from './style'
import { useGameStore, useInteractStore } from '@/utils/Store.ts'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export default function UIControls() {
  const controlRef = useRef<HTMLDivElement>(null)
  const gameRef = useRef<HTMLDivElement>(null)
  const aniDone = useRef(false)

  const [activeIndex, setActiveIndex] = useState(0)

  useGSAP(() => {
    gsap.set(gameRef.current, { opacity: 0 })
    gsap.to(gameRef.current, {
      opacity: 1,
      duration: 0.5,
      ease: 'power2.in',
      onComplete: () => {
        aniDone.current = true
      }
    })
  })

  useEffect(() => {
    useInteractStore.setState({ controlDom: controlRef.current! })
  }, [])

  return (
    <>
      <GameWrapper className='game' ref={gameRef}>
        <div
          className='control'
          ref={controlRef}
        ></div>
        <div className='container'>
          {res.map((item, index) => (
            <div
              key={index}
              className={activeIndex === index ? 'color-item' : ''}
              style={{
                backgroundImage: `url(${item.src})`,
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                margin: '8px',
                backgroundSize: '100% 100%',
                cursor: 'pointer'
              }}
              onClick={() => {
                if (!aniDone.current) return
                setActiveIndex(index)
                useGameStore.setState({ bodyColor: `${item.color}` })
              }}
            ></div>
          ))}
        </div>
      </GameWrapper>
    </>
  )
}
