import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type MasterSlice = {
  todos: MasterTodos;
  counterLimit: number;
};

export type MasterTodos = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}[];

const initialState: MasterSlice = {
  todos: [
    {
      userId: 1,
      id: 1,
      title: "delectus aut autem",
      completed: false,
    },
  ],
  counterLimit: 0,
};

const masterSlice = createSlice({
  initialState,
  name: "masterSlice",
  reducers: {
    setMaster: (state, action: PayloadAction<MasterTodos>) => {
      state.todos = action.payload;
      return state;
    },
    setCounterLimit: (state, action: PayloadAction<{ limit: number }>) => {
      state.counterLimit = action.payload.limit;
      return state;
    },
  },
});

export const { setMaster, setCounterLimit } = masterSlice.actions;
export default masterSlice.reducer;
