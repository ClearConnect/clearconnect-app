import { configureStore } from '@reduxjs/toolkit'
import tokenReducer from '../features/auth/AccessTokenSlice'
import { clearConnectApiSlice } from '../features/api/ClearConnectApiSlice'
import { formSlice } from './DataUpdateSlice'
// ...

const store = configureStore({
  reducer: {
    //posts: postsReducer,
    //comments: commentsReducer,
    form: formSlice.reducer,
    tokens: tokenReducer,
    [clearConnectApiSlice.reducerPath]: clearConnectApiSlice.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(clearConnectApiSlice.middleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store

