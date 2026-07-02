const actions: Record<string, string> = {
  activate: "activate",
  deactivate: "deactivate",
  delete: "delete",
};

const updateModalContent = (action: string, credentials: string): string => {
  const lowerCaseAction = action.toLowerCase();
  const formattedAction = actions[lowerCaseAction] || "perform";
  return `Are you sure you want to ${formattedAction} ${credentials}?`;
};

const statusActions: Record<string, string> = {
  active: "Deactivate",
  inactive: "Activate",
};

const getStatusAction = (status: string): string => {
  const lowerCaseStatus = status.toLowerCase();
  return statusActions[lowerCaseStatus] || "Delete";
};
const messages: Record<string, string> = {
  delete: "You won’t be able to revert this",
};

const getMessage = (action: string): string => {
  const lowerCaseAction = action.toLowerCase();
  return messages[lowerCaseAction] || "";
};

const resetAddCredetialsForm = () => {
  const modalWrapperId = document.querySelector<any>("#modal1");
  const checkBoxAll = modalWrapperId?.querySelectorAll(
    'input[type="checkbox"]'
  );
  const radioBtnAll = modalWrapperId?.querySelectorAll('input[type="radio"]');
  const textFieldAll = modalWrapperId?.querySelectorAll('input[type="text"]');
  const selectDropdownAll = modalWrapperId?.querySelectorAll("select");

  [...radioBtnAll, ...checkBoxAll].forEach((item: any) => {
    item.checked = false;
  });
  Array.from(textFieldAll).forEach((item: any) => {
    item.value = "";
  });
  Array.from(selectDropdownAll).forEach((item: any) => {
    item.value = "select";
  });
  modalWrapperId.querySelector("[type=submit]").disabled = true;
};
export {
  updateModalContent,
  getStatusAction,
  getMessage,
  resetAddCredetialsForm,
};
