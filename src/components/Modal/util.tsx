const updateModalContent = (action: string, user: string) => {
  return `Are you sure you want to ${action.toLocaleLowerCase()} ${user}?`;
};
const getStatusAction = (status: string) => {
  switch (status?.toLocaleLowerCase()) {
    case "active":
      return "Deactivate";
    case "inactive":
      return "Activate";
    case "edit":
      return "Edit";
    case "pending":
      return "Re Invite";
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
