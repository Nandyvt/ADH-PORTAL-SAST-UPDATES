import React from "react";
import { useSelector } from "react-redux";
import PermissionContext from "./PermissionContext";

type Props = {
  fetchPermission: (p: string, rolePermissionId: string) => any;
  children: React.ReactNode; // Added children prop
};

type PermissionCache = {
  [key: string]: boolean;
};

// This provider is intended to be surrounding the whole application.
// It should receive the users permissions as parameter
const PermissionProvider: React.FunctionComponent<Props> = ({
  fetchPermission,
  children,
}) => {
  const cache: PermissionCache = {};

  const stateObject = useSelector((state: any) => {
    let roleName;
    if (state.user.user) {
      roleName = state.user.user.roleName;
    }
    return { roleName, loggedInUserObjectContext: state.user.user };
  });

  const { roleName, loggedInUserObjectContext } = stateObject;

  // Creates a method that returns whether the requested permission is available in the list of permissions
  // passed as parameter
  const isAllowedTo = async (permission: string): Promise<boolean> => {
    if (Object.keys(cache).includes(permission)) {
      return cache[permission];
    }
    const isAllowed = await fetchPermission(permission, roleName);
    cache[permission] = isAllowed;
    return isAllowed;
  };

  // This component will render its children wrapped around a PermissionContext's provider whose
  // value is set to the method defined above
  const valueMemoContext = React.useMemo(
    () => ({
      isAllowedTo,
      loggedInUserObjectContext,
    }),
    [isAllowedTo, loggedInUserObjectContext]
  );
  return (
    <PermissionContext.Provider value={valueMemoContext}>
      {children}
    </PermissionContext.Provider>
  );
};

export default PermissionProvider;
