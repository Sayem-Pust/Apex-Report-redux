import { createSlice } from "@reduxjs/toolkit";
import { getUser, login } from "./API/UserApis";
import auth from "@/utils/auth";

const initialState: {
  loading: boolean;
  user: any;
} = {
  loading: false,
  user: auth.getUserInfo() || {},
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    // builder.addCase(getAmbassadorList.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.ambassadorList = action.payload;
    // });
    // builder.addCase(getUserProfile.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.userDetails = action.payload;
    // });
  },
  reducers: {
    logout: (state) => {
      auth.clearToken("jwtToken");
      auth.clearUserInfo();
      state.user = {};
    },
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
