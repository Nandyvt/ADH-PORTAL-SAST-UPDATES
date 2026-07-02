import store from "app/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { hideToast } from "./toast.slice";
import { ToastWrapper } from "./styled";

const Toast = () => {
  const toast = useSelector((state: any) => {
    return state.toast;
  });

  const [visibility, setVisibility] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [type, setType] = useState<string>("success");
  let timeOut: any = false;
  const autoHide = () => {
    if (toast.visibility) {
      if (!timeOut) {
        timeOut = setTimeout(() => {
          store.dispatch(hideToast());
          clearTimeout(timeOut);
          timeOut = false;
        }, 6000);
      }
    }
  };
  useEffect(() => {
    setVisibility(toast.visibility);
    setTitle(toast.title);
    setMessage(toast.message);
    setType(toast.type);
    autoHide();
  }, [toast]);

  return (
    <>
      {visibility ? (
        <ToastWrapper className="container">
          <div
            className={`alert alert-${type} alert-dismissible fade show`}
            role="alert"
          >
            <strong>{title}</strong>
            {message}
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
              onClick={() => {
                store.dispatch(hideToast());
              }}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </ToastWrapper>
      ) : null}
    </>
  );
};
export default Toast;
