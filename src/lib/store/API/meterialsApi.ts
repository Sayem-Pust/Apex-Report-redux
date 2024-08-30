import { MATERIALS_API } from "@/services/api-end-point/materials";
import clientAxios from "@/services/config";
import auth from "@/utils/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { redirect } from "next/navigation";

export const getPurchaseMaterials = createAsyncThunk(
  "materials/get",
  async (paramsData: any, { rejectWithValue }) => {
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
    } catch (err: any) {
      console.log(err);

      return rejectWithValue(err.message);
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

      return response.data; // Return the data from the response
    } catch (error) {
      console.log(error);
      throw error; // Rethrow the error so it can be handled by the rejected action
    }
  }
);
