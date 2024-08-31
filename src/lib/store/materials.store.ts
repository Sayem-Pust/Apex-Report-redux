import { MaterialsProps } from "@/models/materialsModel";
import {  createSlice } from "@reduxjs/toolkit";
import { getPurchaseMaterials, postPurchaseMaterials } from "./API/meterialsApi";

// api call

const initialState: {
  loading: boolean;
  materialList: MaterialsProps;
  error: any;
} = {
  loading: false,
  materialList: {},
  error: null
};

const materialSlice = createSlice({
  name: "member",
  initialState: initialState,
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getPurchaseMaterials.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getPurchaseMaterials.fulfilled, (state, action) => {
      state.loading = false;
      state.materialList = action.payload;
      state.error = null
    });
    builder.addCase(getPurchaseMaterials.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(postPurchaseMaterials.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(postPurchaseMaterials.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(postPurchaseMaterials.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
  reducers: {},
});

export const commonActions = materialSlice.actions;
export default materialSlice.reducer;
