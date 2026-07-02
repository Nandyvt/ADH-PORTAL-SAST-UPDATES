import store from "app/store";
import {
  getErrorMessage,
  getMainIcon,
  capitalizeFirstLetter,
} from "common/utils";

import Modal from "components/Modal";
import { showToast } from "components/Toast/toast.slice";
import {
  getMessage,
  getStatusAction,
  updateModalContent,
} from "pages/Notifications/utils";
import React, { useCallback, useState } from "react";
import { deleteEmailConfigService } from "services/api/notification.api";
import EmailDetailsWrapper from "./styled";

const EmailDetails: React.FunctionComponent<any> = ({
  emailClientConfig,
  apiStatus,
  setApiStatus,
}: any) => {
  const [isShown, setIsShown] = useState<boolean>(false);
  const [notificationStatus] = useState("");
  const [notificationId, setNotificationId] = useState(0);
  const [modalContent, setModalContent] = useState("");
  const [roleName, setRoleName] = useState<any>([]);
  const [message, setMessage] = useState("");
  const [mainIcon, setMainIcon] = useState("Lock");

  const toggle = useCallback(() => {
    document.querySelector(".modal-backdrop")?.classList.toggle("show");
    document.querySelector("body")?.classList.toggle("modal-open");
    return setIsShown(!isShown);
  }, [isShown]);
  const ApiCaller = useCallback(
    (id: number, status: string) => {
      if (apiStatus === "deleteApi") {
        deleteEmailConfigService(id)
          .then(() => {
            store.dispatch(
              showToast({
                type: "success",
                title: "Success",
                message: "Notification has been deleted successfully",
              })
            );
            setApiStatus("delete");
          })
          .catch((errors: any) => {
            store.dispatch(
              showToast({
                title: "Error",
                message: getErrorMessage(errors),
              })
            );
            setApiStatus("config");
          })
          .finally(() => {});
      }
    },
    [apiStatus]
  );
  return (
    <EmailDetailsWrapper className="mb-3 mb-sm-9 pb-sm-4">
      <div className="d-flex  align-items-center justify-content-start form-margin-top">
        <div className="w-100">
          <div className="row">
            <div className="col-lg-4">
              <div className="vertical-spacing label-text">
                Service Provider
              </div>
              <div className=" font-500 details-text detailValue">
                <span className="text-value">
                  {emailClientConfig[0]?.serviceProviderName}
                </span>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-4 col-sm-6 mt-4">
              <div className="text-capitalize vertical-spacing label-text">
                {emailClientConfig[0]?.serviceProviderName} Domain
              </div>
              <div className="font-500 details-text detailValue">
                <span className="text-value">
                  {emailClientConfig[0]?.config.domain}
                </span>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 mt-4">
              <div className="text-capitalize vertical-spacing label-text">
                {emailClientConfig[0]?.serviceProviderName} API Key
              </div>
              <div className="font-500 details-text detailValue">
                <span className="text-value">
                  {emailClientConfig[0]?.config.privateKey}
                </span>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="px-2 d-flex contents mt-4 column-padding">
              <div className="pr-custom-5">
                <span className="font-600">
                  <button
                    type="button"
                    className="mb-2 editbtn d-flex align-items-center"
                    onClick={() => {
                      setApiStatus("edit");
                    }}
                  >
                    <img
                      className="pr-2"
                      src="/images/Edit.svg"
                      alt="Edit Button"
                    />
                    <p className="m-0">Edit</p>
                  </button>
                </span>
              </div>

              <div>
                <span className="font-600 editbtn">
                  <button
                    type="button"
                    className="mb-2 editbtn d-flex align-items-center"
                    onClick={() => {
                      setApiStatus("deleteApi");
                      setMainIcon(getMainIcon(getStatusAction("")));
                      setRoleName([]);
                      setNotificationId(emailClientConfig[0].id);
                      setModalContent(
                        updateModalContent(getStatusAction(""), "Notification")
                      );
                      setMessage(getMessage(getStatusAction("")));
                      toggle();
                    }}
                  >
                    <img
                      className="pr-2"
                      src="/images/Delete.svg"
                      alt="Delete Button"
                    />
                    <p className="m-0">Delete</p>
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isShown={isShown}
        hide={toggle}
        id={notificationId}
        action={ApiCaller}
        status={notificationStatus}
        modalContent={modalContent}
        roles={roleName}
        message={message}
        mainIcon={mainIcon}
      />
    </EmailDetailsWrapper>
  );
};

export default EmailDetails;
