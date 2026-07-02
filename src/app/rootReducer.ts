import { combineReducers } from "@reduxjs/toolkit";
import loaderReducer from "components/Loader/loader.slice";
import headerReducer from "components/Header/header.slice";
import toastReducer from "components/Toast/toast.slice";
import authReducer from "app/hooks/auth/auth.slice";
import userReducer from "app/user.slice";
import selectedUserReducer from "pages/Users/UserList.slice";
import transactionalLogReducer from "pages/TransactionalLogs/Component/common/TransactionalLogs.slice";
import natsConsumerListReducer from "pages/Configuration/common/Consumers.slice";
import natsCredentialListSlice from "pages/Configuration/common/Credentials.slice";
import natsStreamListSlice from "pages/Configuration/common/StreamList.slice";
import natsStreamDetailsSlice from "pages/Configuration/common/StreamDetails.slice";
import entity from "pages/Configuration/common/Entities.slice";
import { logger } from "common/utils/logger.utils";
import configurationReducer from "pages/Configuration/configuration.slice";

const appReducer = combineReducers({
  loader: loaderReducer,
  toast: toastReducer,
  authed: authReducer,
  header: headerReducer,
  user: userReducer,
  selectedUser: selectedUserReducer,
  transactionalLog: transactionalLogReducer,
  configuration: configurationReducer,
  consumerList: natsConsumerListReducer,
  credentialList: natsCredentialListSlice,
  streamList: natsStreamListSlice,
  streamDetails: natsStreamDetailsSlice,
  entity: entity.entityListSlice,
});

export type RootState = ReturnType<typeof appReducer>;

const rootReducer = (state: any, action: any) => {
  if (action.type === "LOGGED_OUT") {
    logger("logged out state");
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
