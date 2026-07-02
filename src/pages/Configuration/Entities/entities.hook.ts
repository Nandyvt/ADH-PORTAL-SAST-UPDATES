import { useState, useEffect } from "react";
import { fetchEntities } from "services/api/entities.api";
import store from "app/store";
import { getErrorMessage } from "common/utils";
import { showToast } from "components/Toast/toast.slice";
import { IEntitiesListResponse, IPagination } from "../models";

export const useEntities = ({ pageNumber, pageSize = 20 }: IPagination) => {
  const [entitiesApiResponse, setEntitiesApiResponse] =
    useState<IEntitiesListResponse>({
      data: {
        entities: [],
      },
      _pagination: null,
      requestId: "",
      status: 0,
    });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetchEntities({ pageNumber, pageSize });

        setEntitiesApiResponse(response);
        setLoading(false);
        setError(false);
      } catch (apiErr: any) {
        setLoading(false);
        setError(getErrorMessage(apiErr));
        store.dispatch(
          showToast({
            title: "Error Occurred.",
            message: getErrorMessage(apiErr),
          })
        );
      }
    };

    fetchData();
  }, [pageNumber, pageSize]);

  return { entitiesApiResponse, loading, error };
};
