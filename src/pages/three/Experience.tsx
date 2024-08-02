import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { UnsignedByteType, NearestFilter, LinearFilter, Mesh, MeshStandardMaterial, ShaderMaterial, Color } from 'three'
import { OrbitControls, useCubeCamera } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useLayoutEffect, useRef } from 'react'
import { useReflect } from '@/utils/useReflect'
import { useControls } from 'Leva'
import { flatModel, printModel } from '@/utils/misc.ts'
import { useGSAP } from '@gsap/react'
import { useGameStore, useInteractStore, useLoadedStore } from '@/utils/Store.ts'
import * as THREE from 'three'
import gsap from 'gsap'

function Experience(prop:any) {
  const modelRef = useRef({
    wheel: [] as Mesh[],
    bodyMat: null as MeshStandardMaterial | null,
    floor: null as Mesh | null,
    lightMat: null as MeshStandardMaterial | null
  })
  const controlDom = useInteractStore((state) => state.controlDom)

  const { carLoad, tunnelLoader, startRoom } = prop.model[0]
  tunnelLoader.scene.visible = false

  const carModel = flatModel(carLoad)
  const roomModel = flatModel(startRoom)
  const tunnelModel = flatModel(tunnelLoader)

  // printModel(tunnelModel)

  const floor = roomModel[2] as Mesh
  const body = carModel[46] as Mesh
  const tunnel = tunnelModel[1] as Mesh
  const light = roomModel[1] as Mesh
  const floorMaterial = floor.material as ShaderMaterial
  const tunnelMaterial = tunnel.material as ShaderMaterial
  const floorUniforms = floorMaterial.uniforms
  const tunnelUniforms = tunnelMaterial.uniforms
  const bodyMat = body.material as THREE.MeshStandardMaterial

  const { fbo, camera } = useCubeCamera({ resolution: 1024 })
  const scene = useThree((state) => state.scene)
  const glCamera = useThree((state) => state.camera)
  const bodyColor = useGameStore((state) => state.bodyColor)
  const preColor = useGameStore((state) => state.preColor)

  bodyMat.color = new Color(preColor)
  modelRef.current.bodyMat = body.material as THREE.MeshStandardMaterial
  modelRef.current.floor = floor
  modelRef.current.lightMat = light.material as MeshStandardMaterial

  const par = {
    color: modelRef.current.bodyMat!.color,
    targetColor: new Color(bodyColor)
  }

  useGSAP(() => {
    gsap.killTweensOf(par)
    const parT = gsap.timeline()
    parT.to(par.color, {
      duration: 1,
      ease: 'power1.out',
      r: par.targetColor.r,
      g: par.targetColor.g,
      b: par.targetColor.b,
      onUpdate: () => {
        modelRef.current.bodyMat?.color.set(par.color)
      },
      onComplete: () => {
        useGameStore.setState({ preColor: par.color })
      }
    })
  },
  { dependencies: [bodyColor] }
  )
  useGSAP(() => {
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

  fbo.texture.type = UnsignedByteType
  fbo.texture.generateMipmaps = false
  fbo.texture.minFilter = NearestFilter
  fbo.texture.magFilter = NearestFilter

  const { matrix, renderTarget } = useReflect(floor, {
    resolution: [innerWidth, innerHeight],
    ignoreObjects: [floor, tunnelLoader.scene, startRoom.scene]
  })

  useControls('mimapLevel', {
    level: {
      min: 0,
      max: 10,
      value: 2.5,
      onChange: (value) => {
        floorUniforms!.uLevel.value = value
      }
    },
    tunnelSpeed: {
      value: 1,
      min: 0,
      max: 10,
      onChange: (value) => {
        tunnelUniforms.uTime.value = value
      }
    },
    lightOpacity: {
      value: 1,
      min: 0,
      max: 1,
      onChange: (value) => {
        modelRef.current.lightMat!.opacity = value
      }
    }
  })

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
    const wheel = carModel[35] as THREE.Mesh
    wheel.children.forEach((child) => {
      const mesh = child as Mesh
      const mat = mesh.material as THREE.MeshStandardMaterial
      mat.envMapIntensity = 5
      modelRef.current.wheel.push(mesh)
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

  useFrame((state) => {
    // tunnelUniforms.uTime.value += delta * 8;
    // RectAreaLightUniformsLib.init();
    carLoad.scene.visible = false
    camera.update(state.gl, scene)
    carLoad.scene.visible = true
  })

  return <>
    <OrbitControls domElement={controlDom}/>
    <primitive object={carLoad?.scene}/>
    <primitive object={startRoom?.scene}/>
    <primitive object={tunnelLoader?.scene}/>

    <EffectComposer
      frameBufferType={UnsignedByteType}
      multisampling={2}
      enabled={false}
    >
      <Bloom
        intensity={1}
        luminanceThreshold={2}
        blendFunction={BlendFunction.ADD}
        mipmapBlur
        radius={0.5}
        opacity={1}
      />
    </EffectComposer>
  </>
}

export default Experience
