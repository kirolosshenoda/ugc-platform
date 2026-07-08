import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import creatorReducer from './slices/creatorSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    creator: creatorReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
