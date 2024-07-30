import World from '@/Elements/World.ts'
const world = new World()
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import {
  UnsignedByteType,
  NearestFilter,
  LinearFilter,
  Mesh,
  MeshStandardMaterial,
  TextureLoader,
  LinearSRGBColorSpace, RepeatWrapping, SRGBColorSpace
} from 'three'
import { useCubeCamera, useTexture } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useLayoutEffect, Suspense, useRef } from 'react'
import { useReflect } from '@/utils/useReflect'
import * as THREE from 'three'
import {useControls} from 'Leva'
import {flatModel, printModel} from '@/utils/misc.ts'
import CustomShaderMaterial from 'three-custom-shader-material/vanilla'
import floorVertex from '@/pages/three/shader/floot/floorver.glsl'
import floorFrag from '@/pages/three/shader/floot/floorfrag.glsl'

interface propType{
  model?: any
}

function Experience(props:propType) {
  const floornormalMap = new TextureLoader().load('images/t_floor_normal.webp')
  const floorroughnessMap = new TextureLoader().load('images/t_floor_roughness.webp')
  const lightMap = new TextureLoader().load('images/t_startroom_light.raw.jpg');
  const startRoomAoMap = new TextureLoader().load('images/t_startroom_ao.raw.jpg');

  floorroughnessMap.colorSpace = LinearSRGBColorSpace;
  floorroughnessMap.wrapS = floorroughnessMap.wrapT = RepeatWrapping;
  floornormalMap.colorSpace = LinearSRGBColorSpace;
  floornormalMap.wrapS = floornormalMap.wrapT = RepeatWrapping;
  startRoomAoMap.flipY = false;
  startRoomAoMap.channel = 1;
  startRoomAoMap.flipY = false;
  startRoomAoMap.colorSpace = LinearSRGBColorSpace;
  lightMap.channel = 1;
  lightMap.flipY = false;
  lightMap.colorSpace = SRGBColorSpace;

  const modelRef = useRef({
    wheel: [] as Mesh[],
    bodyMat: null as MeshStandardMaterial | null,
    floor: null as Mesh | null,
    lightMat: null as MeshStandardMaterial | null
  })

  const { carLoad, envLight, tunnelLoader } = world.build(props.model)
  const { matrix, renderTarget } = useReflect(modelRef.current.floor!, {
    resolution: [innerWidth, innerHeight],
    ignoreObjects: [modelRef.current.floor!, world.car.groundLoader]
  })

  const { fbo, camera } = useCubeCamera({ resolution: 1024 })
  const scene = useThree((state) => state.scene)

  fbo.texture.type = UnsignedByteType
  fbo.texture.generateMipmaps = false
  fbo.texture.minFilter = NearestFilter
  fbo.texture.magFilter = NearestFilter

  useFrame((state, delta) => {
    if (world.car.uniforms) {
      world.car.uniforms.uTime.value += delta * 20;
    }
    carLoad.scene.visible = false;
    camera.update(state.gl, scene);
    carLoad.scene.visible = true;

  })

  useControls("mimapLevel", {
    level: {
      min: 0,
      max: 10,
      value: 2.5,
      onChange: (value) => {
        world.car.uniforms!.uLevel.value = value
      },
    },
    lightOpacity: {
      value: 1,
      min: 0,
      max: 1,
      onChange: (value) => {
        modelRef.current.lightMat!.opacity = value;
      },
    },
  });

  useLayoutEffect(() => {
    handleModel()
    if(world.car.uniforms){
      world.car.uniforms.uResolution.value.set(
          renderTarget.width,
          renderTarget.height
      );
    }
    scene.environment = fbo.texture
    // scene.environment = envLight
  }, [])

  const handleModel = () =>{
    tunnelLoader.scene.visible = false
    const carModel = flatModel(carLoad)
    const floor = carModel[1] as Mesh
    printModel(carModel)

    const body = carModel[51] as Mesh;
    const bodyMat = body.material as THREE.MeshStandardMaterial;
    bodyMat.envMapIntensity = 2;

    const light = carModel[2] as Mesh
    const lightMat = light.material as THREE.MeshPhysicalMaterial;
    lightMat.emissive = new THREE.Color("white");
    lightMat.toneMapped = false;
    lightMat.transparent = true;
    light.material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
      transparent: true,
      alphaTest: 0.01,
    });

    // bodyMat.color = new THREE.Color("#26d6e9");
    const floorMat = world.car.groundLoader.material as THREE.MeshPhysicalMaterial;
    floorMat.roughnessMap = floorroughnessMap;
    floorMat.normalMap = floornormalMap;
    floorMat.aoMap = startRoomAoMap;
    floorMat.lightMap = lightMap;
    floorMat.envMapIntensity = 0.5;

    const floorCsmMat = new CustomShaderMaterial({
      baseMaterial: floorMat,
      uniforms: world.car.uniforms,
      vertexShader: floorVertex,
      fragmentShader: floorFrag,
      silent: true
    })

    world.car.update('平面', floorCsmMat)
    world.car.uniforms.uReflectTexture.value = renderTarget.texture
    renderTarget.texture.minFilter = LinearFilter
    renderTarget.texture.magFilter = LinearFilter
    world.car.uniforms.uReflectMatrix.value = matrix

    modelRef.current.bodyMat = bodyMat;
    modelRef.current.floor = floor
    modelRef.current.lightMat = light.material as MeshStandardMaterial;
  }

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
