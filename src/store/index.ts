import { configureStore } from '@reduxjs/toolkit'
import ThemeSlice from './festures/theme.ts'
import GameSlice from './festures/game.ts'

const store = configureStore({
  reducer: {
    theme: ThemeSlice,
    game: GameSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export default store
