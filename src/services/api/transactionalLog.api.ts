import CONSTANTS from "common/constants";
import axiosAccount from "./ApiServices";

export const TransactionalLogList = async (paramsData: any): Promise<any> => {
  return axiosAccount?.get(
    `${CONSTANTS.API_SERVICE_ENDPOINT.HUB_V1}/transactionLogs`,
    {
      params: {
        ...paramsData,
      },
    }
  );
};

export const TransactionalLogSummary = async (
  paramsData: any
): Promise<any> => {
  return axiosAccount.get(
    `${CONSTANTS.API_SERVICE_ENDPOINT.HUB_V1}/transactionLogChannelSummary`,
    {
      params: {
        days: paramsData,
      },
    }
  );
};

export const TransactionalLogDetails = async (
  paramsData: any
): Promise<any> => {
  return axiosAccount.get(
    `${CONSTANTS.API_SERVICE_ENDPOINT.HUB_V1}/transactionLogs/${paramsData}`
  );
};

export const TransactionalLogFilter = async (
  paramsData: string
): Promise<any> => {
  return axiosAccount.get(
    `${CONSTANTS.API_SERVICE_ENDPOINT.HUB_V1}/transactionLogs/filters`,
    {
      params: {
        columnData: paramsData,
      },
    }
  );
};

export interface ICreateTransactionLog {
  transactionId?: string;
  entityName?: string;
  source?: string;
  status: string;
  consumer?: string;
  eventType?: string;
  channel?: string;
  clientId?: string;
  errorCode?: string;
  organizationCode?: string;
  email?: string;
}

export const CreateTransactionLog = async (
  transactionData: ICreateTransactionLog
): Promise<any> => {
  return axiosAccount.post(
    `${CONSTANTS.API_SERVICE_ENDPOINT.HUB_V1}/transactionLogs`,
    transactionData
  );
};
