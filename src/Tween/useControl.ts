import { useControls } from 'leva'

export default function UseControl(config:any) {
  const { floorUniforms, tunnelUniforms, modelRef } = config
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
}
