import { configureStore } from '@reduxjs/toolkit'
import { tmdbApi } from '../services/TMDB'
import genreOrCategoryReducer from '../features/currentGenreOrCategory'
import userReducer from '../features/auth'

export default configureStore({
  reducer: {
    currentGenreOrCategory: genreOrCategoryReducer,
    auth: userReducer,
    [tmdbApi.reducerPath]: tmdbApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdbApi.middleware),
})