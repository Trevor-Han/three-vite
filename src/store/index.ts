import { configureStore } from '@reduxjs/toolkit'
import ThemeSlice from './festures/theme.ts'

const store = configureStore({
  reducer: {
    theme: ThemeSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export default store
