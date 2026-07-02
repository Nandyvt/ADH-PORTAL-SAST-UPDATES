/* eslint-disable react/require-default-props */
import CustomTooltip from "components/CustomTooltip";
import React, { useState } from "react";
import NoDataComp from "components/NoData";
import { Link, useNavigate } from "react-router-dom";
import CONSTANTS from "common/constants";
import TagsTableDataComp from "components/TagsTableData";
import { modifyURLOnTabChange } from "pages/Configuration/utils";
import BadgeTags from "components/TagsSingle";
import TableStylesWrapper from "./styled";

interface ITableProps {
  theadData: any;
  tbodyData: any;
  isTableLoading: boolean;
  clearAllFilterFunc: () => void;
  tableName: string;
  noDataCompElement?: {
    noDataHeading: any;
    noDataMarkup: any;
  };
  setChangeCompOnView?: any;
}

interface ITableDataProps {
  ID?: number;
  id?: number;
  Name: string;
  Description: string;
  CreatedAt: string;
  Subject: string;
  UpdatedAt: string;
  client_code: string;
  client_id: number;
  client_name: string;
  Username: string;
  Password: string;
}

const TableComp = (props: ITableProps) => {
  const [togglePopoverAria, setTogglePopoverAria] = useState<boolean>();

  const navigate = useNavigate();

  // Helper function to toggle popover
  const togglePopover = (e: any) => {
    const connectionWrappers = document.querySelectorAll(
      ".connection-td-wrapper"
    );
    const { nextSibling } = e.currentTarget;

    Array.from(connectionWrappers).forEach((el) => {
      if (nextSibling !== el) {
        el.classList.remove("d-flex");
        el.classList.add("d-none");
      }
    });

    nextSibling?.classList.toggle("d-none");
    setTogglePopoverAria((prevAria) => !prevAria);
  };

  const getNestedProperty = (obj: Record<string, any>, path: string): any => {
    return path.split(".").reduce((acc: any, part: string) => acc?.[part], obj);
  };

  // Helper for password copy icon
  const [copySecret, setSecret] = useState("Copy");
  const copyToClipBoard = (value: any) => {
    const copyText = value;
    navigator.clipboard.writeText(copyText);
    setTimeout(() => {
      setSecret("Copy");
    }, 2000);
  };

  const generateTdCell = (
    each: any,
    {
      filterCode,
      referenceCol,
      isElipsesPopoverDisabled,
      isAnchor,
      anchorRedirect,
      name,
    }: any
  ) => {
    if (filterCode === "client_name_transform") {
      return (
        <>
          <p className="w-100">{each[referenceCol.clientName]}</p>
          <p>
            Code : <span>{each[referenceCol.clientCode]}</span>
          </p>
        </>
      );
    }
    if (filterCode === "version_transform") {
      return (
        <>
          <p className="w-100" title={each.version} aria-label={filterCode}>
            Version - {each.version}
          </p>
        </>
      );
    }
    if (filterCode === "client_name_transform_credentials") {
      return (
        <>
          <p className="w-100 ellipsis" title={each.clientName}>
            {each.clientName}
          </p>
          <p>
            Code :{" "}
            <span className="ellipsis" title={each.clientCode}>
              {each.clientCode}
            </span>
          </p>
        </>
      );
    }
    if (filterCode === "entity_name_transform") {
      return (
        <>
          <span className="w-100">
            <Link
              to={`${anchorRedirect}/${each.id}`}
              className="adh-anchorStyle mb-0 ml-0"
              data-testid="entityName"
            >
              {each[referenceCol.name]}
            </Link>
          </span>
          <p>
            Code : <span>{each[referenceCol.code]}</span>
          </p>
        </>
      );
    }
    if (filterCode === "action-elipses") {
      return (
        <CustomTooltip content="View More" tooltipid={each.client_name}>
          <>
            <button
              type="button"
              data-toggle="collapse"
              aria-label={`View More for ${each.client_name}`}
              aria-expanded={togglePopoverAria}
              className="ellipses noBtnStyle btnEllipses "
              onClick={(e) => {
                togglePopover(e);
              }}
            >
              <aui-icon
                block={false}
                icon="ellipsis"
                svgwidth="20"
                svgheight="20"
              />
            </button>
            <div className="d-none connection-td-wrapper">
              <div className="popoverWrapper">
                <button
                  type="button"
                  className="noBtnStyle"
                  onClick={() => {
                    if (props.tableName === "NATS Credentials") {
                      navigate(
                        `${CONSTANTS.PAGE_ROUTES.NATS_CREDENTIALS_LISTING}/${each.id}`
                      );
                    } else if (props.tableName === "NATS Consumers") {
                      modifyURLOnTabChange(
                        { view: "consumer-details", consumerid: each.id },
                        props.setChangeCompOnView,
                        navigate
                      );
                    } else if (props.tableName === "Enities") {
                      navigate(
                        `${CONSTANTS.PAGE_ROUTES.NATS_ENTITIES_LISTING}/${each.id}`
                      );
                    } else if (!isElipsesPopoverDisabled) {
                      navigate(
                        `${CONSTANTS.PAGE_ROUTES.NATS_STREAM_LISTING}/${each.ID}?tab=stream-details`
                      );
                    }
                  }}
                >
                  View
                </button>

                {/* <button type="button" className="noBtnStyle" onClick={() => {}}>
                  Delete
                </button> */}
              </div>
            </div>
          </>
        </CustomTooltip>
      );
    }

    if (filterCode === "subscription_transform") {
      const subscriptions = getNestedProperty(each, referenceCol);
      /* return renderSubscriptions(subscriptions); */
      return (
        <TagsTableDataComp
          tagData={subscriptions}
          id={each.ID ? each.ID : each.id}
        />
      );
    }
    if (filterCode === "single_tag_transform") {
      return (
        <BadgeTags
          sources={
            each[referenceCol][0] === null ? ["UNMAPPED"] : each[referenceCol]
          }
        />
      );
    }
    if (filterCode === "password") {
      return (
        <div className="d-flex align-items-center w-100">
          <p className="star-content">***************</p>

          <button
            type="button"
            className="noBtnStyle d-flex"
            aria-label={`Copy ${each.password}'s access key`}
            onClick={() => {
              copyToClipBoard(each.password);
              setSecret("Copied");
            }}
            onKeyUp={(e) => {
              if (e.key === "Enter" || e.key === "Spacebar") {
                copyToClipBoard(each.password);
                setSecret("Copied");
              }
            }}
          >
            <div className="tooltip-role viewOnly">
              <CustomTooltip tooltipid={each.password} content={copySecret}>
                <img
                  className="helpTextStyles"
                  alt="Copy Icon"
                  src="../images/Icons-copy.svg"
                />
              </CustomTooltip>
            </div>
          </button>
        </div>
      );
    }

    const typeValue = getNestedProperty(each, filterCode);

    const createURLforRedirect = () => {
      if (name === "Stream Name") {
        const baseUrlPrepend = `${anchorRedirect}/${
          each.ID ? each.ID : each.id
        }`;
        return `${baseUrlPrepend}${
          name === "Stream Name" ? "?tab=stream-details" : ""
        }`;
      }
      if (name === "Consumer Name") {
        const baseUrlPrepend = `${anchorRedirect}`;
        /* const baseUrlPrepend = `${anchorRedirect}/${
          each.ID ? each.ID : each.id
        }`; */
        return `${
          name === "Consumer Name"
            ? `${baseUrlPrepend}?tab=consumers-listing&view=consumer-details&consumerid=${each.id}`
            : ""
        }`;
      }
      if (name === "Username") {
        return `${anchorRedirect}/${each.id}`;
      }

      return "";
    };

    if (isAnchor) {
      return (
        <span>
          <Link
            to={createURLforRedirect()}
            className="adh-anchorStyle mb-0 ml-0"
            data-testid="userName"
          >
            {typeValue}
          </Link>
        </span>
      );
    }

    return (
      <p className="ellipsis" title={typeValue} aria-label={filterCode}>
        {typeValue}
      </p>
    );
  };

  return (
    <TableStylesWrapper>
      {/* Table Loading State */}
      {props.isTableLoading && (
        <table
          className="aui-responsive-table aui-table-cols aui-table-loader"
          role="alert"
          aria-live="assertive"
          aria-label="Table is Loading"
          aria-atomic="true"
        >
          <thead className="d-none">
            <tr>
              <th className="sr-only">Loading...</th>
            </tr>
          </thead>
          <tbody className="d-none">
            <tr>
              <td className="sr-only">Loading...</td>
            </tr>
          </tbody>
        </table>
      )}

      {/* Table Data Loaded State */}
      {props.tbodyData?.length !== 0 && !props.isTableLoading && (
        <>
          <span
            className="sr-only-bkp"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            aria-label={`Search results loaded with ${props.tbodyData?.length} records`}
          />
          <aui-table
            type="status"
            loader={props.isTableLoading}
            loadertype="content"
            headerbackground
          >
            <table
              className="aui-responsive-status-table"
              data-testid="custom-table"
            >
              <thead>
                <tr>
                  {props.theadData?.map((header: any) => {
                    return (
                      <th
                        key={header.id}
                        scope="col"
                        className={`${header.clsName}`}
                      >
                        <div className="d-flex aui-th justify-content-between">
                          <div className="placeHolderWrapper tooltip-role">
                            {header.name}
                          </div>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              {!props.isTableLoading && (
                <tbody>
                  {props.tbodyData?.map((tableData: ITableDataProps) => {
                    const statusClassName = "aui-tr-success";
                    /* if (tableData.status === "SUCCESS") {
                    statusClassName = "aui-tr-success";
                  }
                  else if (tableData.status === "FAILURE") {
                    statusClassName = "aui-tr-danger";
                  }
                  else if (tableData.status === "SKIPPED") {
                    statusClassName = "aui-tr-warning";
                  } */
                    return (
                      <tr
                        key={tableData.ID ? tableData.ID : tableData.id}
                        className={statusClassName}
                      >
                        {props?.theadData?.map((theadDataObj: any) => (
                          <td
                            key={theadDataObj.filterCode}
                            data-title={theadDataObj.name}
                          >
                            <div
                              className={`aui-td ${
                                theadDataObj.filterCode === "action-elipses"
                                  ? "aui-td actions-column position-relative client-action pb-4"
                                  : `${theadDataObj.filterCode}`
                              }`}
                            >
                              {generateTdCell(tableData, theadDataObj)}
                            </div>
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              )}
            </table>
          </aui-table>
        </>
      )}

      {/* No Data state */}
      {props.tbodyData?.length === 0 && !props.isTableLoading && (
        <>
          <NoDataComp
            DataList={props.tbodyData}
            Filter
            noDataHeading={props?.noDataCompElement?.noDataHeading}
          />
          {props.noDataCompElement?.noDataMarkup ? (
            props.noDataCompElement?.noDataMarkup
          ) : (
            <div className="d-flex flex-column justify-content-center align-items-center">
              <p>Change the filter options or</p>
              <button
                aria-label="Reload"
                data-testid="clear-filters-btn"
                type="button"
                className="reload-btn"
                onClick={() => {
                  props.clearAllFilterFunc && props.clearAllFilterFunc();
                }}
                onKeyUp={(e) => {
                  if (e.key === "Enter" || e.key === "Spacebar") {
                    props.clearAllFilterFunc && props.clearAllFilterFunc();
                  }
                }}
              >
                <i className="aha-icon-reload" />
                Reload
              </button>
            </div>
          )}
        </>
      )}
    </TableStylesWrapper>
  );
};

export default TableComp;
