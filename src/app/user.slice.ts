import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUser {
  user?: any;
  expiryPath?: any;
  errorObj?: any;
  ahaSsoUser?: any;
  sideMenuState?: boolean;
}

export const initialState: IUser = {
  user: null,
  expiryPath: null,
  errorObj: {},
  ahaSsoUser: {},
  sideMenuState: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload.user;
    },
    setExpiryPath: (state, action: PayloadAction<IUser>) => {
      state.expiryPath = action.payload.expiryPath;
    },
    setErrorOnLogin: (state, action: PayloadAction<IUser>) => {
      state.errorObj = action.payload.errorObj;
    },
    setAhaSsoUser: (state, action: PayloadAction<any>) => {
      state.ahaSsoUser = { ...action.payload };
    },
    setSideMenuState: (state, action: PayloadAction<any>) => {
      state.sideMenuState = action.payload;
    },
  },
});
const { actions, reducer } = userSlice;

export const {
  setUser,
  setExpiryPath,
  setErrorOnLogin,
  setAhaSsoUser,
  setSideMenuState,
} = actions;
export default reducer;
