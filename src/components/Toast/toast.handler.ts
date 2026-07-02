import { IToast } from "components/Toast/toast.slice";

const getDetailedErrorMessage = (toast: any) => {
  let message = toast.message ? toast.message : toast;
  if (toast.details && toast.details.length > 0) {
    message = toast.details.map((detail: any) => {
      message += `, ${detail.message}`;
      return message;
    });
  }
  return message;
};

const ToastHandler = (toast: any) => {
  const visibility = toast.suppress ? !toast.suppress : true;
  const errorResponse: IToast = {};
  errorResponse.message = getDetailedErrorMessage(toast);
  errorResponse.type = toast.type ? toast.type : "danger";
  errorResponse.title =
    toast.code || toast.title ? toast.code || toast.title : "Error";
  errorResponse.visibility = visibility;
  return errorResponse;
};

export default ToastHandler;
