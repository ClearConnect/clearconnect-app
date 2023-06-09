import { configureStore } from '@reduxjs/toolkit'
import  tokenReducer  from '../features/auth/AccessTokenSlice'
import { apiSlice } from '../features/api/apiSlice'
// ...

 const store = configureStore({
  reducer: {
    //posts: postsReducer,
    //comments: commentsReducer,
    //users: usersReducer
     tokens: tokenReducer,
     [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware().concat(apiSlice.middleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store