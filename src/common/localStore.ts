import CONSTANTS from "./constants";

const LocalStore = {
  set: async (key: string, data: any) => {
    let currentState = JSON.parse(
      localStorage.getItem(CONSTANTS.LOCAL_STORE_KEY || "{}") || "{}"
    );
    currentState = { ...currentState, [key]: data };
    localStorage.setItem(
      CONSTANTS.LOCAL_STORE_KEY,
      JSON.stringify(currentState)
    );
  },
  get: async (key: string) => {
    const currentState = JSON.parse(
      localStorage.getItem(CONSTANTS.LOCAL_STORE_KEY || "{}") || "{}"
    );
    const response = {
      success: false,
      data: {},
    };
    const stateHasProperty = Object.prototype.hasOwnProperty.call(
      currentState,
      key
    );
    if (stateHasProperty) {
      response.success = true;
      response.data = currentState[key];
      return response;
    }
    return response;
  },
};

export default LocalStore;
