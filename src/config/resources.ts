import { LoaderType } from '../utils/Loader'

const rootPath = import.meta.env.VITE_SUB_DOMAIN || ''

export default [
  { name: 'otherCarLoad', type: LoaderType.GLB, path: rootPath + 'models/gltf/otherCar.glb' },
  { name: 'windLine', type: LoaderType.GLB, path: rootPath + 'models/gltf/wind_line.glb' },
  { name: 'carLoad', type: LoaderType.GLB, path: rootPath + 'models/gltf/su7-car_edit.glb' },
  { name: 'startRoom', type: LoaderType.GLTF, path: rootPath + 'models/sm_startroom.raw.gltf' },
  { name: 'tunnelLoader', type: LoaderType.GLTF, path: rootPath + 'models/sm_speedup.gltf' },
  { name: 'carCurveLoad', type: LoaderType.GLB, path: rootPath + 'models/gltf/xiedu.glb' },
  { name: 'cubeGround', type: LoaderType.GLB, path: rootPath + 'models/gltf/cubeGround.glb' },
  { name: 'roadLoader', type: LoaderType.GLB, path: rootPath + 'models/gltf/road.glb' }
]
