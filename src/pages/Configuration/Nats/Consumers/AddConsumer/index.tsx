/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import CONSTANTS from "common/constants";
import { toggleModalStyles } from "common/utils";
import FocusTrap from "focus-trap-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ModalWrapperStyles } from "pages/Clients/styled";
import { logger } from "common/utils/logger.utils";

export interface IClient {
  client: {
    ID: number;
    name: string;
    Description: string;
    email: string;
    IsActive: boolean;
  };
}
const AddConsumerModalComp = ({
  register,
  handleSubmit,
  setToggleModal,
  toggleModal,
}: any) => {
  const [buttonDisabled] = useState(true);

  const imageUrl = "../images/Close.svg";
  const [imageLoading, setImageLoading] = useState(true);
  const imageLoaded = () => {
    setImageLoading(false);
  };

  // mockup data for dropdowns

  const dropdownData = [
    {
      id: 1,
      code: "option 1",
      name: "option 1",
    },
    {
      id: 2,
      code: "option 2",
      name: "option 2",
    },
    {
      id: 3,
      code: "option 3",
      name: "option 3",
    },
    {
      id: 4,
      code: "option 4",
      name: "option 4",
    },
  ];

  const submitForm = () => {
    logger("form submitted");
  };
  const handleChange = useCallback(() => {}, []);

  const onChangeHandler = useCallback(() => {}, []);

  // For Accessibility
  const RefFocus = useRef<any>();
  useEffect(() => {
    if (toggleModal && RefFocus.current && !imageLoading)
      RefFocus.current.focus();
  }, [toggleModal, imageLoading]);
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
            id="addNatsConsumer"
            tabIndex={-1}
            aria-label="Add Consumer Modal Window"
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
                      Create NATS Consumer
                    </h2>
                  </div>
                  <p className="instruction">
                    {CONSTANTS.MODAL_INSTRUCTION_TEXT}
                  </p>
                  <form onSubmit={() => {}}>
                    <div className="modal-body p-0">
                      <div className="form-group row required mb-2">
                        <label
                          htmlFor="selectClient"
                          className="col-sm-4 col-form-label"
                          aria-label="Select Client"
                        >
                          Client
                        </label>
                        <div className="col-sm-8">
                          <select
                            className="form-control dropdown"
                            defaultValue=""
                            ref={register}
                            onChange={onChangeHandler}
                            name="role"
                            id="selectClient"
                            required
                            aria-required="true"
                            onClick={() => {}}
                            onBlur={() => {}}
                          >
                            <option value="" disabled hidden selected>
                              Select Client
                            </option>
                            {dropdownData.map((item: any) => (
                              <option key={item.id} value={item.code}>
                                {item.name}
                              </option>
                            ))}
                          </select>
                          <i className="aha-icon-arrow-down forModal" />
                        </div>
                      </div>
                      <div className="form-group required row mb-2">
                        <label
                          htmlFor="nats-type"
                          className="col-sm-4 col-form-label"
                          aria-label="Nats Type"
                        >
                          Type
                        </label>
                        <div className="col-sm-8">
                          <input
                            aria-required="true"
                            type="text"
                            required
                            className="form-control"
                            id="nats-type"
                            name="nats-type"
                            ref={register}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="form-group row required mb-2">
                        <label
                          htmlFor="selectSource"
                          className="col-sm-4 col-form-label"
                          aria-label="Select Source"
                        >
                          Source
                        </label>
                        <div className="col-sm-8">
                          <select
                            className="form-control dropdown"
                            defaultValue=""
                            ref={register}
                            onChange={onChangeHandler}
                            name="role"
                            id="selectSource"
                            required
                            aria-required="true"
                            onClick={() => {}}
                            onBlur={() => {}}
                          >
                            <option value="" disabled hidden selected>
                              Select Source
                            </option>
                            {dropdownData.map((item: any) => (
                              <option key={item.id} value={item.code}>
                                {item.name}
                              </option>
                            ))}
                          </select>
                          <i className="aha-icon-arrow-down forModal" />
                        </div>
                      </div>

                      <div className="form-group row required mb-2">
                        <label
                          htmlFor="selectEntity"
                          className="col-sm-4 col-form-label"
                          aria-label="Select Source"
                        >
                          Entity
                        </label>
                        <div className="col-sm-8">
                          <select
                            className="form-control dropdown"
                            defaultValue=""
                            ref={register}
                            onChange={onChangeHandler}
                            name="role"
                            id="selectEntity"
                            required
                            aria-required="true"
                            onClick={() => {}}
                            onBlur={() => {}}
                          >
                            <option value="" disabled hidden selected>
                              Select Entity
                            </option>
                            {dropdownData.map((item: any) => (
                              <option key={item.id} value={item.code}>
                                {item.name}
                              </option>
                            ))}
                          </select>
                          <i className="aha-icon-arrow-down forModal" />
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
                      Configure
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

export default AddConsumerModalComp;
