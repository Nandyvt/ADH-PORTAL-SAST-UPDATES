import { useState, useEffect } from "react";
import { CreateNatsStream, ListNatsStreams } from "services/api/nats.api";
import store from "app/store";
import { getErrorMessage } from "common/utils";
import { showToast } from "components/Toast/toast.slice";
import {
  IStreamCreateRequest,
  IStreamListRequest,
  IStreamListResponse,
} from "pages/Configuration/models";

export const useStreams = (filter: IStreamListRequest, refreshList: any) => {
  const [streams, setStreams] = useState<IStreamListResponse["streams"]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>("");

  useEffect(() => {
    const fetchData = async () => {
      await ListNatsStreams(filter)
        .then((res) => {
          setStreams(res?.data?.streams);
          setLoading(false);
          setError(false);
        })
        .catch((apierror) => {
          setError(getErrorMessage(apierror));
          store.dispatch(
            showToast({
              type: "danger",
              title: "Error Occurred",
              message: getErrorMessage(apierror),
            })
          );
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchData();
  }, [filter.pageNumber, filter.pageSize, refreshList]);

  return { streams, loading, error };
};

export const createStream = async (payload: any, clientCode: string) => {
  const streamData: IStreamCreateRequest = {
    clientCode,
    description:
      payload?.textAreaFilters === undefined
        ? ""
        : payload?.textAreaFilters[0]?.data[0],
    name: payload?.inputFilters[0]?.data[0],
  };

  await CreateNatsStream(streamData)
    .then(() => {
      store.dispatch(
        showToast({
          type: "success",
          title: "Success",
          message: "Stream created successfully",
        })
      );
    })
    .catch((apierror: any) => {
      store.dispatch(
        showToast({
          type: "danger",
          title: "Error Occurred",
          message: getErrorMessage(apierror),
        })
      );
    });
};
