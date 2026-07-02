import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IConsumerTabFilter {
  search?: string;
  type?: string;
  clientCode?: string;
  showModal?: boolean;
  pageNumber?: number;
  pageSize?: number;
  prepopulateValues?: any;
}

export interface IConsumerTabOptions {
  consumerTabFilters: IConsumerTabFilter;
}

const initialState: IConsumerTabOptions = {
  consumerTabFilters: {
    search: "",
    clientCode: "",
    type: "",
    pageNumber: 1,
    pageSize: 20,
    prepopulateValues: {},
  },
};

const scrollTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const natsConsumerListSlice = createSlice({
  name: "natsConsumerList",
  initialState,
  reducers: {
    setConsumerNameFilter: (state, action: PayloadAction<string>) => {
      state.consumerTabFilters.search = action.payload;
    },
    setTypeFilter: (state, action: PayloadAction<string>) => {
      state.consumerTabFilters.type = action.payload;
    },
    setClientFilter: (state, action: PayloadAction<string>) => {
      state.consumerTabFilters.clientCode = action.payload;
    },

    setFilters: (state, action: PayloadAction<IConsumerTabFilter>) => {
      state.consumerTabFilters = {
        ...state.consumerTabFilters,
        ...action.payload,
      };
    },

    setPageSize: (state, action: PayloadAction<number>) => {
      state.consumerTabFilters.pageNumber = 1;
      state.consumerTabFilters.pageSize = action.payload;
      scrollTop();
    },

    setPageNumber: (state, action: PayloadAction<number>) => {
      state.consumerTabFilters.pageNumber = action.payload;
      scrollTop();
    },

    setClearFilter: (state) => {
      state.consumerTabFilters = initialState.consumerTabFilters;
    },
  },
});

const { actions, reducer } = natsConsumerListSlice;

export const {
  setConsumerNameFilter,
  setTypeFilter,
  setClientFilter,
  setPageSize,
  setPageNumber,
  setClearFilter,
  setFilters,
} = actions;
export default reducer;
