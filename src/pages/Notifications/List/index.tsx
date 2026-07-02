import CONSTANTS from "common/constants";
import { toggleModalStyles, passAuiObject } from "common/utils";
import NoDataComp from "components/NoData";
import React, { useEffect, useState } from "react";
import { NotificationsListService } from "services/api/notification.api";
import CustomTooltip from "components/CustomTooltip";
import PaginationSettings from "./PaginationSettings";
import SettingsModal from "./SettingsModal";
import NotificationsListWrapper from "./styled";
import {
  defaultValues,
  filtersLabel,
  highlightFilter,
  togglePopover,
} from "./utils";

const tableHeaderNames = [
  { name: "Client Name", id: 1 },
  { name: "Type", id: 2 },
  { name: "Action", id: 3 },
];

const NotificationsList: React.FunctionComponent = () => {
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [type, setType] = useState<string>("SMS,EMAIL,HTTP");
  const [pageSize, setPageSize] = useState<number>(20);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pagination, setPagination] = useState(defaultValues);
  const [notifications, setNotifications] = useState<any>([]);
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const [selectedClient, setSelectedClient] = useState<any>({});
  const [popoverEvent, setPopoverEvent] = useState<any>();

  const [apiRespFlag, setApiRespFlag] = useState(false);

  useEffect(() => {
    setLoading(true);

    NotificationsListService({
      pageSize,
      pageNumber,
      type,
    })
      .then((response: any) => {
        if (response && response.data.clients === null) {
          setLoading(false);
          setPagination(defaultValues);
          setNotifications(response.data.clients);
        } else {
          setLoading(false);
          setNotifications(response.data.clients);
          setApiRespFlag(true);
          setPagination({
            ...response._pagination,
            isFirst: Boolean(response._pagination?.isFirst),
            isLast: Boolean(response._pagination?.isLast),
          });
        }
      })
      .catch();
  }, [pageSize, pageNumber, type, refresh]);

  const paginationOnChange = (event: any) => {
    setPageNumber(event.detail);
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    window.addEventListener(
      CONSTANTS.AUI_CUSTOM_EVENTS.PAGINATION_CHANGE,
      paginationOnChange
    );
    filtersLabel.forEach((item: any) => {
      item.isSelected = false;
    });
    return () =>
      window.removeEventListener(
        CONSTANTS.AUI_CUSTOM_EVENTS.PAGINATION_CHANGE,

        paginationOnChange
      );
  }, []);

  const setMultiSelectFunc = () => {
    const filerOutput = filtersLabel
      .filter((item: any) => item.isSelected)
      .map((filterItem: any) => filterItem.name.toUpperCase());

    setType(filerOutput.join(","));
    setPageNumber(1);
  };
  return (
    <NotificationsListWrapper>
      <div className="container">
        <h1
          data-testid="test-heading"
          className="notifications pt-3 pb-3 d-block header-bottom"
        >
          Notifications
        </h1>
        {/* Filter HTML */}
        <div className="d-flex mb-3 align-items-center tagSpacing">
          {filtersLabel.map((item, index) => (
            <div className="pr-3 mb-4" key={item.id}>
              <button
                aria-label={`${item.name} multiselect ${
                  filtersLabel[index].isSelected ? "Selected" : "Not Selected"
                }`}
                data-testid="multiselect-test"
                type="button"
                className={`button-text ml-0 ${
                  item.isSelected ? "selected-filter" : "default-color"
                }`}
                onClick={(event: any) => {
                  filtersLabel[index].isSelected =
                    !filtersLabel[index].isSelected;

                  setMultiSelectFunc();

                  highlightFilter(event, filtersLabel[index].isSelected);
                }}
              >
                {item.name}
              </button>
            </div>
          ))}
        </div>

        <div />
        {loading ? (
          <table
            className="aui-responsive-table aui-table-cols aui-table-loader"
            role="alert"
            aria-live="assertive"
            aria-label={`Table is Loading for ${
              type?.length > 0 ? type : "all"
            } notification`}
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
        ) : (
          <>
            <aui-table type="status" loader={loading} loadertype="content">
              <table className="aui-responsive-status-table">
                {notifications?.length !== 0 ? (
                  <thead>
                    <tr>
                      {tableHeaderNames?.map((colHeader) => {
                        return (
                          <th key={colHeader.id} scope="col">
                            <div className="aui-th">{colHeader.name}</div>
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                ) : null}

                <tbody>
                  {notifications?.map((notification: any) => (
                    <tr
                      className={
                        notification.is_active
                          ? "aui-table-status-red"
                          : "aui-table-status-grey"
                      }
                      key={notification.id}
                    >
                      <td data-title="Client Name">
                        <div className="aui-td">
                          <p className="mb-0 name-col">{notification.name}</p>
                        </div>
                      </td>
                      <td data-title="Type">
                        <div className="aui-td">
                          <ul className="d-flex type-col p-0 m-0">
                            {notification.types?.map((item: any) =>
                              item.status === CONSTANTS.ROLE_STATUS.INACTIVE ? (
                                <li
                                  className="disabled-icon tooltip-role"
                                  key={item.id}
                                >
                                  {item.type}
                                  <i className="helpTextStyles aha-icon-stop pl-1" />
                                  <span className="tooltiptext ">Inactive</span>
                                </li>
                              ) : (
                                <li className="type-col" key={item.id}>
                                  {item.type}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </td>
                      <td
                        data-title="Action"
                        className="justify-content-center"
                      >
                        <div className="aui-td justify-content-center position-relative client-action">
                          {notification.is_active !== 0 && (
                            <CustomTooltip
                              tooltipid="viewMore"
                              content="View More"
                              styleProps={{ marginBottom: "15px" }}
                            >
                              <>
                                <button
                                  type="button"
                                  data-toggle="collapse"
                                  aria-label="View More"
                                  data-testid="view-more"
                                  className="ellipses noBtnStyle btnEllipses"
                                  onClick={(e) => {
                                    togglePopover(e);
                                    setPopoverEvent(e);
                                  }}
                                >
                                  <i className="aha-icon-meat-balls" />
                                </button>
                                <div className="d-none connection-td-wrapper">
                                  <div className="d-flex flex-column align-items-start popoverWrapper">
                                    <button
                                      aria-label="settingbutton"
                                      type="button"
                                      className="noBtnStyle"
                                      onClick={() => {
                                        setSelectedClient(notification);
                                        setToggleModal(true);
                                        toggleModalStyles();
                                      }}
                                    >
                                      Settings
                                    </button>
                                  </div>
                                </div>
                              </>
                            </CustomTooltip>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </aui-table>
            <div className="row filterhead">
              <div className="col-sm-5 mr-auto page-number filterHeaderChildElement filterheadchild">
                <PaginationSettings
                  setPageSize={setPageSize}
                  pageSize={pageSize}
                  totalCounts={pagination.totalCount}
                  setPageNumber={setPageNumber}
                />
              </div>
              <div className=" mr-2 mr-xs-1 ">
                {/* AUI v2 Pagination Component */}
                <aui-pagination
                  inputdata={passAuiObject(pagination)}
                  alignment="end"
                />
              </div>
            </div>
          </>
        )}
        {apiRespFlag && notifications?.length === 0 && !loading ? (
          <NoDataComp DataList={notifications} />
        ) : (
          ""
        )}

        <SettingsModal
          setRefresh={setRefresh}
          refresh={refresh}
          selectedClient={selectedClient}
          setToggleModal={setToggleModal}
          toggleModal={toggleModal}
          popoverEvent={popoverEvent}
        />
      </div>
    </NotificationsListWrapper>
  );
};

export default NotificationsList;
