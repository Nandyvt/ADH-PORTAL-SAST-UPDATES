import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Slice for stream details
const natsStreamDetailsSlice = createSlice({
  name: "natsStreamDetails",
  initialState: { streamsDetailsData: null },
  reducers: {
    setStreamDetailsData: (state, action: PayloadAction<any>) => {
      state.streamsDetailsData = action.payload;
    },

    clearStreamDetailsData: (state) => {
      state.streamsDetailsData = null;
    },
  },
});

const { actions, reducer } = natsStreamDetailsSlice;
export const { setStreamDetailsData, clearStreamDetailsData } = actions;

export default reducer;
