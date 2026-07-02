import CONSTANTS from "common/constants";
import { getXYPosRelativeToParent, getXYPosition } from "common/utils";

// Interface and Props definitions
interface TableColumnsInterface {
  name: string;
  propertyName: string;
  isDate: boolean;
  class: string;
}

interface CustomisedTableProps {
  columnFields: TableColumnsInterface[];
  tableData: any[];
  loader?: boolean;
  onActionEvent: (data: any) => void;
}
// Helper function to generate color code for roles
const getColorCode = (roleInfo: {
  userRoleStatus: string;
  roleId: number;
}): string => {
  const roleColorMapping: Record<number, string> = {
    1: "roleColorCodeSA",
    4: "roleColorCodeCPU",
    5: "roleColorCodeEU",
    6: "roleColorCodeSA",
  };

  const { userRoleStatus, roleId } = roleInfo;
  const statusColorClass =
    userRoleStatus === "INACTIVE" ? "roleColorCodeINACTIVE" : "";

  const roleColorClass = roleColorMapping[roleId] || "";

  return `${roleColorClass} ${statusColorClass}`.trim();
};
// Helper function to get row class based on status
const getRowClass = (status: string) => {
  const statusClassMap = {
    [CONSTANTS.ROLE_STATUS.ACTIVE]: "aui-tr-success",
    [CONSTANTS.ROLE_STATUS.INACTIVE]: "aui-tr-deactivated",
    [CONSTANTS.ROLE_STATUS.PENDING]: "aui-tr-pending",
  };
  return statusClassMap[status] || "aui-tr-success";
};
// Function to check if the URL contains the tab=consumers-listing parameter
function isConsumersListingTab() {
  // Get the current URL search parameters
  const searchParams = new URLSearchParams(window.location.search);

  // Check if the 'tab' parameter is set to 'consumers-listing'
  return searchParams.get("tab") === "consumers-listing";
}

const nextSiblingPopoverStyles = (event: any, x: any, y: any) => {
  const offset = isConsumersListingTab() ? 5 : -10;
  const { nextSibling } = event.currentTarget;

  nextSibling.style.left = `${x + offset}px`;
  nextSibling.style.top = `${y + offset}px`;
};

// Helper function to toggle role popover
const setPopoverPosition = (
  element: any,
  position: { left?: string; right?: string; top: string }
) => {
  if (position.left !== undefined) element.style.left = position.left;
  if (position.right !== undefined) element.style.right = position.right;
  element.style.top = position.top;
};

const adjustPopoverForSmallScreens = (event: any, x: number, y: number) => {
  if (x > 200) {
    setPopoverPosition(event.currentTarget.nextSibling, {
      left: `${x - 173}px`,
      top: `${y - 10}px`,
    });
  } else if (x < 200 && x > 190) {
    setPopoverPosition(event.currentTarget.nextSibling, {
      left: "1.5rem",
      top: `${y - 10}px`,
    });
  } else {
    setPopoverPosition(event.currentTarget.nextSibling, {
      left: "1rem",
      top: `${y - 10}px`,
    });
  }
};

const adjustPopoverForMediumScreens = (event: any, x: number, y: number) => {
  if (x >= 389 && x < 400) {
    setPopoverPosition(event.currentTarget.nextSibling, {
      right: `${x - 250}px`,
      top: `${y - 10}px`,
    });
  } else if (x < 389 && x > 370) {
    setPopoverPosition(event.currentTarget.nextSibling, {
      right: `${x - 230}px`,
      top: `${y - 10}px`,
    });
  } else {
    setPopoverPosition(event.currentTarget.nextSibling, {
      right: `${x - 320}px`,
      top: `${y - 10}px`,
    });
  }
};

const toggleRolePopover = (event: any) => {
  const { x, y } =
    window.outerWidth > 991
      ? getXYPosRelativeToParent(
          event.currentTarget,
          event.currentTarget.parentNode.parentNode
        )
      : getXYPosition(event.currentTarget);

  if (window.outerWidth > 319 && window.outerWidth < 376) {
    adjustPopoverForSmallScreens(event, x, y);
  } else if (window.outerWidth > 375 && window.outerWidth < 576) {
    nextSiblingPopoverStyles(event, x, y);
  } else if (window.outerWidth > 575 && window.outerWidth < 768) {
    adjustPopoverForMediumScreens(event, x, y);
  } else if (window.outerWidth > 767 && window.outerWidth < 992) {
    setPopoverPosition(event.currentTarget.nextSibling, {
      left: x >= 550 ? `${x - 200}px` : `${x - 20}px`,
      top: `${y - 10}px`,
    });
  } else if (window.outerWidth > 991 && window.outerWidth < 1600) {
    nextSiblingPopoverStyles(event, x, y);
  }

  event.currentTarget.classList?.toggle("popover-open");
  event.currentTarget.nextSibling.classList?.toggle("d-none");
};

function getBandColor(status: string) {
  const colorBandMap = {
    [CONSTANTS.ROLE_STATUS.ACTIVE]: "active-band",
    [CONSTANTS.ROLE_STATUS.INACTIVE]: "inactive-band",
    [CONSTANTS.ROLE_STATUS.PENDING]: "pending-band",
  };
  return colorBandMap[status] || "active-band";
}

export { getColorCode, getRowClass, toggleRolePopover, getBandColor };
export type { CustomisedTableProps, TableColumnsInterface };
