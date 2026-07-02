/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FunctionComponent, useEffect, useState, useRef } from "react";
import { getErrorMessage, toggleModalStyles } from "common/utils";
import { UpdateClientNotificationTypeService } from "services/api/notification.api";
import store from "app/store";
import { showToast } from "components/Toast/toast.slice";
import { FocusTrap } from "focus-trap-react";
import SettingModalWrapper from "./styled";
import { togglePopover } from "../utils";

export interface ISettingsModal {
  selectedClient: any;
  popoverEvent: any;
  setToggleModal: (toggleState: boolean) => void;
  refresh: boolean;
  setRefresh: (toggleState: boolean) => void;
  toggleModal: boolean;
}
const SettingsModal: FunctionComponent<ISettingsModal> = ({
  selectedClient,
  setRefresh,
  refresh,
  toggleModal,
  setToggleModal,
  popoverEvent,
}) => {
  const [data, setData] = useState<any>([]);
  const [checkBoxChanged, setCheckBoxChanged] = useState<Set<string>>(
    new Set()
  );
  const [disabled, setDisabled] = useState(true);
  const [checkBox, setCheckBox] = useState<any>([]);
  const [reset, setReset] = useState<boolean>(false);

  useEffect(() => {
    selectedClient?.types && setData((prev: any) => [...selectedClient.types]);
  }, [selectedClient]);

  useEffect(() => {
    if (data && data.length > 0) {
      setCheckBox(
        data.map((item: any) => {
          return {
            configId: item.configId,
            initialChecked: item.status === "ACTIVE",
            type: item.type,
          };
        })
      );
    }
  }, [data, reset]);

  const imageUrl = "../images/Close.svg";
  const [imageLoading, setImageLoading] = useState(true);
  const imageLoaded = () => {
    setImageLoading(false);
  };

  // For Accessibility
  const RefFocus = useRef<any>();
  useEffect(() => {
    if (toggleModal && RefFocus.current && !imageLoading)
      RefFocus.current.focus();
  }, [toggleModal, imageLoading]);

  const onChangeHandler = (event: any) => {
    const { checked, value } = event.target;
    const newCheckBoxChanged = new Set(checkBoxChanged);
    const arr = checkBox.map((item: any) => {
      if (item.type === value) {
        if (checked !== item.initialChecked) {
          setCheckBoxChanged(newCheckBoxChanged?.add(value));
          return { ...item, checked };
        }
        newCheckBoxChanged.delete(value);
        setCheckBoxChanged(newCheckBoxChanged);
        setDisabled(true);
        return { ...item, checked };
      }
      return { ...item };
    });
    if (newCheckBoxChanged.size > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
    setCheckBox(arr);
  };

  const submitHandler = () => {
    const arr = checkBox
      .filter((item: any) => {
        if (checkBoxChanged.has(item.type)) {
          return item;
        }
      })
      .map((item: any) => {
        return {
          configId: item.configId,
          status: item.checked ? "ACTIVE" : "INACTIVE",
        };
      });
    checkBoxChanged.clear();
    setDisabled(true);
    setReset(!reset);
    UpdateClientNotificationTypeService({ types: arr })
      .then((res) => {
        store.dispatch(
          showToast({
            type: "success",
            title: "Success",
            message: "Client Config Updated successfully",
          })
        );
        setRefresh(!refresh);
        setImageLoading(true);
      })
      .catch((error) => {
        store.dispatch(
          showToast({
            type: "danger",
            title: "Error Occurred",
            message: getErrorMessage(error),
          })
        );
      });
  };
  return (
    <SettingModalWrapper>
      {toggleModal ? (
        <FocusTrap
          focusTrapOptions={{
            initialFocus: false,
            fallbackFocus: `.modal`,
            escapeDeactivates: false,
            clickOutsideDeactivates: false,
          }}
        >
          <div
            className="modal fade show aui-org-modal aui-new-org aui-modal"
            id="client-notification-settings"
            tabIndex={-1}
            aria-label="Client Notification Settings"
            aria-modal="true"
            role="dialog"
          >
            <div className="modal-dialog modal-sm modal-dialog-centered modalwidth">
              <div className="modal-content">
                <div
                  className={`aui-block-loader ${
                    imageLoading ? "d-flex" : "d-none"
                  }`}
                  role="alert"
                  aria-live="assertive"
                  aria-label="Modal Content Loading"
                />
                <div
                  className={`modal-content-wrapper ${
                    imageLoading ? "d-none" : "d-block"
                  }`}
                >
                  <button
                    ref={RefFocus}
                    type="button"
                    className="close d-none d-sm-block"
                    onClick={() => {
                      setToggleModal(false);
                      toggleModalStyles();
                      setImageLoading(true);
                    }}
                    aria-label="Close"
                  >
                    <img
                      src={imageUrl}
                      data-testid="crossbtn"
                      onLoad={imageLoaded}
                      alt=""
                      className="position-relative closestyle"
                    />
                  </button>
                  <div className="d-flex justify-content-center align-items-center">
                    <img
                      src="/images/Lock.svg"
                      className="lockimg"
                      alt="lock img"
                    />
                  </div>
                  <div className="text-center py-4">
                    <p data-testid="modal-content" className="mb-0 subtitle">
                      Update {selectedClient?.name} notification type.
                    </p>
                  </div>
                  <div className="form-group row justify-content-center">
                    <div className="col-sm-12 d-flex justify-content-center pt-2">
                      {selectedClient?.types &&
                        selectedClient?.types.length > 0 &&
                        selectedClient?.types.map((item: any) => (
                          <div
                            key={item.id}
                            className="form-group form-check-bordered"
                          >
                            <input
                              type="checkbox"
                              value={item.type}
                              id={`check-${item.type}`}
                              defaultChecked={item.status === "ACTIVE"}
                              onChange={onChangeHandler}
                            />
                            <label htmlFor={`check-${item.type}`}>
                              {item.type}
                            </label>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="pt-1 d-flex justify-content-center buttons">
                    <button
                      type="button"
                      aria-label="cancel"
                      className="btn btn-round btn-secondary mr-4 btnwidth"
                      onClick={() => {
                        setToggleModal(false);
                        toggleModalStyles();
                        checkBoxChanged.clear();
                        setDisabled(true);
                        setReset(!reset);
                        setImageLoading(true);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      aria-label="Update"
                      className="btn btn-round btn-primary btnwidth"
                      onClick={() => {
                        submitHandler();
                        setToggleModal(false);
                        toggleModalStyles();
                        togglePopover(popoverEvent);
                      }}
                      disabled={disabled}
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FocusTrap>
      ) : null}
    </SettingModalWrapper>
  );
};

export default SettingsModal;
