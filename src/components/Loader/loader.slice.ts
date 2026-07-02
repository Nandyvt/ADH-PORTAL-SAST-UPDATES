import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ILoader {
  isPageLoading: boolean;
}

export const initialState: ILoader = {
  isPageLoading: false,
};

const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    setPageLoadingStatus: (state, action: PayloadAction<ILoader>) => {
      state.isPageLoading = action.payload.isPageLoading;
    },
  },
});
const { actions, reducer } = loaderSlice;

export const { setPageLoadingStatus } = actions;
export default reducer;
