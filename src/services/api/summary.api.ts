import CONSTANTS from "common/constants";
import axiosObject from "./ApiServices";

export const SummaryService = async (): Promise<any> => {
  return axiosObject.get(
    `${CONSTANTS.API_SERVICE_ENDPOINT.ACCOUNT_V1}/dashboardSummary`
  );
};

export const clientLeaderBoardSummary = async (count: number): Promise<any> => {
  return axiosObject.get(
    `${CONSTANTS.API_SERVICE_ENDPOINT.ACCOUNT_V1}/clientLeaderboard`,
    {
      params: {
        count,
      },
    }
  );
};
