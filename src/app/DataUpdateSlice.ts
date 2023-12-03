import { /*createAction, createReducer,*/ createSlice } from '@reduxjs/toolkit';

export const formSlice = createSlice({
    name: 'form',
    initialState: 'clean',
    reducers: {
        clean(state) { state = 'clean' },
        dirty(state) { state = 'dirty' }
    }
})
export const { clean, dirty } = formSlice.actions
export default formSlice.reducer 