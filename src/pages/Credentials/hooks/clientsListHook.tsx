import CONSTANTS from "common/constants";
import { useEffect, useState } from "react";
import { ClientListService } from "services/api/clients.api";
import { fetchPermission } from "services/PermissionManager/Types";

export interface IClient {
  id: number;
  isActive: boolean;
  name: string;
  code: string;
}
export interface IClients extends Array<IClient> {}

export default function useClientsList(pageNumber: number) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [clients, setClients] = useState<IClients>([]);
  useEffect(() => {
    if (fetchPermission()("account.clients.get", "")) {
      setLoading(true);
      ClientListService({
        pageSize: CONSTANTS.MAX_RECORDS,
        pageNumber: 1,
      })
        .then((res) => {
          setLoading(false);
          setClients(res.data.clients);
        })
        .catch((err) => {
          setLoading(false);
          setError(true);
        });
    }
  }, [pageNumber]);
  return { loading, clients, error };
}
