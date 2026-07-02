import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface IAuthed {
  userToken?: string;
  ahaSsoAccessToken?: string;
}

export const initialState: IAuthed = {
  userToken: "",
  ahaSsoAccessToken: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<IAuthed>) => {
      const data: any = action.payload;
      state.userToken = data.userToken;
    },
    setAhaSsoAccessToken: (state, action: PayloadAction<IAuthed>) => {
      const data: any = action.payload;
      state.ahaSsoAccessToken = data;
    },
  },
});
const { actions, reducer } = authSlice;
export const getUserToken = (state: RootState): string =>
  state.authed.userToken as string;
export const getAhaSsoToken = (state: RootState): string =>
  state.authed.ahaSsoAccessToken as string;
export const { setToken, setAhaSsoAccessToken } = actions;
export default reducer;
