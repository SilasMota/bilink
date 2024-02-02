import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./userSlice"
import filterSlice from './filterSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    filter: filterSlice
  },
})