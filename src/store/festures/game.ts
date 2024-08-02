import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface gameState {
    game: boolean
}
type PageActionType =
    // 游戏操作页
    | 'show-game'
    | 'hide-game';

interface PageAction {
    type: PageActionType;
    payload?: any;
}

const initialState: gameState = {
  game: false
}

export const GameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    showGame: (state, action: PayloadAction<PageAction>) => {
      const { payload } = action
      function getType():boolean {
        switch (payload.type) {
          case 'show-game':
            return true
          case 'hide-game':
            return false
          default:
            return false
        }
      }
      state.game = getType()
    }
  }
})
export const { showGame } = GameSlice.actions
export default GameSlice.reducer
