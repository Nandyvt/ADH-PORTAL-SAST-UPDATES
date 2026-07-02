import { useEffect, useState } from "react";
import debounce from "lodash/debounce";
import { CredentialsListService } from "services/api/credentials.api";

export interface ICred {
  id: number;
  isActive: boolean;
  code: string;
  name: string;
  status: string;
  secret: string;
  channel: string;
  tenantName: string;
  clientName: string;
}
export interface ICreds extends Array<ICred> {}

export default function useCredentialsList(
  pageNumber: number,
  channelName: string,
  clientId: string,
  status: string,
  toggleStatus?: boolean
) {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState(false);
  const [credentials, setCredentials] = useState<ICreds>([]);

  const debouncedApiCall = debounce(async () => {
    setLoading(true);
    CredentialsListService({
      pageSize: 20,
      pageNumber,
      channel: channelName,
      clientId,
      status,
    })
      .then((res) => {
        setLoading(false);
        if (pageNumber === 1) {
          setCredentials(res.data.credentials);
        } else {
          setCredentials((prevCreds) => [
            ...prevCreds,
            ...res.data.credentials,
          ]);
        }
        setHasMore(Boolean(!res._pagination.isLast));
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
      });
  }, 100);

  useEffect(() => {
    debouncedApiCall();
    // Clean up debounce on component unmount
    return () => {
      debouncedApiCall.cancel(); // Cancel any pending debounced calls
    };
  }, [pageNumber, channelName, clientId, status, toggleStatus]);
  return { loading, credentials, error, hasMore };
}
