import { Canvas } from '@react-three/fiber'
import { CineonToneMapping } from 'three'
import { Suspense, useState } from 'react'
import Experience from './Experience.tsx'
import UIContainer from '@/components/UI/UIContainer.tsx'
import './ThreeContainer.css'
import { useInteractStore } from '@/utils/Store.ts'
import World from '@/Elements/World.ts'
import Loader from '@/utils/Loader.ts'
import configResources from '@/config/resources.ts'

const world = new World()
const loader = new Loader()
loader.load(configResources)
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

  return <div className='ThreeContainer'>
    <UIContainer/>
    <Canvas
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
      <Suspense fallback={null}>
        {model !== undefined && <Experience model={model}/>}
      </Suspense>
    </Canvas>
  </div>
}

export default ThreeContainer
