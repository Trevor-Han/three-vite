import World from '@/Elements/World.ts'
import Car from '@/Elements/Car.ts'
const world = new World()
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { UnsignedByteType, NearestFilter, LinearFilter, Mesh, MeshStandardMaterial } from 'three'
import { useCubeCamera } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useLayoutEffect, Suspense, useRef } from 'react'
import { useReflect } from '@/utils/useReflect'
import * as THREE from 'three'
import CustomShaderMaterial from 'three-custom-shader-material/vanilla'
import floorVertex from '@/pages/three/shader/floot/floorver.glsl'
import floorFrag from '@/pages/three/shader/floot/floorfrag.glsl'

interface propType{
  model?: any
}

function Experience(props:propType) {
  const modelRef = useRef({
    wheel: [] as Mesh[],
    bodyMat: null as MeshStandardMaterial | null,
    floor: null as Mesh | null,
    lightMat: null as MeshStandardMaterial | null
  })

  const { carLoad, envLight, tunnelLoader } = world.build(props.model)
  const [nameToMeshDic] = world.car.MeshChildren()
  modelRef.current.floor = nameToMeshDic['ground'].scene
  const { matrix, renderTarget } = useReflect(modelRef.current.floor!, {
    resolution: [innerWidth, innerHeight],
    ignoreObjects: [carLoad.scene, tunnelLoader.scene, nameToMeshDic['ground'].scene]
  })

  // const { fbo, camera } = useCubeCamera({ resolution: 1024 })
  const scene = useThree((state) => state.scene)

  // fbo.texture.type = UnsignedByteType
  // fbo.texture.generateMipmaps = false
  // fbo.texture.minFilter = NearestFilter
  // fbo.texture.magFilter = NearestFilter

  useFrame((_state, delta) => {
  //   if (car.groundLoader) {
  //     car.groundLoader.visible = false
  //     camera.position.copy(state.camera.position)
  //     camera.position.y *= -1
  //     camera.update(state.gl, scene)
  //     car.groundLoader.visible = true
  //   }
    if (world.car.uniforms) {
      world.car.uniforms.uTime.value += delta
    }
  })

  useLayoutEffect(() => {
    if (world.car.uniforms) {
      const floorMat = nameToMeshDic['ground'].material as THREE.MeshPhysicalMaterial
      floorMat.envMapIntensity = 0.5
      const floorCsmMat = new CustomShaderMaterial({
        baseMaterial: floorMat,
        uniforms: world.car.uniforms,
        vertexShader: floorVertex,
        fragmentShader: floorFrag,
        silent: true
      })
      nameToMeshDic['ground'].material = floorCsmMat
      world.car.uniforms.uReflectTexture.value = renderTarget.texture
      renderTarget.texture.minFilter = LinearFilter
      renderTarget.texture.magFilter = LinearFilter
      world.car.uniforms.uReflectMatrix.value = matrix
      modelRef.current.floor = nameToMeshDic['ground'].scene
    }
    scene.environment = envLight
    // car.updateFBO(fbo)
  }, [])

  return <>
    <group>
      <Suspense fallback={null}>
        <primitive object={carLoad?.scene}></primitive>
        <primitive object={tunnelLoader?.scene}></primitive>
      </Suspense>
    </group>
    <EffectComposer
      frameBufferType={UnsignedByteType}
      multisampling={2}
      enabled={false}
    >
      <Bloom
        luminanceThreshold={0.1}
        blendFunction={BlendFunction.ADD}
        mipmapBlur
        radius={0.2}
        opacity={0.7}
      ></Bloom>
    </EffectComposer>
  </>
}

export default Experience
