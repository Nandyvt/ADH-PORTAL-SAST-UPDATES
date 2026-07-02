/* eslint-disable no-restricted-syntax */
export const radioButtons = [
  {
    label: "API",
    id: "API",
    value: "API",
  },
  {
    label: "NATS",
    id: "NATS",
    value: "NATS",
  },
];

export function formatClientsData(data: any) {
  return data.map((item: any) => {
    return {
      label: item.name,
      value: item.id,
    };
  });
}

export const defaultCredential = {
  name: "",
  permissions: {},
  clientId: 0,
  channel: "",
};

function arraysMatch(arr1: any, arr2: any) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i += 1) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}
export function objectsMatch(permission: any, checkboxState: any) {
  const keys1 = Object.keys(permission);
  const keys2 = Object.keys(checkboxState);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (
      !keys2.includes(key) ||
      !arraysMatch(permission[key], checkboxState[key])
    ) {
      return false;
    }
  }

  return true;
}
function mergeServiceEndpoints(
  servicePermission: any,
  serviceCheckboxState: any
) {
  for (const endpoint in servicePermission) {
    if (Object.prototype.hasOwnProperty.call(servicePermission, endpoint)) {
      const uniqueEndpoints = new Set([
        ...(serviceCheckboxState[endpoint] || []),
        ...servicePermission[endpoint],
      ]);
      serviceCheckboxState[endpoint] = Array.from(uniqueEndpoints);
    }
  }
}

function mergeServicePermissions(permission: any, checkboxState: any) {
  for (const service in permission) {
    if (Object.prototype.hasOwnProperty.call(permission, service)) {
      if (service in checkboxState) {
        mergeServiceEndpoints(permission[service], checkboxState[service]);
      } else {
        checkboxState[service] = { ...permission[service] };
      }
    }
  }
}

function removeServiceEndpoints(
  serviceToDelete: any,
  serviceCheckboxState: any
) {
  for (const endpoint in serviceToDelete) {
    if (Array.isArray(serviceToDelete[endpoint])) {
      serviceToDelete[endpoint].forEach((item: any) => {
        serviceCheckboxState[endpoint] = serviceCheckboxState[endpoint].filter(
          (i: any) => i !== item
        );
      });

      if (serviceCheckboxState[endpoint].length === 0) {
        delete serviceCheckboxState[endpoint];
      }
    }
  }
}

function removeDeletedEndpoints(tobeDeletedObject: any, checkboxState: any) {
  for (const service in tobeDeletedObject) {
    if (Object.prototype.hasOwnProperty.call(tobeDeletedObject, service)) {
      if (service in checkboxState) {
        removeServiceEndpoints(
          tobeDeletedObject[service],
          checkboxState[service]
        );
      }
    }
  }
}

function cleanEmptyServices(tobeDeletedObject: any, checkboxState: any) {
  for (const key in tobeDeletedObject) {
    if (Object.values(tobeDeletedObject[key]).length === 0) {
      delete checkboxState[key];
    }
  }
}

export function mergeObjects(
  permission: any,
  checkboxState: any,
  tobeDeletedObject: any
) {
  mergeServicePermissions(permission, checkboxState);

  if (Object.keys(tobeDeletedObject).length > 0) {
    removeDeletedEndpoints(tobeDeletedObject, checkboxState);
    cleanEmptyServices(tobeDeletedObject, checkboxState);
  }

  return checkboxState;
}

export function removeEmpty(obj: any) {
  Object.keys(obj).forEach((key) => {
    if (Object.values(obj[key]).length === 0) delete obj[key];
  });
  return obj;
}
