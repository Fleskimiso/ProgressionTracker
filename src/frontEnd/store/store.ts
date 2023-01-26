import { configureStore } from '@reduxjs/toolkit'
import { workoutFormSlice } from "./slices/WorkoutFormSlice"
import { exerciseListSlice } from './slices/ExerciseListSlice'
import { userSlice } from './slices/UserSlice'
import { workoutsSlice } from './slices/WorkoutsSlice'
 
export const store = configureStore({
    reducer: {
        workoutForm : workoutFormSlice.reducer,
        exerciseList: exerciseListSlice.reducer,
        user: userSlice.reducer,
        workoutsState: workoutsSlice.reducer
    },
  })
  
  // Infer the `RootState` and `AppDispatch` types from the store itself
  export type RootState = ReturnType<typeof store.getState>
  // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
  export type AppDispatch = typeof store.dispatch
  