import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import {
  UnsignedByteType,
  NearestFilter,
  LinearFilter,
  Mesh,
  MeshStandardMaterial,
  ShaderMaterial,
  Color
} from 'three'
import { OrbitControls, useCubeCamera } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useLayoutEffect } from 'react'
import { useReflect } from '@/utils/useReflect'
import { flatModel, printModel } from '@/utils/misc.ts'
import { useGSAP } from '@gsap/react'
import { useGameStore, useLoadedStore } from '@/utils/Store.ts'
import * as THREE from 'three'
import gsap from 'gsap'
import useTabsTarget from '@/Tween/useTabsTarget.ts'
import useTunnelTween from '@/Tween/useTunnelTween.ts'
import useBodyColorTween from '@/Tween/useBodyColorTween.ts'
import useLightMatTween from '@/Tween/useLightMatTween.ts'
import useControl from '@/Tween/useControl.ts'
import initUseRef from '@/config/InitUseRef.ts'
import useWindTween from '@/Tween/useWindTween.ts'
import { setRadarMesh } from '@/utils'

function Experience(prop:any) {
  const { modelRef, params } = initUseRef()
  const { carLoad, tunnelLoader, startRoom, cubeGround, windLine, roadLoader } = prop.model[0]

  const carModel = flatModel(carLoad)
  const roomModel = flatModel(startRoom)
  const tunnelModel = flatModel(tunnelLoader)
  const windModel = flatModel(windLine)

  // printModel(carModel)

  const floor = roomModel[2] as Mesh
  const body = carModel[46] as Mesh
  const radar = carModel[1] as Mesh
  const empennage = carModel[47]
  const tunnel = tunnelModel[1] as Mesh
  const light = roomModel[1] as Mesh
  const floorMaterial = floor.material as ShaderMaterial
  const tunnelMaterial = tunnel.material as ShaderMaterial

  const floorUniforms = floorMaterial.uniforms
  const tunnelUniforms = tunnelMaterial.uniforms
  const bodyMat = body.material as THREE.MeshStandardMaterial

  const { radarGroup } = setRadarMesh(radar as Mesh)
  const { fbo, camera } = useCubeCamera({ resolution: 1024 })
  const scene = useThree((state) => state.scene)
  const glCamera = useThree((state) => state.camera)
  const preColor = useGameStore((state) => state.preColor)
  // const [radarMeshArray, setRadarMeshArray] = useState<Mesh[]>([])

  bodyMat.color = new Color(preColor)
  modelRef.current.bodyMat = body.material as THREE.MeshStandardMaterial
  modelRef.current.floor = floor
  modelRef.current.empennage = empennage
  modelRef.current.lightMat = light.material as MeshStandardMaterial

  fbo.texture.type = UnsignedByteType
  fbo.texture.generateMipmaps = false
  fbo.texture.minFilter = NearestFilter
  fbo.texture.magFilter = NearestFilter

  const { matrix, renderTarget } = useReflect(modelRef.current.floor!, {
    resolution: [innerWidth, innerHeight],
    ignoreObjects: [modelRef.current.floor!, tunnelLoader.scene, startRoom.scene]
  })

  useTabsTarget()
  useGSAP(() => {
    gsap.killTweensOf(glCamera)
    gsap.to(glCamera, {
      fov: 60,
      duration: 4,
      ease: 'power2.out',
      onUpdate: () => {
        glCamera.updateProjectionMatrix()
      }
    })
  },
  { dependencies: [glCamera] }
  )

  useLightMatTween({ modelRef })
  useBodyColorTween({ modelRef })
  useTunnelTween({ params, modelRef, floorUniforms, tunnelUniforms })
  useWindTween({ windModel, carLoad })

  // useControl({ floorUniforms, tunnelUniforms, modelRef })

  useLayoutEffect(() => {
    handleModel()
    floorUniforms.uResolution.value.set(
      renderTarget.width,
      renderTarget.height
    )
    scene.environment = fbo.texture
  }, [])

  useEffect(() => {
    useLoadedStore.setState({ ready: true })
  }, [])
  const handleModel = () => {
    const wheel = []
    const wheel_back_left = carModel[62] as THREE.Mesh
    const wheel_back_right = carModel[68] as THREE.Mesh
    const wheel_front_left = carModel[74] as THREE.Mesh
    const wheel_front_right = carModel[81] as THREE.Mesh
    wheel.push(wheel_back_left, wheel_back_right, wheel_front_left, wheel_front_right)
    wheel.forEach((item) => {
      modelRef.current.wheel.push(item)
    })

    light.material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
      transparent: true,
      alphaTest: 0.01
    })
    floorUniforms.uReflectTexture.value = renderTarget.texture
    renderTarget.texture.minFilter = LinearFilter
    renderTarget.texture.magFilter = LinearFilter
    floorUniforms.uReflectMatrix.value = matrix
  }

  useFrame((state, delta) => {
    tunnelUniforms.uTime.value += delta * 5
    floorUniforms.uTime.value += delta * params.current.floorNormalSpeed * 20
    // console.log(floorUniforms.uTime.value);
    // RectAreaLightUniformsLib.init();
    carLoad.scene.visible = false
    camera.update(state.gl, scene)
    carLoad.scene.visible = true

    modelRef.current.wheel.forEach((child) => {
      child.rotateZ(-delta * 2 * params.current.speedFactor)
    })

    windModel.forEach((item: Mesh) => {
      if (item.isMesh) {
        const mat = item.material as ShaderMaterial
        mat.uniforms.vTime.value += delta
      }
    })
  })

  return <>
    <OrbitControls
      makeDefault
      minDistance={4}
      maxDistance={4}
      minPolarAngle={0.1}
      maxPolarAngle={Math.PI / 2}
      enableZoom={false}
      enablePan={false}
      enableDamping
      target={[0, 0.4, 0]}
    />
    <primitive object={carLoad?.scene}/>
    <primitive object={startRoom?.scene}/>
    <primitive object={tunnelLoader?.scene}/>
    <primitive object={cubeGround?.scene}/>
    <primitive object={windLine?.scene}/>
    {/* <primitive object={roadLoader?.scene}/>*/}
    <primitive object={radarGroup}/>

    {/* <EffectComposer*/}
    {/*  frameBufferType={UnsignedByteType}*/}
    {/*  multisampling={2}*/}
    {/*  enabled*/}
    {/* >*/}
    {/*  <Bloom*/}
    {/*    intensity={1}*/}
    {/*    luminanceThreshold={0.1}*/}
    {/*    blendFunction={BlendFunction.ADD}*/}
    {/*    mipmapBlur*/}
    {/*    radius={0.2}*/}
    {/*    opacity={0.7}*/}
    {/*  />*/}
    {/* </EffectComposer>*/}
  </>
}

export default Experience
