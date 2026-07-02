import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUserList {
  selectedUserObject?: any;
}

export const initialState: IUserList = {
  selectedUserObject: null,
};

const selectedUserSlice = createSlice({
  name: "selectedUser",
  initialState,
  reducers: {
    setUserDetails: (state, action: PayloadAction<IUserList>) => {
      state.selectedUserObject = action.payload.selectedUserObject;
    },
  },
});
const { actions, reducer } = selectedUserSlice;

export const { setUserDetails } = actions;
export default reducer;
