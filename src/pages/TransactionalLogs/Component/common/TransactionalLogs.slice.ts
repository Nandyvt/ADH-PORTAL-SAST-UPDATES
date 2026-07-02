/* This code is defining a TypeScript module that exports a Redux slice for managing pagination and
filtering of transactional logs. */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getCurrentDateTime,
  getCustomDateRange,
  setHoursMinutesToZero,
} from "common/utils";

export interface IPagination {
  nextCursor?: string;
  previousCursor?: string;
  pageOrder: string;
  cursor?: string;
}

export interface ITransactionalLogFilter {
  id?: string;
  entityName?: string[];
  source?: string[];
  transactionStatus?: string[];
  consumer?: string[];
  startDate?: string;
  endDate?: string;
  message?: string;
  transactionId?: string;
  checkfilter?: any[];
  sortBy?: string;
  code?: string;
  email?: string;
  showModal?: boolean;
}

export interface ITransactionalLog {
  pagination: IPagination;
  cursorpagination: any;
  transactionalLogFilter: ITransactionalLogFilter;
}

const initialState: ITransactionalLog = {
  pagination: {
    nextCursor: "",
    previousCursor: "",
    pageOrder: "DESC",
    cursor: "",
  },
  cursorpagination: {
    prevCount: 1,
    nextCount: 20,
    pageSize: 20,
    transLogDataLength: 0,
  },
  transactionalLogFilter: {
    id: "",
    entityName: [],
    source: [],
    transactionStatus: [],
    consumer: [],
    startDate:
      window.outerWidth < 576
        ? new Date(
            setHoursMinutesToZero(getCustomDateRange(7, true))
          ).toISOString()
        : "",
    endDate:
      window.outerWidth < 576
        ? new Date(getCurrentDateTime("")).toISOString()
        : "",
    message: "",
    transactionId: "",
    checkfilter: [],
    code: "",
    email: "",
    showModal: false,
  },
};

const transactionalLogSlice = createSlice({
  name: "transactionalLog",
  initialState,
  reducers: {
    setPagination: (state, action: PayloadAction<IPagination>) => {
      state.pagination.nextCursor = action.payload.nextCursor;
      state.pagination.previousCursor = action.payload.previousCursor;
    },
    setEntityNameFilter: (state, action: PayloadAction<string[]>) => {
      state.transactionalLogFilter.entityName = action.payload;
      state.pagination.cursor = "";
      state.cursorpagination.prevCount = 1;
      state.cursorpagination.nextCount = state.cursorpagination.pageSize || 20;
    },
    setSourceFilter: (state, action: PayloadAction<string[]>) => {
      state.transactionalLogFilter.source = action.payload;
      state.pagination.cursor = "";
      state.cursorpagination.prevCount = 1;
      state.cursorpagination.nextCount = state.cursorpagination.pageSize || 20;
    },
    setStatusFilter: (state, action: PayloadAction<string[]>) => {
      state.transactionalLogFilter.transactionStatus = action.payload;
      state.pagination.cursor = "";
      state.cursorpagination.prevCount = 1;
      state.cursorpagination.nextCount = state.cursorpagination.pageSize || 20;
    },
    setConsumerFilter: (state, action: PayloadAction<string[]>) => {
      state.transactionalLogFilter.consumer = action.payload;
      state.pagination.cursor = "";
      state.cursorpagination.prevCount = 1;
      state.cursorpagination.nextCount = state.cursorpagination.pageSize || 20;
    },
    setDateRangeFilter: (state, action: PayloadAction<any>) => {
      // Pass an object with startDateRange and endDateRange
      state.transactionalLogFilter.startDate = action.payload.startDateRange;
      state.transactionalLogFilter.endDate = action.payload.endDateRange;
      state.pagination.cursor = "";
      state.cursorpagination.prevCount = 1;
      state.cursorpagination.nextCount = state.cursorpagination.pageSize || 20;
    },
    setSearchParamFilter: (state, action: PayloadAction<any>) => {
      if (action.payload.searchType === "Transaction ID") {
        state.transactionalLogFilter.id = action.payload.searchFieldValue;
        state.transactionalLogFilter.message = "";
        state.transactionalLogFilter.code = "";
        state.transactionalLogFilter.email = "";
      } else if (action.payload.searchType === "Error Message") {
        state.transactionalLogFilter.id = "";
        state.transactionalLogFilter.message = action.payload.searchFieldValue;
        state.transactionalLogFilter.code = "";
        state.transactionalLogFilter.email = "";
      } else if (action.payload.searchType === "Organization Code") {
        state.transactionalLogFilter.id = "";
        state.transactionalLogFilter.message = "";
        state.transactionalLogFilter.code = action.payload.searchFieldValue;
        state.transactionalLogFilter.email = "";
      } else if (action.payload.searchType === "Email") {
        state.transactionalLogFilter.id = "";
        state.transactionalLogFilter.message = "";
        state.transactionalLogFilter.code = "";
        state.transactionalLogFilter.email = action.payload.searchFieldValue;
      } else {
        state.transactionalLogFilter.id = "";
        state.transactionalLogFilter.message = "";
        state.transactionalLogFilter.code = "";
        state.transactionalLogFilter.email = "";
      }

      state.pagination.cursor = "";
      state.cursorpagination.prevCount = 1;
      state.cursorpagination.nextCount = state.cursorpagination.pageSize || 20;
    },
    setCheckFilter: (state, action: PayloadAction<any[]>) => {
      state.transactionalLogFilter.checkfilter = action.payload;
      state.cursorpagination.prevCount = 1;
      state.cursorpagination.nextCount = state.cursorpagination.pageSize || 20;
    },
    setSortByFilter: (state, action: PayloadAction<string>) => {
      state.pagination.pageOrder = action.payload;
      state.pagination.cursor = "";
      state.cursorpagination.prevCount = 1;
      state.cursorpagination.nextCount = state.cursorpagination.pageSize || 20;
    },
    setClearPagination: (state) => {
      state.pagination = {
        nextCursor: "",
        previousCursor: "",
        pageOrder: "DESC",
        cursor: "",
      };
      state.cursorpagination = {
        prevCount: 1,
        nextCount: 20,
        pageSize: 20,
      };
    },
    setClearFilter: (state) => {
      state.transactionalLogFilter = {
        entityName: [],
        source: [],
        consumer: [],
        transactionStatus: [],
        startDate: "",
        endDate: "",
        transactionId: "",
        id: "",
        message: "",
        code: "",
        email: "",
        checkfilter: [],
      };
      state.pagination = {
        nextCursor: "",
        previousCursor: "",
        pageOrder: "DESC",
        cursor: "",
      };
      state.cursorpagination = {
        prevCount: 1,
        nextCount: 20,
        pageSize: 20,
      };
    },
    setUrlParamsFilter: (state, action: PayloadAction<any>) => {
      state.transactionalLogFilter = {
        entityName: action.payload.entityName,
        source: action.payload.source,
        consumer: action.payload.consumer,
        transactionStatus: action.payload.transactionStatus,
        startDate: action.payload.startDate,
        endDate: action.payload.endDate,
        transactionId: action.payload.transactionId,
        id: action.payload.id,
        message: action.payload.message,
        code: action.payload.code,
        email: action.payload.email,
      };
      state.pagination = {
        pageOrder: action.payload.pageOrder,
      };
      state.cursorpagination = {
        prevCount: action.payload.prevCount || 1,
        nextCount: action.payload.nextCount || 20,
        pageSize: action.payload.pageSize || 20,
      };
    },

    setCursorPrevCount: (state, action: PayloadAction<any>) => {
      state.cursorpagination.prevCount = action.payload;
    },

    setCursorNextCount: (state, action: PayloadAction<any>) => {
      state.cursorpagination.nextCount = action.payload;
    },

    setCursorPageSize: (state, action: PayloadAction<any>) => {
      state.cursorpagination.pageSize = action.payload;
      state.cursorpagination.prevCount = 1;
      state.cursorpagination.nextCount = action.payload;
      state.pagination.cursor = "";
      window.scrollTo(0, 0);
    },

    setCursor: (state, action: PayloadAction<any>) => {
      state.pagination.cursor = action.payload;
      window.scrollTo(0, 0);
    },

    setClearCusor: (state) => {
      state.pagination.cursor = "";
    },
    setTransLogDataLength: (state, action: PayloadAction<any>) => {
      state.cursorpagination.transLogDataLength = action.payload;
    },
    setShowModal: (state, action: PayloadAction<any>) => {
      state.transactionalLogFilter.showModal = action.payload;
    },
  },
});

const { actions, reducer } = transactionalLogSlice;

export const {
  setPagination,
  setEntityNameFilter,
  setSourceFilter,
  setStatusFilter,
  setConsumerFilter,
  setDateRangeFilter,
  setSearchParamFilter,
  setCheckFilter,
  setSortByFilter,
  setClearPagination,
  setClearFilter,
  setUrlParamsFilter,
  setCursorPrevCount,
  setCursorNextCount,
  setCursorPageSize,
  setCursor,
  setClearCusor,
  setTransLogDataLength,
  setShowModal,
} = actions;
export default reducer;
