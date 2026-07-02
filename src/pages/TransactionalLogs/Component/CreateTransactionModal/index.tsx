/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import { FocusTrap } from "focus-trap-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import store from "app/store";
import CONSTANTS from "common/constants";
import { getErrorMessage, toggleModalStyles } from "common/utils";
import { setPageLoadingStatus } from "components/Loader/loader.slice";
import { showToast } from "components/Toast/toast.slice";
import {
  CreateTransactionLog,
  ICreateTransactionLog,
} from "services/api/transactionalLog.api";
import { CreateTransactionModalStyles } from "./styled";

interface ICreateTransactionModalProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  onCreated: () => void;
}

// Known status values seeded/used in transaction_logs.status (see backend/db/init.sql).
const STATUS_OPTIONS = ["SUCCESS", "FAILURE", "SKIPPED", "PENDING"];

const UISchemaCreateTransaction = yup.object().shape({
  status: yup.string().required("Status is required"),
  transactionId: yup.string().max(100, "Maximum 100 characters allowed"),
  entityName: yup.string().max(150, "Maximum 150 characters allowed"),
  source: yup.string().max(50, "Maximum 50 characters allowed"),
  consumer: yup.string().max(50, "Maximum 50 characters allowed"),
  eventType: yup.string().max(100, "Maximum 100 characters allowed"),
  channel: yup.string().max(50, "Maximum 50 characters allowed"),
  clientId: yup.string().max(100, "Maximum 100 characters allowed"),
  errorCode: yup.string().max(50, "Maximum 50 characters allowed"),
  organizationCode: yup.string().max(100, "Maximum 100 characters allowed"),
  email: yup
    .string()
    .matches(CONSTANTS.REGEX.EMAIL, {
      message: "Please enter a valid email address",
      excludeEmptyString: true,
    })
    .max(150, "Maximum 150 characters allowed"),
});

const emptyFormValues: ICreateTransactionLog = {
  status: "",
  transactionId: "",
  entityName: "",
  source: "",
  consumer: "",
  eventType: "",
  channel: "",
  clientId: "",
  errorCode: "",
  organizationCode: "",
  email: "",
};

const CreateTransactionModal = ({
  showModal,
  setShowModal,
  onCreated,
}: ICreateTransactionModalProps) => {
  const dispatch = useDispatch();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(UISchemaCreateTransaction),
    defaultValues: emptyFormValues,
  });

  const closeModal = () => {
    toggleModalStyles();
    setShowModal(false);
    reset(emptyFormValues);
  };

  const submitForm = (formData: ICreateTransactionLog) => {
    setSubmitting(true);
    dispatch(setPageLoadingStatus({ isPageLoading: true }));

    // Drop empty-string optional fields so the backend stores NULL rather than "".
    const payload: ICreateTransactionLog = Object.fromEntries(
      Object.entries(formData).filter(([, value]) => value !== "")
    ) as ICreateTransactionLog;

    CreateTransactionLog(payload)
      .then(() => {
        store.dispatch(
          showToast({
            type: "success",
            title: "Success",
            message: "Transaction created successfully",
          })
        );
        closeModal();
        onCreated();
      })
      .catch((error) => {
        store.dispatch(
          showToast({
            type: "danger",
            title: "Error",
            message: getErrorMessage(error),
          })
        );
      })
      .finally(() => {
        setSubmitting(false);
        dispatch(setPageLoadingStatus({ isPageLoading: false }));
      });
  };

  if (!showModal) return null;

  return (
    <CreateTransactionModalStyles>
      <FocusTrap
        focusTrapOptions={{
          initialFocus: false,
          fallbackFocus: ".modal",
          escapeDeactivates: false,
          clickOutsideDeactivates: false,
        }}
      >
        <div
          className="modal fade show aui-org-modal aui-new-org aui-modal"
          id="createTransaction"
          tabIndex={-1}
          aria-label="Create Transaction Modal Window"
          aria-modal="true"
          role="dialog"
        >
          <div className="modal-dialog modal-md modal-dialog-centered modalwidth">
            <div className="modal-content">
              <button
                type="button"
                className="close d-none d-sm-block"
                onClick={closeModal}
                aria-label="Close"
              >
                <img
                  src="../images/Close.svg"
                  alt=""
                  className="position-relative closestyle"
                />
              </button>
              <div className="modal-header">
                <h2
                  className="proj-heading"
                  aria-label="Create Transaction"
                  data-testid="test-createtransaction"
                >
                  Create Transaction
                </h2>
              </div>

              <form onSubmit={handleSubmit(submitForm)}>
                <div className="modal-body p-0">
                  <div className="form-group required row mb-2">
                    <label htmlFor="status" className="col-sm-3 col-form-label">
                      Status
                    </label>
                    <div className="col-sm-9">
                      <select
                        id="status"
                        name="status"
                        ref={register}
                        className="form-control"
                        aria-required="true"
                      >
                        <option value="">Select Status</option>
                        {STATUS_OPTIONS.map((statusOption) => (
                          <option key={statusOption} value={statusOption}>
                            {statusOption}
                          </option>
                        ))}
                      </select>
                      {errors.status?.message && (
                        <p role="alert" className="form-error-msg">
                          {errors.status?.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="form-group row mb-2">
                    <label
                      htmlFor="transactionId"
                      className="col-sm-3 col-form-label"
                    >
                      Transaction ID
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"
                        id="transactionId"
                        name="transactionId"
                        ref={register}
                      />
                      {errors.transactionId?.message && (
                        <p role="alert" className="form-error-msg">
                          {errors.transactionId?.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="form-group row mb-2">
                    <label
                      htmlFor="entityName"
                      className="col-sm-3 col-form-label"
                    >
                      Entity Name
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"
                        id="entityName"
                        name="entityName"
                        ref={register}
                      />
                      {errors.entityName?.message && (
                        <p role="alert" className="form-error-msg">
                          {errors.entityName?.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="form-group row mb-2">
                    <label htmlFor="source" className="col-sm-3 col-form-label">
                      Source
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"
                        id="source"
                        name="source"
                        ref={register}
                      />
                      {errors.source?.message && (
                        <p role="alert" className="form-error-msg">
                          {errors.source?.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="form-group row mb-2">
                    <label
                      htmlFor="consumer"
                      className="col-sm-3 col-form-label"
                    >
                      Consumer
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"
                        id="consumer"
                        name="consumer"
                        ref={register}
                      />
                      {errors.consumer?.message && (
                        <p role="alert" className="form-error-msg">
                          {errors.consumer?.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="form-group row mb-2">
                    <label
                      htmlFor="eventType"
                      className="col-sm-3 col-form-label"
                    >
                      Event Type
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"
                        id="eventType"
                        name="eventType"
                        ref={register}
                      />
                      {errors.eventType?.message && (
                        <p role="alert" className="form-error-msg">
                          {errors.eventType?.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="form-group row mb-2">
                    <label
                      htmlFor="channel"
                      className="col-sm-3 col-form-label"
                    >
                      Channel
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"
                        id="channel"
                        name="channel"
                        ref={register}
                      />
                      {errors.channel?.message && (
                        <p role="alert" className="form-error-msg">
                          {errors.channel?.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="form-group row mb-2">
                    <label
                      htmlFor="clientId"
                      className="col-sm-3 col-form-label"
                    >
                      Client ID
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"
                        id="clientId"
                        name="clientId"
                        ref={register}
                      />
                      {errors.clientId?.message && (
                        <p role="alert" className="form-error-msg">
                          {errors.clientId?.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="form-group row mb-2">
                    <label
                      htmlFor="errorCode"
                      className="col-sm-3 col-form-label"
                    >
                      Error Code
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"
                        id="errorCode"
                        name="errorCode"
                        ref={register}
                      />
                      {errors.errorCode?.message && (
                        <p role="alert" className="form-error-msg">
                          {errors.errorCode?.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="form-group row mb-2">
                    <label
                      htmlFor="organizationCode"
                      className="col-sm-3 col-form-label"
                    >
                      Organization Code
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"
                        id="organizationCode"
                        name="organizationCode"
                        ref={register}
                      />
                      {errors.organizationCode?.message && (
                        <p role="alert" className="form-error-msg">
                          {errors.organizationCode?.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="form-group row mb-2">
                    <label htmlFor="email" className="col-sm-3 col-form-label">
                      Email
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"
                        id="email"
                        name="email"
                        ref={register}
                      />
                      {errors.email?.message && (
                        <p role="alert" className="form-error-msg">
                          {errors.email?.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-3 d-flex btnGrp-addTanant justify-content-end">
                  <button
                    type="button"
                    aria-label="cancel"
                    className="btn btn-round btn-secondary mr-4 btnwidth"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    aria-label="create"
                    className="btn btn-round btn-primary btnwidth"
                    disabled={submitting}
                  >
                    {submitting ? "Creating..." : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </FocusTrap>
    </CreateTransactionModalStyles>
  );
};

export default CreateTransactionModal;
