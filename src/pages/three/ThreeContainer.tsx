import { Canvas } from '@react-three/fiber'
import { CineonToneMapping } from 'three'
import { PointerEvent, Suspense, useState } from 'react'
import Experience from './Experience.tsx'
import UIContainer from '@/components/UI/UIContainer.tsx'
import './ThreeContainer.css'
import { useGameStore, useInteractStore } from '@/utils/Store.ts'
import World from '@/Elements/World.ts'
import Loader from '@/utils/Loader.ts'
import configResources from '@/config/resources.ts'
import { Spin } from 'antd'

const world = new World()
const loader = new Loader()
loader.load(configResources)

function Loading() {
  return <>
    <div><Spin tip='Loading' size='small'/></div>
  </>
}

function ThreeContainer() {
  const demand = useInteractStore((state) => state.demand)
  const progressDom = useInteractStore((state) => state.progressDom)
  const [model, setModel] = useState<object | undefined>(undefined)

  loader.onFileLoaded(() => {
    const value = loader.totalSuccess / loader.total * 100
    progressDom!.textContent = `加载场景模型: ${parseInt(value.toString())} %`
  })
  loader.onLoadEnd(resources => {
    world.build(resources)
    setModel([world.model])
  })

  const handlePointerEvent = (e: PointerEvent, flag: boolean) => {
    if (!(e.target instanceof HTMLCanvasElement)) {
      return
    }
    useGameStore.setState({ touch: flag })
  }

  return <div className='ThreeContainer'>
    <UIContainer/>
    <Canvas
      onPointerDown={(e) => handlePointerEvent(e, true)}
      onPointerUp={(e) => handlePointerEvent(e, false)}
      frameloop={demand ? 'never' : 'always'}
      dpr={[1, 2]}
      gl={{
        antialias: true,
        toneMapping: CineonToneMapping
      }}
      camera={{
        fov: 75,
        near: 0.1,
        far: 500,
        position: [-0.0908, 0.8, -3.9976]
      }}
    >
      <Suspense fallback={<Loading/>}>
        {model !== undefined && <Experience model={model}/>}
      </Suspense>
    </Canvas>
  </div>
}

export default ThreeContainer
