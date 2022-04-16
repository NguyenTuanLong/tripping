import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = { keyword: "" };

export const searchStringSlice = createSlice({
  name: "searchString",
  initialState: { value: initialStateValue },
  reducers: {
    changekeyword: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { changekeyword } = searchStringSlice.actions;

export default searchStringSlice.reducer;