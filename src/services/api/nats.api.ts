import CONSTANTS from "common/constants";
import {
  IConsumerCreateRequestAPI,
  IEntityCreateRequestAPI,
  IPagination,
  IStreamCreateRequestAPI,
  IStreamListRequest,
} from "pages/Configuration/models";
import axiosAccount from "./ApiServices";

export const ListNatsStreams = async (
  paramsData: IStreamListRequest
): Promise<any> => {
  return axiosAccount.get(
    `${CONSTANTS.API_SERVICE_ENDPOINT.HUB_V1}/natsstreams`,
    {
      params: {
        ...paramsData,
      },
    }
  );
};
export const CreateNatsStream = async (
  streamCreatePayload: IStreamCreateRequestAPI
): Promise<any> => {
  return axiosAccount.post(
    `${CONSTANTS.API_SERVICE_ENDPOINT.HUB_V1}/natsstreams`,
    streamCreatePayload
  );
};

export const GetStreamDetailsByID = async (id: number): Promise<any> => {
  return axiosAccount.get(
    `${CONSTANTS.API_SERVICE_ENDPOINT.HUB_V1}/natsstreams/${id}`,
    {}
  );
};

export const ListNatsConsumers = async (
  paramsData: IPagination
): Promise<any> => {
  return axiosAccount.get(
    `${CONSTANTS.API_SERVICE_ENDPOINT.HUB_V1}/natsconsumers`,
    {
      params: {
        ...paramsData,
      },
    }
  );
};

export const CreateNatsConsumer = async (
  consumerCreatePayload: IConsumerCreateRequestAPI
): Promise<any> => {
  return axiosAccount.post(
    `${CONSTANTS.API_SERVICE_ENDPOINT.HUB_V1}/natsconsumers`,
    consumerCreatePayload
  );
};

export const ListSourceEntities = async (
  paramsData: IPagination
): Promise<any> => {
  return axiosAccount.get(
    `${CONSTANTS.API_SERVICE_ENDPOINT.HUB_V1}/sourceentitymappings`,
    {
      params: {
        ...paramsData,
      },
    }
  );
};

export const GetConsumerDetailsByID = async (id: number): Promise<any> => {
  return axiosAccount.get(
    `${CONSTANTS.API_SERVICE_ENDPOINT.HUB_V1}/natsconsumers/${id}`,
    {}
  );
};

export const GetEntityDetailsByID = async (id: number): Promise<any> => {
  return axiosAccount.get(
    `${CONSTANTS.API_SERVICE_ENDPOINT.HUB_V1}/entitydefinitions/${id}`,
    {}
  );
};

export const CreateNatsEntity = async (
  entityCreatePayload: IEntityCreateRequestAPI
): Promise<any> => {
  return axiosAccount.post(
    `${CONSTANTS.API_SERVICE_ENDPOINT.HUB_V1}/entitydefinitions`,
    entityCreatePayload
  );
};
