import { configureStore } from '@reduxjs/toolkit'
import ThemeSlice from './festures/theme.ts'
import GameSlice from './festures/game.ts'
import modelSlice from './festures/model.ts'

const store = configureStore({
  reducer: {
    theme: ThemeSlice,
    game: GameSlice,
    model: modelSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export default store
