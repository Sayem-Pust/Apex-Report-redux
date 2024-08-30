import { MaterialsProps } from "@/models/materialsModel";
import {  createSlice } from "@reduxjs/toolkit";
import { getPurchaseMaterials } from "./API/meterialsApi";

// api call

const initialState: {
  loading: boolean;
  materialList: MaterialsProps;
} = {
  loading: false,
  materialList: {},
};

const materialSlice = createSlice({
  name: "member",
  initialState: initialState,
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getPurchaseMaterials.fulfilled, (state, action) => {
      state.loading = false;
      state.materialList = action.payload;
    });
  },
  reducers: {},
});

export const commonActions = materialSlice.actions;
export default materialSlice.reducer;
