import CONSTANTS from "common/constants";

const updateModalContent = (action: string, notification: string) => {
  return `Are you sure you want to ${action.toLocaleLowerCase()} the configured ${notification}?`;
};
const getStatusAction = (status: string) => {
  switch (status.toLocaleLowerCase()) {
    case "edit":
      return "Edit";
    default:
      return "Delete";
  }
};

const getMessage = (action: string) => {
  let msg;
  action = action.toLocaleLowerCase();
  if (action === "delete") {
    msg = `You won’t be able to revert this`;
  } else {
    msg = ``;
  }
  return msg;
};
export { updateModalContent, getStatusAction, getMessage };

export const notificationTypebasedOnId = (type: any) => {
  if (CONSTANTS.NOTIFICATION_TYPE_ID.EMAIL === type) return "Email";
  if (CONSTANTS.NOTIFICATION_TYPE_ID.SMS === type) return "SMS";
  if (CONSTANTS.NOTIFICATION_TYPE_ID.HTTP === type) return "HTTP";
  return "";
};
