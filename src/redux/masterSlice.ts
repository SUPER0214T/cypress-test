import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type MasterSlice = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}[];

const initialState: MasterSlice = [
  {
    userId: 1,
    id: 1,
    title: "delectus aut autem",
    completed: false,
  },
];

const masterSlice = createSlice({
  initialState,
  name: "masterSlice",
  reducers: {
    setMaster: (state, action: PayloadAction<MasterSlice>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setMaster } = masterSlice.actions;
export default masterSlice.reducer;
