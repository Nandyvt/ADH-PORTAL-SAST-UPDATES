import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ToastHandler from "components/Toast/toast.handler";

export interface IToast {
  visibility?: boolean;
  message?: string;
  title?: string;
  code?: string;
  type?: string;
  suppress?: boolean;
}

export const initialState: IToast = {
  visibility: false,
  message: "",
  title: "",
  type: "",
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (state, action: PayloadAction<IToast>) => {
      const error: any = ToastHandler(action.payload);
      state.visibility = error.visibility;
      state.message = error.message;
      state.title = error.title;
      state.type = error.type;
    },
    hideToast: (state) => {
      state.visibility = false;
    },
  },
});
const { actions, reducer } = toastSlice;

export const { showToast, hideToast } = actions;
export default reducer;
