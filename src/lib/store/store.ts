import { configureStore } from "@reduxjs/toolkit";
import materialReducer from "./materials.store";
import userReducer from "./users.store";

const makeStore = () => {
  return configureStore({
    reducer: {
      material: materialReducer,
      users: userReducer
    },
    devTools: process.env.NODE_ENV !== "production",
  });
};

export const store = makeStore();

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// // Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
