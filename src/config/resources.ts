import { LoaderType } from '../utils/Loader'

const rootPath = import.meta.env.VITE_SUB_DOMAIN || ''

export default [
  { name: 'env_night', type: LoaderType.RGBE, path: rootPath + 'models/t_env_night.hdr' },
  { name: 'env_light', type: LoaderType.RGBE, path: rootPath + 'models/t_env_light.hdr' },
  { name: 'roadMesh', type: LoaderType.Texture, path: rootPath + 'images/banmaxian.jpg' },
  { name: 'otherCarLoad', type: LoaderType.GLTF, path: rootPath + 'models/gltf/otherCar.glb' },
  { name: 'windLine', type: LoaderType.GLTF, path: rootPath + 'models/gltf/wind_line.glb' },
  { name: 'carLoad', type: LoaderType.GLTF, path: rootPath + 'models/gltf/su7-car_edit.glb' },
  { name: 'carCurveLoad', type: LoaderType.GLTF, path: rootPath + 'models/gltf/xiedu.glb' },
  { name: 'cubeGround', type: LoaderType.GLTF, path: rootPath + 'models/gltf/cubeGround.glb' },
  { name: 'tunnelLoader', type: LoaderType.GLTF, path: rootPath + 'models/gltf/tunnel.glb' },
  { name: 'roadLoader', type: LoaderType.GLTF, path: rootPath + 'models/gltf/road.glb' }
]
