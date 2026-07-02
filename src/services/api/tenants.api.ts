import CONSTANTS from "common/constants";
import axiosAccount from "./ApiServices";

export const TenantListService = async ({
  pageSize,
  pageNumber,
  isActive,
}: any): Promise<any> => {
  return axiosAccount.get(
    `${CONSTANTS.API_SERVICE_ENDPOINT.ACCOUNT_V1}/tenants`,
    {
      params: {
        pageSize,
        pageNumber,
        isActive,
      },
    }
  );
};
