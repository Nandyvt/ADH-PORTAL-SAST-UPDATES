import CONSTANTS from "common/constants";

import axiosAccount from "./ApiServices";

export const fetchEntities = async (paramsData: any): Promise<any> => {
  return axiosAccount.get(
    `${CONSTANTS.API_SERVICE_ENDPOINT.HUB_V1}/entitydefinitions`,
    {
      params: {
        ...paramsData,
      },
    }
  );
};
