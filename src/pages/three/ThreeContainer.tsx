import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { CineonToneMapping } from 'three'
import { useRef, useEffect, useState, Suspense } from 'react'
import { gsap } from 'gsap'
import configResources from '@/config/resources.ts'
import Loading from '@/components/Loading'
import Experience from './Experience.tsx'
import UIContainer from '@/components/UI/UIContainer.tsx'
import './ThreeContainer.css'
import World from '@/Elements/World.ts'
import Loader from '@/utils/Loader.ts'

const world = new World()
const loader = new Loader()
loader.load(configResources)

function ThreeContainer() {
  const loadingRef = useRef<HTMLDivElement>(null)
  const [model, setModel] = useState<object | undefined>(undefined)

  useEffect(() => {
    loader.onFileLoaded(() => {
      const value = loader.totalSuccess / loader.total * 100
      const text = `加载场景模型: ${parseInt(value.toString())} %`
      const percent = loadingRef.current && loadingRef.current.querySelector('.progress')
      if (percent instanceof HTMLElement) {
        percent.innerText = text
      }
    })
    loader.onLoadEnd(resources => {
      gsap.to('.loading-con', { opacity: 0, onComplete: () => {
        world.build(resources)
        setModel([world.model])
        loadingRef.current && loadingRef.current.classList.add('display-none')
      } })
    })
  }, [])

  return <div className='ThreeContainer'>
    <Loading ref={loadingRef}/>
    <UIContainer/>
    <Canvas
      frameloop={!model ? 'never' : 'always'}
      dpr={[1, 2]}
      gl={{
        antialias: true,
        toneMapping: CineonToneMapping
      }}
      camera={{
        fov: 75,
        near: 0.1,
        far: 500,
        position: [-0.1072, 0.5, -3.4973]
      }}
    >
      <Suspense fallback={null}>
        { model !== undefined && <Experience model={model}/>}
      </Suspense>

      <OrbitControls makeDefault/>
    </Canvas>
  </div>
}

export default ThreeContainer
