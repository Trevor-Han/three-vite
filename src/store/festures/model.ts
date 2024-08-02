import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  model: null
}

export const modelSlice = createSlice({
  name: 'model',
  initialState,
  reducers: {
    initModel: (state, action:PayloadAction<any>) => {
      console.log(action.payload);
      state.model = action.payload
    }
  }
})
export const { initModel } = modelSlice.actions
export default modelSlice.reducer
