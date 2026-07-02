export const fetchPermission =
  () =>
  (permission: string, roleSelectorId: string): any => {
    const apiPermissionObj = JSON.parse(
      localStorage.getItem("apiPermission") ?? "{}"
    );

    let permissionFlag = true;
    const [service, resourceAccess, apiAccess] = permission?.split(".") ?? [];

    if (typeof apiPermissionObj[service] !== "undefined") {
      if (typeof apiPermissionObj[service][resourceAccess] === "undefined") {
        permissionFlag = false;
      } else {
        permissionFlag =
          apiPermissionObj[service][resourceAccess].includes(apiAccess);
      }
    }
    return permissionFlag;
  };
