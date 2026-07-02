import CONSTANTS from "common/constants";
import axiosAccount from "./ApiServices";

const ClientsGraph = async (paramsData: any): Promise<any> => {
  return axiosAccount.get(
    `${CONSTANTS.API_SERVICE_ENDPOINT.ACCOUNT_V1}/clientRolesSummary`,
    {
      params: {
        ...paramsData,
      },
    }
  );
};
export default ClientsGraph;

export const clientRolesSummary = async (
  pageNumber: number,
  pageSize: number
): Promise<any> => {
  return axiosAccount.get(
    `${CONSTANTS.API_SERVICE_ENDPOINT.ACCOUNT_V1}/clientRolesSummary`,
    {
      params: {
        pageNumber,
        pageSize,
      },
    }
  );
};
