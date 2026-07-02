import { useContext, useState, useEffect } from "react";
import PermissionContext from "./PermissionContext";

const usePermission = (permission: string) => {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState<boolean>(false);
  const { isAllowedTo } = useContext(PermissionContext);

  // Use an effect so we only call isAllowedTo once per permission change
  useEffect(() => {
    let isMounted = true; // Safety flag in case component unmounts quickly
    setLoading(true);

    isAllowedTo(permission).then((allowedPermission) => {
      if (isMounted) {
        setAllowed(allowedPermission);
        setLoading(false);
      }
    });

    return () => {
      // Cleanup to avoid setting state on unmounted component
      isMounted = false;
    };
  }, [permission, isAllowedTo]);

  return [loading, allowed] as const;
};

export default usePermission;
