import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface gameState {
    game: boolean
    load: boolean
}
type PageActionType =
    | 'show-load'
    | 'hide-load'
    // 游戏操作页
    | 'show-game'
    | 'hide-game';

interface PageAction {
    type: PageActionType;
    payload?: any;
}

const initialState: gameState = {
  game: false,
  load: true
}

function getType(type:PageActionType):boolean {
  switch (type) {
    case 'show-game':
      return true
    case 'hide-game':
      return false
    case 'show-load':
      return true
    case 'hide-load':
      return false
    default:
      return false
  }
}

export const GameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    showGame: (state, action: PayloadAction<PageAction>) => {
      const { payload } = action
      state.game = getType(payload.type)
    },
    showLoad: (state, action: PayloadAction<PageAction>) => {
      const { payload } = action
      state.game = getType(payload.type)
    }
  }
})
export const { showGame, showLoad } = GameSlice.actions
export type { PageActionType }
export default GameSlice.reducer
