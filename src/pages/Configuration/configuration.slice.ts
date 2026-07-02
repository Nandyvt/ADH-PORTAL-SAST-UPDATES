import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IStream } from "./models";

interface IConfigurationState {
  selectedStream: IStream;
  showCreateStreamModal: boolean;
}

const initialState: IConfigurationState = {
  selectedStream: {
    Name: "",
    Description: "",
    ID: 0,
    created_at: "",
    updated_at: "",
    ConsumerId: 0,
    Subject: "",
    stream_config: {
      name: "",
      description: "",
      subjects: [],
      retention: "",
      max_consumers: 0,
      max_msgs: 0,
      max_bytes: 0,
      discard: "",
      max_age: 0,
      max_msgs_per_subject: 0,
      storage: "",
      num_replicas: 0,
      duplicate_window: 0,
      allow_direct: false,
      mirror_direct: false,
    },
  },
  showCreateStreamModal: false,
};

const configurationSlice = createSlice({
  name: "configuration",
  initialState,
  reducers: {
    setSelectedStream: (state, action: PayloadAction<IStream>) => {
      state.selectedStream = action.payload;
    },
    setShowCreateStreamModal: (state, action: PayloadAction<boolean>) => {
      state.showCreateStreamModal = action.payload;
    },
  },
});

const { actions, reducer } = configurationSlice;

export const { setSelectedStream, setShowCreateStreamModal } = actions;
export default reducer;
