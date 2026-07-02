import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IEntityListFilter {
  search?: string;
  source?: string;
  pageNumber?: number;
  pageSize?: number;
  reserveEntityListFilterState?: boolean;
  clientLabel?: string;
}

export interface IStreamEntityOptions {
  entityListFilters: IEntityListFilter;
}

const initialState: IStreamEntityOptions = {
  entityListFilters: {
    search: "",
    source: "",
    pageNumber: 1,
    pageSize: 20,
    reserveEntityListFilterState: false,
    clientLabel: "",
  },
};

const scrollTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const entityListSlice = createSlice({
  name: "entityList",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<IEntityListFilter>) => {
      state.entityListFilters = {
        ...state.entityListFilters,
        ...action.payload,
      };
    },

    setPageSize: (state, action: PayloadAction<number>) => {
      state.entityListFilters.pageNumber = 1;
      state.entityListFilters.pageSize = action.payload;
      scrollTop();
    },

    setPageNumber: (state, action: PayloadAction<number>) => {
      state.entityListFilters.pageNumber = action.payload;
      scrollTop();
    },

    setClearFilter: (state) => {
      state.entityListFilters = {
        search: "",
        source: "",
        clientLabel: "",
        pageNumber: 1,
        pageSize: 20,
      };
    },
  },
});

// Export actions and reducers for both slices
export const { setPageSize, setPageNumber, setClearFilter, setFilters } =
  entityListSlice.actions;

export default {
  entityListSlice: entityListSlice.reducer,
};
