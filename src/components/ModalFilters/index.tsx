import React, { useEffect, useRef, useState } from "react";
import DynamicFilters from "components/DynamicFilters";
import ModalFilterStyled from "./styled";
import { IModalFiltersProps } from "./utils";

const CloseButton = ({ handleClose }: any) => (
  <button
    type="button"
    className="close aui-modalclose position-absolute aui-modalclosecls"
    onClick={handleClose}
    aria-label="Close"
  >
    <aui-icon
      aria-hidden="true"
      icon="closeIcon"
      svgwidth="11"
      svgheight="11"
      data-dismiss="modal"
    />
  </button>
);

const ModalHeader = ({ title, mandatoryFieldText }: any) => (
  <div className="d-flex flex-column">
    <div className="mt-2 pb-0 pl-0 pr-0 pt-0">
      <h5 className="mb-0 filter-title filters-padding">{title || ""}</h5>
      <hr className="horizontal-line" />
      {mandatoryFieldText && <p className="note m-0">{mandatoryFieldText}</p>}
    </div>
  </div>
);

const ModalBody = ({ filters, setFiltersData, appliedFilters }: any) => (
  <aui-uploaddocumentmodal-content>
    <div className="filters-padding">
      <DynamicFilters
        filters={filters}
        onChangeHandler={setFiltersData}
        appliedFilters={appliedFilters}
      />
    </div>
  </aui-uploaddocumentmodal-content>
);

const ModalFooter = ({
  handleClose,
  submitButtonTitle,
  isDisabled,
  handleApply,
}: any) => (
  <div className="d-flex justify-content-end mt-4 align-items-center filters-padding mob-padding-btn">
    <aui-button
      buttontitle="Cancel"
      variant="link-style"
      onClick={handleClose}
    />
    <aui-button
      variant="primary"
      buttontitle={submitButtonTitle ?? "Apply"}
      buttonclass={submitButtonTitle ? `${submitButtonTitle}btn` : "applybtn"}
      disabled={isDisabled}
      onClick={handleApply}
    />
  </div>
);

const ModalFilters = ({
  title,
  modalId,
  setAppliedFilters,
  appliedFilters,
  filters,
  setShowModal,
  showModal,
  modalSize,
  submitButtonTitle,
  mandatoryFieldText,
}: IModalFiltersProps) => {
  const [filtersData, setFiltersData] = useState<any>([]);
  const [isValidArray, setIsValidArray] = useState<any>({});
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const ref = useRef<any>(null);

  useEffect(() => {
    document.body.classList.toggle("modal-open", showModal);
  }, [showModal]);

  const validateFilters = () => {
    filters.forEach((filter) => {
      const el = document.getElementById(filter?.filterParams?.id);
      if (el) {
        ref.current = el;
        const isValid = ref.current.isValid();
        setIsValidArray((prevState: any) => ({
          ...prevState,
          [ref.current.id]: isValid,
        }));
      }
    });
  };

  const updateSubmitButtonState = async () => {
    const resolvedValues = await Promise.all(Object.values(isValidArray));
    setIsDisabled(!resolvedValues.every(Boolean)); // Simplified check for true values
  };

  useEffect(() => {
    if (showModal) {
      validateFilters();
    }
  }, [showModal, filtersData]);

  useEffect(() => {
    updateSubmitButtonState();
  }, [isValidArray]);

  const handleClose = () => setShowModal(false);

  const handleApply = () => {
    if (!isDisabled) {
      setAppliedFilters(filtersData);
      handleClose();
    }
  };

  return showModal ? (
    <ModalFilterStyled>
      <div className="w-100">
        <aui-uploaddocumentmodal modalsize={modalSize ?? "auimodal-md"}>
          <div
            className={`modal auimodal ${showModal ? "show" : "fade"}`}
            id={modalId}
            aria-labelledby="aui-uploaddocumentmodalLabel"
            aria-hidden
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="d-block d-flex flex-column justify-content-start modal-content">
                <CloseButton handleClose={handleClose} />
                <ModalHeader
                  title={title}
                  mandatoryFieldText={mandatoryFieldText}
                />
                <ModalBody
                  filters={filters}
                  setFiltersData={setFiltersData}
                  appliedFilters={appliedFilters}
                />
                <ModalFooter
                  handleClose={handleClose}
                  submitButtonTitle={submitButtonTitle}
                  isDisabled={isDisabled}
                  handleApply={handleApply}
                />
              </div>
            </div>
          </div>
        </aui-uploaddocumentmodal>
      </div>
    </ModalFilterStyled>
  ) : null;
};

export default ModalFilters;
