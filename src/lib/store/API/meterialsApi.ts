import { MATERIALS_API } from "@/services/api-end-point/materials";
import clientAxios from "@/services/config";
import auth from "@/utils/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { redirect } from "next/navigation";

export const getPurchaseMaterials = createAsyncThunk(
  "materials/get",
  async (paramsData: any, thunkAPI) => {
    let token = auth.getToken();
    if (!token) {
      redirect("/login");
    }
    try {
      const { data } = await clientAxios.get(
        `${MATERIALS_API.fetch_post_materials_list}`,
        {
          params: paramsData,
          headers: { Authorization: token },
        }
      );
      return data;
    } catch (error: any) {
      // Handle All types of error`
      console.error("Login error:", error);
      if (axios.isAxiosError(error)) {
        const statusCode = error.response?.status;
        const message =
          error.response?.data?.message || "An error occurred during login.";

        if (statusCode === 401) {
          return thunkAPI.rejectWithValue("User not authenticated");
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

export const postPurchaseMaterials = createAsyncThunk(
  "materials/post",
  async (data: any, thunkAPI) => {
    let token = auth.getToken();
    if (!token) {
      redirect("/login");
    }
    const config = {
      headers: { Authorization: token },
    };
    try {
      const response = await clientAxios.post(
        MATERIALS_API.fetch_post_materials_list,
        data,
        config
      );

      thunkAPI.dispatch(getPurchaseMaterials({ page: 1 }));

      return response.data;
    } catch (error: any) {
      // Handle All types of error`
      console.error("Login error:", error);
      if (axios.isAxiosError(error)) {
        const statusCode = error.response?.status;
        const message =
          error.response?.data?.message || "An error occurred during login.";

        if (statusCode === 401) {
          return thunkAPI.rejectWithValue("User not authenticated");
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
