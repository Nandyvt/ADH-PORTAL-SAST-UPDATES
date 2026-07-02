import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IHeader {
  headerTitle?: string;
  roleSwitchObj?: {
    isRoleSwitchDone: boolean;
    roleSwitchDetails: {
      selectedRoleCode: string;
      selectedRoleName: string;
      selectedRoleClientId: string;
      selectedRoleClientName: string;
    };
  };
}

export const initialState: IHeader = {
  headerTitle: "",
  roleSwitchObj: {
    isRoleSwitchDone: false,
    roleSwitchDetails: {
      selectedRoleCode: "",
      selectedRoleClientId: "",
      selectedRoleName: "",
      selectedRoleClientName: "",
    },
  },
};

const headerSice = createSlice({
  name: "header",
  initialState,
  reducers: {
    setHeaderTitleText: (state, action: PayloadAction<IHeader>) => {
      state.headerTitle = action.payload.headerTitle;
    },
    setRoleSwitchObj: (state, action: PayloadAction<IHeader>) => {
      state.roleSwitchObj = action.payload.roleSwitchObj;
    },
  },
});
const { actions, reducer } = headerSice;

export const { setHeaderTitleText, setRoleSwitchObj } = actions;
export default reducer;
