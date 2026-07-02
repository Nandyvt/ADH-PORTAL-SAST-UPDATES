interface EditCredentialsParam {
  id: string;
  [key: string]: string | undefined;
}

interface ParentCheckboxesProps {
  allPermssions: any;
  tobeDeleted: any;
  setTobeDeleted: any;
  setPermissions: any;
  permissions: any;
  defaultSelectedPermission: any;
}
interface ChildCheckboxesProps {
  service: any;
  data: any;
  tobeDeleted: any;
  setTobeDeleted: any;
  setPermissions: any;
  permissions: any;
  defaultSelectedPermission: any;
  setCheckBoxState: any;
  checkBoxState: any;
}

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

// epxort interfaces

export type {
  EditCredentialsParam,
  ParentCheckboxesProps,
  ChildCheckboxesProps,
};
