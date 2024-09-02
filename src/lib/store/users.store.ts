import { createSlice } from "@reduxjs/toolkit";
import { getUser, login } from "./API/UserApis";
import auth from "@/utils/auth";

const initialState: {
  loading: boolean;
  user: any;
  error: any;
} = {
  loading: false,
  user: auth.getUserInfo() || {},
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      state.error = null;
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload.user_data;
      state.error = null;
      state.loading = false;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.error = action.payload as string;
      state.loading = false
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    });
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
