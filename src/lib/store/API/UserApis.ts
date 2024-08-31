import { createAsyncThunk } from "@reduxjs/toolkit";
import auth from "@/utils/auth";
import clientAxios from "@/services/config";
import { USER_API } from "@/services/api-end-point/users";
import axios from "axios";

export const getUser = createAsyncThunk(
  "user/get",
  async (paramsData: any, { rejectWithValue }) => {
    try {
      let data = auth.getUserInfo();
      return data;
    } catch (err: any) {
      console.log(err);

      return rejectWithValue(err.message);
    }
  }
);

export const login = createAsyncThunk(
  "login",
  async (
    data: {
      email: string;
      password: string;
    },
    thunkAPI
  ) => {
    try {
      const response = await clientAxios.post(USER_API.user_signin, data);

      const jwt = `Bearer ${response.data.access_token}`;

      auth.setToken(jwt);
      auth.setUserInfo(response.data.user_data);

      thunkAPI.dispatch(getUser({}));
      return response.data;
    } catch (error: any) {
      // Handle All types of error`
      console.error("Login error:", error);
      if (axios.isAxiosError(error)) {
        const statusCode = error.response?.status;
        const message =
          error.response?.data?.message || "An error occurred during login.";

        if (statusCode === 401) {
          return thunkAPI.rejectWithValue("Invalid email or password.");
        } else if (statusCode === 500) {
          return thunkAPI.rejectWithValue(
            "Internal server error. Please try again later."
          );
        }
        return thunkAPI.rejectWithValue(message);
      }

      return thunkAPI.rejectWithValue(
        "An unexpected error occurred. Please try again."
      );
    }
  }
);
