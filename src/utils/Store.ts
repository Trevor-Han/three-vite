import { create } from 'zustand'
import { Color } from 'three'

const useGameStore = create(() => ({
  time: 0,
  transfer: false,
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
export { useGameStore, useInteractStore, useLoadedStore }
