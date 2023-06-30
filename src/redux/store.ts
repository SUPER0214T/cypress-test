import { configureStore } from "@reduxjs/toolkit";
import masterReducer from "./masterSlice";

export const store = configureStore({
  reducer: { master: masterReducer },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
