interface UserListProps {
  id: number;
  email: string;
  firstName: string;
  isActive: boolean;
  lastName: string;
  name: string;
  roles: Array<IRoles>;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface IRoles {
  clientId: number;
  clientName: string;
  roleId: number;
  roleName: string;
  userRoleStatus: string;
  status: string;
  updatedAt: string;
}

interface IPagination {
  pageNumber: number;
  pageOffset: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  isFirst: number;
  isLast: number;
}

const updateModalContent = (action: string, users: string) => {
  return `Are you sure you want to ${action.toLocaleLowerCase()} ${users}?`;
};
const getStatusAction = (status: string): string => {
  const statusActionMap: Record<string, string> = {
    active: "Deactivate",
    inactive: "Activate",
    edit: "Edit",
    pending: "Re Invite",
  };

  return statusActionMap[status.toLowerCase()] || "Delete";
};

const getMessage = (action: string): string => {
  action = action.toLowerCase();

  if (action === "delete") {
    return "You won’t be able to revert this";
  }

  return "";
};

const formatDataForMultiSelectFilter = (arr: any) =>
  arr?.map((item: any) => {
    return {
      label: item.name,
      value: item.code,
    };
  });
// Helper function to rotate meatballs icon
const rotateMeatBalls = (e: any) => {
  Array.from(document.querySelectorAll(".btnEllipses")).forEach((el) => {
    if (e.currentTarget === el) {
      if (el.classList.contains("rotate-90")) {
        el.classList.remove("rotate-90");
        el.classList.toggle("rotate-90-anti");
      } else if (el.classList.contains("rotate-90-anti")) {
        el.classList.remove("rotate-90-anti");
        el.classList.toggle("rotate-90");
      } else {
        el.classList.toggle("rotate-90");
      }
    } else {
      el.classList.remove("rotate-90");
    }
  });
};

export const usersTableColumns = [
  {
    name: "Name",
    propertyName: "name",
    isDate: false,
    class: "name-col",
    type: "link",
  },
  {
    name: "Email ID",
    propertyName: "email",
    isDate: false,
    class: "email-col",
    type: "text",
  },
  {
    name: "Role",
    propertyName: "roles",
    isDate: false,
    class: "role-col",
    type: "array",
  },
  {
    name: "Status",
    propertyName: "status",
    isDate: false,
    class: "status-col",
    type: "text",
  },
];

const dropDownToggler = (e: any) => {
  e.currentTarget.nextSibling.classList.toggle("rotate");
};
const dropDownDefaultState = (e: any) => {
  if (e.currentTarget.nextSibling.classList.contains("rotate") === true) {
    e.currentTarget.nextSibling.classList.remove("rotate");
  }
};
const isClientAdmin = (role: string) => role === "Client Admin";

const getActionModalTitleMessage = (action: string) => {
  action = action.toLowerCase();

  const messages: Record<string, string> = {
    activate: `Activating user will associate following roles`,
    deactivate: `Deactivating user will disassociate following roles`,
    delete: `Deleting user will disassociate following roles.\nYou won’t be able to revert this`,
  };

  return messages[action] || "";
};

export {
  updateModalContent,
  getStatusAction,
  getMessage,
  formatDataForMultiSelectFilter,
  dropDownToggler,
  dropDownDefaultState,
  isClientAdmin,
  rotateMeatBalls,
  getActionModalTitleMessage,
};

export type { IPagination, UserListProps };
