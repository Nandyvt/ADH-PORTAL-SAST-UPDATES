import React from "react";

type PermissionContextType = {
  isAllowedTo: (permission: string) => Promise<boolean>;
  loggedInUserObjectContext: any;
};

// Default behaviour for the Permission Provider Context
// i.e. if for whatever reason the consumer is used outside of a provider
// The permission will not be granted if no provider says otherwise
const defaultBehaviour: PermissionContextType = {
  isAllowedTo: () => Promise.resolve(false),
  loggedInUserObjectContext: {},
};

// Create the context
const PermissionContext =
  React.createContext<PermissionContextType>(defaultBehaviour);

export default PermissionContext;
