import CONSTANTS from "common/constants";

interface IUserInviteState {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  roleCode: string;
  clientId: string;
}
interface InviteUserModalProps {
  toggleModal: boolean;
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
  imageLoading: boolean;
  setImageLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setRefreshWithPageNumber: React.Dispatch<React.SetStateAction<boolean>>;
  stateObject: any; // Replace with the actual type
  onSuccessfulInvite: (data: any) => void;
  refreshWithPageNumber: boolean;
}

const checkBtnDisableForClientAdminUser = (
  roleCode: any,
  loggedInUserObjectContext: any,
  showClientDropDown: boolean,
  defaultClientId: any
) => {
  if (
    loggedInUserObjectContext?.roleCode === CONSTANTS.USER_ROLES.CLIENT_USER ||
    loggedInUserObjectContext?.roleCode === CONSTANTS.USER_ROLES.CLIENT_ADMIN
  ) {
    return true;
  }

  if (["CLIENT_USER", "CLIENT_ADMIN"].includes(roleCode)) {
    if (showClientDropDown) {
      return defaultClientId?.trim().length > 0;
    }
    return false;
  }
  return true;
};

const checkCommonConditions = (
  inviteUserFormData: any,
  autoSuggestValue: any,
  isError: boolean,
  loggedInUserObjectContext: any,
  showClientDropDown: boolean,
  defaultClientId: any
) => {
  const { firstName, lastName, roleCode } = inviteUserFormData;

  const commonCheck =
    firstName &&
    lastName &&
    autoSuggestValue &&
    roleCode &&
    !isError &&
    checkBtnDisableForClientAdminUser(
      roleCode,
      loggedInUserObjectContext,
      showClientDropDown,
      defaultClientId
    );
  return commonCheck;
};

const clientArr = ["CLIENT_USER", "CLIENT_ADMIN"];
export type { IUserInviteState, InviteUserModalProps };
export { clientArr, checkCommonConditions };
