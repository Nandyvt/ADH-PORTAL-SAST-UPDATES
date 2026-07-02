import CONSTANTS from "common/constants";
import axiosObject from "./ApiServices";

export const getTransactionStatusService = async (
  days: number
): Promise<any> => {
  return axiosObject.get(
    `${CONSTANTS.API_SERVICE_ENDPOINT.HUB_V1}/transactionStatusSummary`,
    {
      params: {
        days,
      },
    }
  );
};
