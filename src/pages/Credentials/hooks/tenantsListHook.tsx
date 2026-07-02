import { useEffect, useState } from "react";
import { TenantListService } from "services/api/tenants.api";
import { fetchPermission } from "services/PermissionManager/Types";

export interface ITenant {
  id: number;
  isActive: boolean;
  name: string;
  code: string;
}
export interface ITenants extends Array<ITenant> {}

export default function useTenantsList(pageNumber: number) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [tenants, setTenants] = useState<ITenants>([]);
  useEffect(() => {
    // only who have access to this page can see the list of tenants
    if (fetchPermission()("account.tenants.get", "")) {
      setLoading(true);
      TenantListService({
        pageSize: 100,
        pageNumber: 1,
      })
        .then((res) => {
          setLoading(false);
          setTenants(res.data.tenants);
        })
        .catch((err) => {
          setLoading(false);
          setError(true);
        });
    }
  }, [pageNumber]);
  return { loading, tenants, error };
}
