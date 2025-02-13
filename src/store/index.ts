import { combineReducers, configureStore, createSelector } from "@reduxjs/toolkit";
import UsersReducer from "../pages/Users/user.slice";
import { useDispatch, useSelector, useStore } from "react-redux";
export const store = configureStore({
  reducer:  combineReducers({
    users: UsersReducer
  }),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispath = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<typeof store>();
export const createAppSelector = createSelector.withTypes<AppState>();
