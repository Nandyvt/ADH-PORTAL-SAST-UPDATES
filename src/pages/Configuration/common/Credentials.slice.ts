import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ICredentialsFilter {
  search?: string;
  clientCode?: string;
  clientLabel?: string;
  pageNumber?: number;
  pageSize?: number;
}

export interface ICredentialsOptions {
  credentialsFilters: ICredentialsFilter;
}

const initialState: ICredentialsOptions = {
  credentialsFilters: {
    search: "",
    clientCode: "",
    clientLabel: "",
    pageNumber: 1,
    pageSize: 20,
  },
};

const scrollTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const natsCredentialListSlice = createSlice({
  name: "natsCredentialsList",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<ICredentialsFilter>) => {
      state.credentialsFilters = {
        ...state.credentialsFilters,
        ...action.payload,
      };
    },

    setPageSize: (state, action: PayloadAction<number>) => {
      state.credentialsFilters.pageNumber = 1;
      state.credentialsFilters.pageSize = action.payload;
      scrollTop();
    },

    setPageNumber: (state, action: PayloadAction<number>) => {
      state.credentialsFilters.pageNumber = action.payload;
      scrollTop();
    },

    setClearFilter: (state) => {
      state.credentialsFilters = {
        search: "",
        clientCode: "",
        clientLabel: "",
        pageNumber: 1,
        pageSize: 20,
      };
    },
  },
});

const { actions, reducer } = natsCredentialListSlice;

export const { setPageSize, setPageNumber, setClearFilter, setFilters } =
  actions;
export default reducer;
