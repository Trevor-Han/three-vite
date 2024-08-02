import { create } from 'zustand'
import { Color } from 'three'

const useGameStore = create(() => ({
  time: 0,
  transfer: false,
  preColor: new Color('#26d6e9'),
  bodyColor: '#26d6e9'
}))
export { useGameStore }
