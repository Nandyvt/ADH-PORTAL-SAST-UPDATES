/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import CONSTANTS from "common/constants";
import store from "app/store";
import { getErrorMessage, toggleModalStyles } from "common/utils";
import AutoSuggestComp from "components/AutoSuggest";
import { setPageLoadingStatus } from "components/Loader/loader.slice";
import { showToast } from "components/Toast/toast.slice";
import { FocusTrap } from "focus-trap-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addClientService } from "services/api/clients.api";
import { ModalWrapperStyles } from "./styled";

export interface IClient {
  client: {
    ID: number;
    name: string;
    Description: string;
    email: string;
    IsActive: boolean;
  };
}
const AddClientsModalComp = ({
  register,
  errors,
  handleSubmit,
  setAddClientCompChange,
  addClientCompChange,
  autoSuggestValue,
  setAutoSuggestValue,
  setToggleModal,
  toggleModal,
}: any) => {
  const dispatch = useDispatch();
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [clientDetails, setClientDetails] = useState<IClient>({
    client: {
      ID: 0,
      name: "",
      Description: "",
      email: "",
      IsActive: false,
    },
  });

  const imageUrl = "../images/Close.svg";
  const [imageLoading, setImageLoading] = useState(true);
  const imageLoaded = () => {
    setImageLoading(false);
  };

  const submitForm = (formData: any) => {
    // Add API call here
    formData && (formData.email = autoSuggestValue);
    dispatch(setPageLoadingStatus({ isPageLoading: true }));
    addClientService(formData)
      .then(() => {
        store.dispatch(
          showToast({
            type: "success",
            title: "Success",
            message: "Client added successfully",
          })
        );
        toggleModalStyles();
        setToggleModal(false);
        setAddClientCompChange(!addClientCompChange);
        dispatch(setPageLoadingStatus({ isPageLoading: false }));
        setImageLoading(true);
      })
      .catch((error) => {
        // eslint-disable-next-line no-debugger
        debugger;
        store.dispatch(
          showToast({
            type: "danger",
            title: "Error",
            message: getErrorMessage(error),
          })
        );
        dispatch(setPageLoadingStatus({ isPageLoading: false }));
      });
  };
  const handleChange = useCallback(
    (event: any) => {
      const { name, value } = event.target;
      setClientDetails({
        ...clientDetails,
        client: {
          ...clientDetails.client,
          [name]: value,
        },
      });
    },
    [clientDetails]
  );

  const shouldEnableSubmitButton = (name: string, email: string) => {
    if (name !== "" && email !== "") {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (
      shouldEnableSubmitButton(
        clientDetails.client.name,
        clientDetails.client.email
      )
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [clientDetails]);

  // For Accessibility
  const RefFocus = useRef<any>();
  /*   useEffect(() => {
    if (toggleModal && RefFocus.current && !imageLoading)
      RefFocus.current.focus();
  }, [toggleModal, imageLoading]); */
  return (
    <ModalWrapperStyles>
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
            id="addClient"
            tabIndex={-1}
            aria-label="Add New Client Modal Window"
            aria-modal="true"
            role="dialog"
          >
            <div className="modal-dialog modal-md modal-dialog-centered modalwidth">
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
                      toggleModalStyles();
                      setToggleModal(false);
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
                  <div className="modal-header">
                    <span
                      className="d-block d-sm-none rotateInverse"
                      onClick={() => {
                        toggleModalStyles();
                        setToggleModal(false);
                      }}
                      role="button"
                      onKeyUp={() => {
                        toggleModalStyles();
                        setToggleModal(false);
                      }}
                      tabIndex={0}
                    >
                      <i className="aha-icon-right-arrow-thick" />
                    </span>
                    <h2
                      className="proj-heading"
                      aria-label="Add a Client"
                      data-testid="test-addtenant"
                    >
                      Add New Client
                    </h2>
                  </div>
                  <p className="instruction">
                    {CONSTANTS.MODAL_INSTRUCTION_TEXT}
                  </p>
                  <form onSubmit={() => {}}>
                    <div className="modal-body p-0">
                      <div className="form-group required row mb-2">
                        <label
                          htmlFor="name"
                          className="col-sm-3 col-form-label"
                          aria-label="Name"
                        >
                          Name
                        </label>
                        <div className="col-sm-9">
                          <input
                            aria-required="true"
                            type="text"
                            required
                            className="form-control"
                            id="name"
                            name="name"
                            ref={register}
                            onChange={handleChange}
                          />
                          {errors.name?.message && (
                            <p role="alert" className="form-error-msg">
                              {errors.name?.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="form-group row required mb-2">
                        <label
                          htmlFor="emailid"
                          className="col-sm-3 col-form-label"
                          aria-label="Email"
                        >
                          Email ID
                        </label>
                        <div className="col-sm-9">
                          <AutoSuggestComp
                            onChangeHandler={handleChange}
                            autoSuggestValue={autoSuggestValue}
                            setAutoSuggestValue={setAutoSuggestValue}
                            register={register}
                          />
                          {errors.email?.message && (
                            <p role="alert" className="form-error-msg">
                              {errors.email?.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="form-group row">
                        <label
                          htmlFor="description"
                          className="col-sm-3 col-form-label"
                        >
                          Description
                        </label>
                        <div className="col-sm-9">
                          <textarea
                            className="form-control"
                            id="description"
                            rows={3}
                            name="description"
                            ref={register}
                            placeholder={`Max (${CONSTANTS.CHARACTERS_COUNT_DESCRIPTION}) Characters`}
                            onChange={handleChange}
                            maxLength={CONSTANTS.CHARACTERS_COUNT_DESCRIPTION}
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                  <div className="pt-1 d-flex btnGrp-addTanant justify-content-end">
                    <button
                      type="button"
                      aria-label="cancel"
                      className="btn btn-round btn-secondary mr-4 btnwidth"
                      onClick={() => {
                        setClientDetails({
                          ...clientDetails,
                          client: {
                            ...clientDetails.client,
                            name: "",
                            email: "",
                          },
                        });
                        setToggleModal(false);
                        toggleModalStyles();
                        setImageLoading(true);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmit(submitForm)}
                      aria-label="save"
                      className="btn btn-round btn-primary btnwidth"
                      disabled={buttonDisabled}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FocusTrap>
      ) : null}
    </ModalWrapperStyles>
  );
};

export default AddClientsModalComp;
