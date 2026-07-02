import { useEffect, useState } from "react";
import { getUsers } from "services/api/user.api";

export interface IUser {
  id: number;
  roles: Array<IRole>;
}
export interface IRole {
  roleId: number;
  clientId: number;
  roleName: string;
  clientName: string;
  userRoleStatus: string;
}
export interface IUsers extends Array<IUser> {}

export function useUsersList(query: any) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [users, setUsers] = useState<any>([]);
  useEffect(() => {
    setLoading(true);
    getUsers({
      paramsData: {
        q: query,
      },
    })
      .then((res) => {
        setLoading(false);
        setUsers(res.data.users);
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
      });
  }, [query]);
  return { loading, users, error };
}
