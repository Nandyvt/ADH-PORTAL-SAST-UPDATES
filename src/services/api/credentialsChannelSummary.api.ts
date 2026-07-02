import CONSTANTS from "common/constants";
import axiosAccount from "./ApiServices";

export const CredentialsChannelSummaryService = async (
  days: number
): Promise<any> => {
  return axiosAccount.get(
    `${CONSTANTS.API_SERVICE_ENDPOINT.ACCOUNT_V1}/credentialsChannelSummary`,
    {
      params: {
        days,
      },
    }
  );
};
