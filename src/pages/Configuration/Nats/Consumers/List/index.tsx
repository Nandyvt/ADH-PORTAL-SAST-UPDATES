import React, { useCallback, useEffect, useState } from "react";
import { Wrapper } from "styled";
import NoDataComp from "components/NoData";
import CONSTANTS from "common/constants";
import {
  lowerCaseAllWordsExceptFirstLetters,
  passAuiObject,
  toggleModalStyles,
} from "common/utils";
import { togglePopover } from "pages/Notifications/List/utils";
import {
  keydownToggleNoOfRecordTableFilter,
  toggleNoOfRecordTableFilter,
} from "pages/TransactionalLogs/utils";
import { getStatusAction, updateModalContent } from "pages/Users/util";
import { getMessage } from "components/Modal/util";
import { useForm } from "react-hook-form";
import CustomTooltip from "components/CustomTooltip";
import { NatsConsumerStyles } from "./styled";
import { natsConsumerListMockData } from "./MockupData";
import AddConsumerModalComp from "../AddConsumer";

interface NatsConsumerListData {
  id: number;
  name: string;
  code: string;
  address: string | null;
  description: string;
  isActive: number;
  createdAt: string;
  updatedAt: string;
}

interface IPagination {
  pageNumber: number;
  pageOffset: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  isFirst: number;
  isLast: number;
}

const defaultValues: IPagination = {
  pageNumber: 1,
  pageOffset: 0,
  pageSize: 20,
  totalCount: 0,
  totalPages: 0,
  isFirst: 0,
  isLast: 0,
};

const NatsConsumersList: React.FC = () => {
  const [isTableLoading] = useState<boolean>();

  const [natsConsumerData, setNatsConsumerData] = useState<
    NatsConsumerListData[]
  >([]);

  const [togglePopoverAria] = useState<boolean>();
  const [, setApiStatus] = useState("");
  const [pageSize, setPageSize] = useState<number>(20);
  const [, setPageNumberState] = useState<number>(1);

  const [, setNatsConsumerStatus] = useState("");

  const { handleSubmit } =
    useForm(/* {
    resolver: yupResolver(UISchemaAddClient),
  } */);

  const [, setNatsConsumerId] = useState(0);

  const [, setModalContent] = useState("");

  const [isShown, setIsShown] = useState<boolean>(false);

  const [rangeArr] = useState<any[]>([20, 50, 100]);

  const [pagination, setPagination] = useState(defaultValues);

  const [toggleModal, setToggleModal] = useState(false);

  const toggle = useCallback(() => {
    document.querySelector(".modal-backdrop")?.classList.toggle("show");
    document.querySelector("body")?.classList.toggle("modal-open");
    return setIsShown(!isShown);
  }, [isShown]);

  const statusButtonHandler = (status: boolean, id: number, name: string) => {
    setNatsConsumerStatus(
      status ? CONSTANTS.CLIENT_STATUS.INACTIVE : CONSTANTS.CLIENT_STATUS.ACTIVE
    );
    setNatsConsumerId(id);
    setModalContent(
      updateModalContent(getStatusAction(status ? "active" : "inactive"), name)
    );
    toggle();
  };

  useEffect(() => {
    // mock data for pagination
    setPagination(natsConsumerListMockData._pagination);

    // mock data for nats consumer listing table
    setNatsConsumerData(natsConsumerListMockData?.data?.natsConsumers);
  }, []);

  const columnHeaders = [
    { name: "Client Name", id: 1 },
    { name: "Description", id: 2 },
    { name: "Status", id: 3 },
    { name: "Action", id: 4 },
  ];
  return (
    <Wrapper className="d-flex flex-column loader-baseWidth w-100">
      <NatsConsumerStyles>
        <div className="d-lg-flex mt-xs-4 box">
          <div className="container flex-grow-1 pl-3 no-data-spacing">
            <div className="d-sm-flex flex-grow-1 justify-content-between align-items-baseline mt-3 header-bottom">
              <h1
                className="nats-consumers-heading"
                aria-label="Nats Consumers List"
                data-testid="test-nats-consumer"
              >
                Nats Consumers
              </h1>

              <div className="flex-grow-1 justify-content-between">
                <div className="d-flex align-items-baseline justify-content-end pb-3">
                  <aui-button
                    variant="link-style-arrow"
                    buttontitle="Add NATS Consumers"
                    onClick={(e: React.MouseEvent<HTMLAuiButtonElement>) => {
                      e.preventDefault();
                      toggleModalStyles();
                      setToggleModal(true);
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Table starts */}
            <div className="project-table">
              {isTableLoading && (
                <table
                  className="aui-responsive-table aui-table-cols aui-table-loader"
                  role="alert"
                  aria-live="assertive"
                  aria-label="Table is Loading"
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
              {natsConsumerData.length === 0 && !isTableLoading ? (
                <NoDataComp DataList={natsConsumerData} />
              ) : (
                ""
              )}
              {!isTableLoading && natsConsumerData?.length !== 0 && (
                <aui-table
                  type="status"
                  loader={isTableLoading}
                  loadertype="content"
                >
                  <table className="aui-responsive-status-table">
                    <thead>
                      <tr>
                        {columnHeaders?.map((colHeader) => {
                          return (
                            <th key={colHeader.id} scope="col">
                              <div className="aui-th">{colHeader.name}</div>
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {natsConsumerData?.map((natsConsumer) => {
                        return (
                          <tr
                            key={natsConsumer.id}
                            className={
                              natsConsumer.isActive
                                ? "aui-tr-success"
                                : "aui-tr-deactivated"
                            }
                          >
                            <td data-title="Client Name">
                              <div className="aui-td clientName-column">
                                <button
                                  type="button"
                                  className="adh-anchorStyle text-left mb-0 noBtnStyle pl-0"
                                  onClick={() => {}}
                                >
                                  <span
                                    className="clientnameellipse"
                                    title={natsConsumer.name}
                                  >
                                    {natsConsumer.name}
                                  </span>
                                </button>
                                <p className="mb-0 codestyle">
                                  Code : {natsConsumer.code}
                                </p>
                              </div>
                            </td>
                            <td data-title="Description">
                              <div className="aui-td">
                                <p
                                  className={
                                    natsConsumer.description
                                      ? "mb-0"
                                      : "mb-0 sr-only-bkp noDataDesc"
                                  }
                                  aria-label={
                                    natsConsumer.description
                                      ? natsConsumer.description
                                      : "No Data"
                                  }
                                >
                                  {natsConsumer.description
                                    ? natsConsumer.description
                                    : "-"}
                                </p>
                              </div>
                            </td>
                            <td data-title="Status">
                              <div className="aui-td">
                                {natsConsumer.isActive
                                  ? lowerCaseAllWordsExceptFirstLetters(
                                      CONSTANTS.CLIENT_STATUS.ACTIVE
                                    )
                                  : lowerCaseAllWordsExceptFirstLetters(
                                      CONSTANTS.CLIENT_STATUS.INACTIVE
                                    )}
                              </div>
                            </td>
                            <td data-title="Action">
                              <div className="aui-td actions-column position-relative client-action pb-4">
                                <CustomTooltip
                                  tooltipid="natsConsumer-viewMore"
                                  content="View More"
                                >
                                  <>
                                    <button
                                      type="button"
                                      data-toggle="collapse"
                                      aria-label={`View More for ${natsConsumer.name}`}
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
                                      <div className="d-flex flex-column align-items-start popoverWrapper">
                                        <button
                                          type="button"
                                          className="noBtnStyle mb-3"
                                          onClick={() => {}}
                                        >
                                          View
                                        </button>

                                        <button
                                          type="button"
                                          className="noBtnStyle mb-3"
                                          onClick={() => {
                                            setApiStatus("status");
                                            statusButtonHandler(
                                              Boolean(natsConsumer.isActive),
                                              natsConsumer.id,
                                              natsConsumer.name
                                            );
                                          }}
                                        >
                                          {getStatusAction(
                                            natsConsumer.isActive
                                              ? "active"
                                              : "inactive"
                                          )}
                                        </button>
                                        <button
                                          type="button"
                                          className="noBtnStyle"
                                          onClick={() => {
                                            setApiStatus("delete");
                                            setNatsConsumerId(natsConsumer.id);
                                            setModalContent(
                                              updateModalContent(
                                                getStatusAction(""),
                                                natsConsumer.name
                                              )
                                            );
                                            getMessage(getStatusAction(""));
                                            toggle();
                                          }}
                                        >
                                          Delete
                                        </button>
                                      </div>
                                    </div>
                                  </>
                                </CustomTooltip>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </aui-table>
              )}
              <div className="row justify-content-center filterhead">
                {!isTableLoading && natsConsumerData.length > 0 && (
                  <>
                    <div className="col-sm-5 mr-auto page-number filterHeaderChildElement filterheadchild">
                      Show &nbsp;<span className="boldCount">{pageSize}</span>
                      <div className="svg-parent position-relative">
                        <label
                          htmlFor="pagenumberitems"
                          className="position-absolute invisible-cls"
                        >
                          pagenumberitems
                          <input
                            type="text"
                            id="pagenumberitems"
                            className="position-absolute invisible-cls"
                            data-testid="pagenumberitems"
                            tabIndex={-1}
                          />
                        </label>
                        <div
                          className="keydown-recordfilter d-inline-block"
                          onKeyDown={keydownToggleNoOfRecordTableFilter}
                          tabIndex={0}
                          onClick={toggleNoOfRecordTableFilter}
                          aria-label={`${pageSize} number of items is displayed in one page`}
                          role="combobox"
                          aria-controls="pagelistitems"
                          aria-expanded="false"
                          aria-haspopup="listbox"
                        >
                          <i className="aha-icon-down-arrow-thin" />
                        </div>
                        <div
                          className="page-sort position-absolute m-0 d-none pagecontent-filter"
                          id="pagelistitems"
                          role="listbox"
                          aria-label="filter"
                        >
                          {rangeArr.map((item, index) => {
                            const key = `${index}_${item}`;
                            return (
                              <div
                                key={key}
                                role="option"
                                tabIndex={0}
                                aria-selected="true"
                                className={pageSize === item ? "active" : ""}
                                onKeyUp={(e: any) => {
                                  if (
                                    e.keyCode === CONSTANTS.KEY_ENTER ||
                                    e.keyCode === CONSTANTS.KEY_SPACEBAR
                                  ) {
                                    setPageSize(item);
                                    setPageNumberState(1);
                                    e.currentTarget.classList.toggle("active");
                                  }
                                }}
                                onClick={(e) => {
                                  setPageSize(item);
                                  setPageNumberState(1);
                                  e.currentTarget.classList.toggle("active");
                                }}
                              >
                                {item}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      items of {pagination.totalCount}
                    </div>
                    <div className="mr-2 mr-xs-1">
                      <aui-pagination
                        inputdata={passAuiObject(pagination)}
                        alignment="end"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <AddConsumerModalComp
          setToggleModal={setToggleModal}
          toggleModal={toggleModal}
          handleSubmit={handleSubmit}
        />
      </NatsConsumerStyles>
    </Wrapper>
  );
};

export default NatsConsumersList;
