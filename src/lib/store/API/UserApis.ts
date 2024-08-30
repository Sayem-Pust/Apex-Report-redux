import { createAsyncThunk } from "@reduxjs/toolkit";
import auth from "@/utils/auth";
import clientAxios from "@/services/config";
import { USER_API } from "@/services/api-end-point/users";

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
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);
