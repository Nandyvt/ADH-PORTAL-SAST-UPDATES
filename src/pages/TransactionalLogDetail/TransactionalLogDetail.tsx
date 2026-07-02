import React, { useState, useEffect } from "react";
import { Wrapper } from "styled";
import store from "app/store";
import {
  getErrorMessage,
  jsonColorObjectDefault,
  lowerCaseAllWordsExceptFirstLetters,
} from "common/utils";
import { TransactionalLogDetails } from "services/api/transactionalLog.api";
import { showToast } from "components/Toast/toast.slice";
import { setPageLoadingStatus } from "components/Loader/loader.slice";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import JsonEditor from "components/JsonEditor";
import { logger } from "common/utils/logger.utils";
import CustomTooltip from "components/CustomTooltip";
import { TransactionalLogDetailStyled } from "./styled";

interface Transaction {
  id: string;
  transactionId: string;
  consumer: string;
  eventType: string;
  entityName: string;
  status: string;
  channel: string;
  source: string;
  clientId: string;
  errorCode: string;
  createdAt: string;
  updatedAt: string;
  requestPayload: any;
  errorDetails: any;
}

interface ErrorPayload {
  errorCode: string;
  errorDetails: string;
}

const defaultColorObj = jsonColorObjectDefault();

function TransactionalLogDetail() {
  const [transactionalData, setTransactionalData] = useState<Transaction>();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [errorPayload, setErrorPayload] = useState<ErrorPayload>();
  const [requestPayload, setRequestPayload] = useState<any>();
  const [copyContent, setCopyContent] = useState("Copy");
  const navigate = useNavigate();
  // Params
  const { id, type } = useParams<{ id: string; type: string }>();

  const copyToClipBoard = (value: any) => {
    const copyText = value;
    navigator.clipboard.writeText(copyText);
    setTimeout(() => {
      setCopyContent("Copy");
    }, 3000);
  };
  // API Function call
  const getTransactionalLogs = () => {
    TransactionalLogDetails(id)
      .then((response) => {
        if (response.data.transactionLog != null) {
          setTransactionalData(response.data.transactionLog);
          setRequestPayload(response.data.transactionLog.requestPayload);
          const errorPayloadVal: ErrorPayload = {
            errorCode: response.data.transactionLog.errorCode,
            errorDetails: response.data.transactionLog.errorDetails,
          };
          setErrorPayload(errorPayloadVal);
        }
      })
      .catch((error) => {
        store.dispatch(
          showToast({
            type: "danger",
            title: "Error Occurred",
            message: getErrorMessage(error),
          })
        );
      })
      .finally(() => {
        setLoading(false);
        dispatch(setPageLoadingStatus({ isPageLoading: false }));
      });
  };

  useEffect(() => {
    setLoading(true);
    dispatch(setPageLoadingStatus({ isPageLoading: true }));
    if (type !== "request" && type !== "error") {
      navigate("/NotFound");
    } else {
      getTransactionalLogs();
    }
    logger("loading status", loading);
  }, []);

  return (
    <Wrapper className="d-flex flex-column loader-baseWidth w-100 px-lg-4 pt-lg-4  mt-lg-2">
      <TransactionalLogDetailStyled>
        <div className="d-flex flex-column ml-3  mr-3 mr-lg-0 ml-lg-0">
          <h1 className="title">
            {transactionalData?.entityName}{" "}
            <span
              className={
                transactionalData?.status === "SUCCESS" ? "success" : "failure"
              }
            >
              {lowerCaseAllWordsExceptFirstLetters(
                transactionalData?.status ?? ""
              )}
            </span>
          </h1>
          {transactionalData && (
            <div className="body">
              <section className="d-flex flex-wrap sectionclass row">
                <div className="d-flex col-lg-3 col-md-3 col-sm-4 col-12  sourceclass">
                  <div className="d-flex pr-2 mt-2">
                    <img
                      src="/images/Source.svg"
                      alt=""
                      style={{ width: "24px", height: "24px" }}
                    />
                  </div>
                  <div className="d-flex flex-column sub-title">
                    <p className="m-0">Source</p>
                    <span className="title-font-weight">
                      {transactionalData?.source}
                    </span>
                  </div>
                </div>
                <div className="d-flex col-lg-5 col-md-6 col-sm-8 col-12  transactionclass">
                  <div className="d-flex pr-2 mt-2">
                    <img
                      src="/images/arrow-left-and-right.svg"
                      alt=""
                      style={{ width: "24px", height: "19px" }}
                    />
                  </div>
                  <div className="sub-title">
                    <p className="m-0">Transactional ID</p>
                    <span className="title-font-weight d-flex">
                      {transactionalData?.id}
                      <CustomTooltip
                        tooltipid="copy-icon"
                        content={copyContent}
                      >
                        <button
                          type="button"
                          className="noBtnStyle d-flex"
                          aria-label={`Copy ${transactionalData?.id}`}
                          onKeyUp={(e) => {
                            if (e.key === "Enter" || e.key === "Spacebar") {
                              copyToClipBoard(transactionalData?.id);
                              setCopyContent("Copied");
                            }
                          }}
                          onClick={() => {
                            copyToClipBoard(transactionalData?.id);
                            setCopyContent("Copied");
                          }}
                        >
                          <div className="tooltip-role viewOnly">
                            <img
                              className="helpTextStyles"
                              alt="CopyIcon"
                              src="/images/Icons-copy.svg"
                            />
                          </div>
                        </button>
                      </CustomTooltip>
                    </span>
                  </div>
                </div>
                <div className="d-flex col-lg-3 col-md-3 col-sm-6 col-12  consumerclass">
                  <div className="d-flex pr-2  consumerimage">
                    <i className="aha-icon-note icon mt-1 " />
                  </div>
                  <div className="sub-title">
                    <p className="m-0">Consumer</p>
                    <span className="title-font-weight">
                      {transactionalData?.consumer}
                    </span>
                  </div>
                </div>
              </section>
              <section className="tablesection">
                <div className="editor-wrapper border-bottom-0">
                  <h2 className="editor-title m-0">JSON View</h2>
                </div>
                <div
                  id="editor-div"
                  data-testid="transactional-editor-wrapper"
                  className="d-flex flex-column editor-wrapper"
                >
                  <JsonEditor
                    id="transaction-log-json-input-view-wrapper"
                    viewProp
                    editModeEnabled
                    placeholderProp={
                      type === "request" ? requestPayload : errorPayload
                    }
                  />
                </div>
              </section>
            </div>
          )}
        </div>
      </TransactionalLogDetailStyled>
    </Wrapper>
  );
}

export default TransactionalLogDetail;
