import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IStreamListFilter {
  Search?: string;
  pageNumber?: number;
  pageSize?: number;
  reserveStreamListFilterState?: boolean;
}

export interface IStreamListOptions {
  streamListFilters: IStreamListFilter;
}

const initialState: IStreamListOptions = {
  streamListFilters: {
    Search: "",
    pageNumber: 1,
    pageSize: 20,
    reserveStreamListFilterState: false,
  },
};

const scrollTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const natsStreamListSlice = createSlice({
  name: "natsStreamList",
  initialState,
  reducers: {
    setSearchFilter: (state, action: PayloadAction<string>) => {
      state.streamListFilters.Search = action.payload;
      state.streamListFilters.pageNumber = 1;
    },

    setPageSize: (state, action: PayloadAction<number>) => {
      state.streamListFilters.pageNumber = 1;
      state.streamListFilters.pageSize = action.payload;
      scrollTop();
    },

    setStreamPageNumber: (state, action: PayloadAction<number>) => {
      state.streamListFilters.pageNumber = action.payload;
      scrollTop();
    },

    setReserveStreamListFilterState: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.streamListFilters.reserveStreamListFilterState = action.payload;
    },

    setClearFilter: (state) => {
      state.streamListFilters = initialState.streamListFilters;
    },
  },
});

const { actions, reducer } = natsStreamListSlice;

// Export actions and reducers for both slices
export const {
  setPageSize,
  setStreamPageNumber,
  setClearFilter,
  setSearchFilter,
  setReserveStreamListFilterState,
} = actions;

export default reducer;
