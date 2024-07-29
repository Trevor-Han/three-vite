import { lazy } from 'react'
const Three = lazy(() => import('../pages/three/ThreeContainer.tsx'))

const fullSceneRouter = [

  { path: '/three', element: <Three/>, key: 'three' },
  { path: '/', element: <Three/>, key: 'three' }

]
export default fullSceneRouter
