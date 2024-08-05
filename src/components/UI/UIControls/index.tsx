import { useEffect, useRef, useState, PointerEvent } from 'react'
import { res, tabs } from './res'
import { Tunnel, CarBody, WindDrag, Radar } from './text.tsx'
import { GameWrapper } from './style'
import { glPositionKeyType, useGameStore, useInteractStore } from '@/utils/Store.ts'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export default function UIControls() {
  const controlRef = useRef<HTMLDivElement>(null)
  const gameRef = useRef<HTMLDivElement>(null)
  const topInfo = useRef<HTMLDivElement>(null)
  const aniDone = useRef(false)

  const [activeIndex, setActiveIndex] = useState(0)
  const [tabsActiveIndex, setTabsActiveIndex] = useState(0)

  useGSAP(() => {
    gsap.set(gameRef.current, { opacity: 0 })
    gsap.to(gameRef.current, {
      opacity: 1,
      duration: 0.5,
      ease: 'power2.in',
      onComplete: () => {
        aniDone.current = true
        // topInfo.current!.style.opacity = '1'
      }
    })
  })

  function handleTabsBox(item:glPositionKeyType, index:number) {
    if (!aniDone.current) return
    setTabsActiveIndex(index)
    useGameStore.setState({ tabs: item })
    gsap.killTweensOf(topInfo.current)
    gsap.set(topInfo.current, { opacity: 0 })
    gsap.to(topInfo.current, {
      opacity: 2,
      duration: 0.5,
      ease: 'power2.in'
    })
  }

  const handlePointerEvent = (e: PointerEvent, flag: boolean) => {
    useGameStore.setState({ touch: flag })
  }

  useEffect(() => {
    useInteractStore.setState({ controlDom: controlRef.current! })
  }, [])

  return (
    <>
      <GameWrapper className='game' ref={gameRef}>
        <div
          className='control'
          ref={controlRef}
          onPointerDown={(e) => handlePointerEvent(e, true)}
          onPointerUp={(e) => handlePointerEvent(e, false)}
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
        <div className='TopInfo-container' ref={topInfo}>
          {tabsActiveIndex === 0 && <Tunnel/>}
          {tabsActiveIndex === 1 && <CarBody/>}
          {tabsActiveIndex === 2 && <WindDrag/>}
          {tabsActiveIndex === 3 && <Radar/>}
        </div>
        <div className='StateTable-container'>
          <div className='StateTable-content'>
            <div className='backgroundLine'></div>
            {tabs.map((item, index) => (
              <div id={item.value} className={`item ${tabsActiveIndex === index ? 'activeBg' : ''}`} key={item.value}>
                {tabsActiveIndex === index && <div className='item-Line'></div>}
                <div className='tableName'>
                  <div className={tabsActiveIndex === index ? 'activeColor' : ''}>{item.label}</div>
                </div>
                <div
                  className='clickBox'
                  onClick={() => handleTabsBox(item.value as glPositionKeyType, index)}></div>
              </div>
            ))}
          </div>
        </div>
      </GameWrapper>
    </>
  )
}
