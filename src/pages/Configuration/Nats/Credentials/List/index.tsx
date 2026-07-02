import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useQuery } from "react-query";
import { ListNatsCredentials } from "services/api/natsCredentials.api";
import TableComp from "components/Table";
import ShowNumberOfRecordsNatsComp from "components/ShowNumberOfRecordsNats";
import { passAuiObject, clearAUIValue } from "common/utils";
import CONSTANTS from "common/constants";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  ICredentialsFilter,
  setClearFilter,
  setPageNumber,
  setPageSize,
} from "pages/Configuration/common/Credentials.slice";
import store from "app/store";
import useClearFiltersOnNavigation from "pages/Configuration/common/useRetainFiltersOnNavigation";
import { NatsCredentialsStyled } from "./styled";
import CredentialListFilters from "./Filters";

interface ITablecolumnHeaders {
  name?: string;
  id?: number;
  sortable?: boolean;
  clsName?: string;
  filterSupport?: boolean;
  filterCode?: string;
  isAnchor?: boolean;
  anchorRedirect?: string;
  isDisabled?: boolean;
}

const NatsCredentialsList: React.FC = () => {
  const navigate = useNavigate();

  const credentialsListStoreData: ICredentialsFilter = useSelector(
    (state: any) => {
      return state?.credentialList?.credentialsFilters;
    }
  );
  const searchFieldRef = useRef<HTMLAuiInputElement>(null);
  const clientFilterRef = useRef<HTMLAuiDropdownElement>(null);

  const [popoverSearchErrorMsg, setPopoverSearchErrorMsg] =
    useState<boolean>(false);

  // Customize Table Columns
  const [columnHeaders] = useState<ITablecolumnHeaders[]>([
    {
      name: "Username",
      id: 1,
      clsName: "username-header",
      filterCode: "username",
      isAnchor: true,
      anchorRedirect: CONSTANTS.PAGE_ROUTES.NATS_CREDENTIALS_LISTING,
    },
    {
      name: "Password",
      id: 2,
      clsName: "password-header",
      filterCode: "password",
    },
    {
      name: "Client",
      id: 3,
      clsName: "client-header",
      filterCode: "client_name_transform_credentials",
    },
    {
      name: "Reporting Subject",
      id: 4,
      clsName: "reportingSubject-header",
      filterCode: "reportingSubject",
    },
    {
      name: "Action",
      id: 5,
      clsName: "action-header",
      filterCode: "action-elipses",
    },
  ]);

  const {
    data: credentials,
    refetch,
    isFetching: loading,
  } = useQuery(
    "credential-list",
    () => ListNatsCredentials(credentialsListStoreData),
    {
      select: (data) => {
        return {
          credentialsListData: data?.data?.data,
          paginationData: {
            ...data._pagination,
            isFirst: Boolean(data._pagination.isFirst),
            isLast: Boolean(data._pagination.isLast),
          },
        };
      },
      onSuccess: (data: any) => {
        if (
          data?.CredentialsListData?.length === 0 &&
          searchFieldRef?.current?.value
        ) {
          setPopoverSearchErrorMsg(true);

          setTimeout(() => {
            setPopoverSearchErrorMsg(false);
          }, 6000);
        }
      },
    }
  );

  const { credentialsListData, paginationData } = credentials || {};

  const handleChangeNumOfRecords = (pageSizeSelected: number) => {
    store.dispatch(setPageSize(pageSizeSelected));
  };

  const handleChangePagination = (event: any) => {
    store.dispatch(setPageNumber(event.detail));
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    refetch();
  }, [
    credentialsListStoreData?.clientCode,
    credentialsListStoreData?.search,
    credentialsListStoreData?.pageNumber,
    credentialsListStoreData?.pageSize,
  ]);

  const [reset, setReset] = useState(false);
  const handleClearAllFilters = useCallback(() => {
    if (searchFieldRef?.current) {
      clearAUIValue(searchFieldRef);
    }

    setReset(!reset);
    handleChangeNumOfRecords(20);

    // Resetting Query Params
    if (clientFilterRef?.current) {
      clearAUIValue(clientFilterRef);
    }
    store.dispatch(setClearFilter());
  }, [[searchFieldRef, clientFilterRef]]);

  useEffect(() => {
    window.addEventListener(
      CONSTANTS.AUI_CUSTOM_EVENTS.PAGINATION_CHANGE,
      handleChangePagination
    );
    return () => {
      /* cleanup */
      window.removeEventListener(
        CONSTANTS.AUI_CUSTOM_EVENTS.PAGINATION_CHANGE,
        handleChangePagination
      );
    };
  }, []);

  /* Retain Filters section - start */
  const basePath = "/configuration/nats-credentials";
  const clearFilterForUrlsPaths = useMemo(
    () => ["/configuration/nats-credentials/add"],
    []
  );
  /* custom hook to clear filters on navigation */
  useClearFiltersOnNavigation({
    basePath,
    handleClearAllFilters,
    clearFilterForUrlsPaths,
  });

  /* Retain Filters section - end */

  return (
    <NatsCredentialsStyled>
      {/* Heading Comp Code */}
      <div className="header">
        <h1>NATS Credentials</h1>
        <aui-button
          id="add-nats-credentials-btn"
          buttontitle="Add NATS Credentials"
          buttonclass="aui-modal-launch"
          className="aui-modal-launch"
          variant="link-style-arrow"
          data-testid="add-nats-credentials-btn"
          onClick={(e: React.MouseEvent<HTMLAuiButtonElement>) => {
            e.preventDefault();
            navigate(CONSTANTS.PAGE_ROUTES.NATS_CREDENTIALS_CREATE);
          }}
        />
      </div>

      {/* Search Filter */}

      <CredentialListFilters
        searchValue={credentialsListStoreData?.search}
        clientCodeValue={credentialsListStoreData?.clientCode}
        clientLabelValue={credentialsListStoreData?.clientLabel}
        searchError={popoverSearchErrorMsg}
        searchFieldRef={searchFieldRef}
        clientFilterRef={clientFilterRef}
        clearAllFilterFunc={handleClearAllFilters}
      />

      {/* Table Component */}
      <div className="container p-lg-0">
        <TableComp
          theadData={columnHeaders}
          tbodyData={credentialsListData}
          isTableLoading={loading}
          clearAllFilterFunc={handleClearAllFilters}
          tableName="NATS Credentials"
        />
      </div>

      {/* Show Records and Pagination Section */}
      <div className="heading-lbl-wrapper mt-4 pagination-sec d-flex flex-wrap justify-content-between">
        {credentialsListData?.length > 0 && (
          <ShowNumberOfRecordsNatsComp
            totalCount={paginationData?.totalCount}
            onChangeFunc={handleChangeNumOfRecords}
            reset={reset}
          />
        )}

        {/* AUI v2 Pagination Component */}
        {credentialsListData?.length > 0 && !loading && (
          <div className="col-8 pr-0">
            <aui-pagination
              inputdata={passAuiObject(paginationData)}
              alignment="end"
            />
          </div>
        )}
      </div>
    </NatsCredentialsStyled>
  );
};

export default NatsCredentialsList;
