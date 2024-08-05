import { create } from 'zustand'
import { Color } from 'three'
type glPositionKeyType = 'tunnel' | 'carBody' | 'windDrag' | 'radar';
interface useGameStoreType{
  touch?: boolean,
  time?: number,
  transfer?: boolean,
  tabs?: glPositionKeyType,
  preColor?: Color,
  bodyColor?: string
}
const useGameStore = create<useGameStoreType>(() => ({
  time: 0,
  touch: false,
  transfer: false,
  tabs: 'tunnel',
  preColor: new Color('#26d6e9'),
  bodyColor: '#26d6e9'
}))

const useInteractStore = create(() => ({
  demand: true,
  controlDom: document.createElement('div'),
  progressDom: document.createElement('div')
}))

const useLoadedStore = create(() => ({
  ready: false
}))
export type { glPositionKeyType }
export { useGameStore, useInteractStore, useLoadedStore }
