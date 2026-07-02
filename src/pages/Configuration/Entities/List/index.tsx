import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import TableComp from "components/Table";
import ShowNumberOfRecordsNatsComp from "components/ShowNumberOfRecordsNats";
import { clearAUIValue, passAuiObject } from "common/utils";
import CONSTANTS from "common/constants";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import store from "app/store";
import {
  setClearFilter,
  setPageNumber,
  setPageSize,
  IEntityListFilter,
} from "pages/Configuration/common/Entities.slice";
import { fetchEntities } from "services/api/entities.api";
import useClearFiltersOnNavigation from "pages/Configuration/common/useRetainFiltersOnNavigation";
import { EntitiesStyled } from "./styled";
import EntitiesListFilters from "./Filters";

interface ITablecolumnHeaders {
  name?: string;
  id?: number;
  sortable?: boolean;
  clsName?: string;
  filterSupport?: boolean;
  filterCode?: string;
  referenceCol?: any;
  isAnchor?: boolean;
  anchorRedirect?: string;
}

const EntitiesList: React.FC = () => {
  const navigate = useNavigate();

  /* Loading default values from store */
  const defaultQueryParamsAPIStore: IEntityListFilter = useSelector(
    (state: any) => state.entity.entityListFilters
  );

  const searchFieldRef = useRef<HTMLAuiInputElement>(null);
  const clientFilterRef = useRef<HTMLAuiDropdownElement>(null);

  const [popoverSearchErrorMsg, setPopoverSearchErrorMsg] =
    useState<boolean>(false);

  // Customize Table Columns
  const [columnHeaders] = useState<ITablecolumnHeaders[]>([
    {
      name: "Name / Code",
      id: 1,
      clsName: "entity-header",
      filterCode: "entity_name_transform",
      anchorRedirect: CONSTANTS.PAGE_ROUTES.VIEW_ENTITY,
      referenceCol: {
        name: "name",
        code: "code",
      },
    },
    {
      name: "Sources",
      id: 2,
      clsName: "sources-header",
      filterCode: "single_tag_transform",
      referenceCol: "sources",
    },
    {
      name: "Version",
      id: 3,
      clsName: "version-header",
      filterCode: "version_transform",
    },
    {
      name: "Action",
      id: 4,
      clsName: "action-header",
      filterCode: "action-elipses",
    },
  ]);

  const {
    data: entityListData,
    refetch,
    isFetching: loading,
  } = useQuery("entity-list", () => fetchEntities(defaultQueryParamsAPIStore), {
    select: (data) => {
      return {
        entities: data?.data?.entities,
        paginationData: {
          ...data._pagination,
          isFirst: Boolean(data._pagination.isFirst),
          isLast: Boolean(data._pagination.isLast),
        },
      };
    },
    onSuccess: (data: any) => {
      if (data?.entities?.length === 0 && searchFieldRef?.current?.value) {
        setPopoverSearchErrorMsg(true);

        setTimeout(() => {
          setPopoverSearchErrorMsg(false);
        }, 6000);
      }
    },
  });

  const { entities, paginationData } = entityListData || {};

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
    defaultQueryParamsAPIStore.pageSize,
    defaultQueryParamsAPIStore.pageNumber,
    defaultQueryParamsAPIStore.search,
    defaultQueryParamsAPIStore.source,
  ]);

  const [reset, setReset] = useState<boolean>(false);
  const handleClearAllFilters = () => {
    if (searchFieldRef?.current) {
      clearAUIValue(searchFieldRef);
    }

    handleChangeNumOfRecords(20);
    setReset(!reset);

    // Resetting Query Params
    if (clientFilterRef?.current) {
      clearAUIValue(clientFilterRef);
    }
    store.dispatch(setClearFilter());
  };

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
  const basePath = "/configuration/entities";
  const clearFilterForUrlsPaths = ["/configuration/entities/add"];

  /* custom hook to clear filters on navigation */
  useClearFiltersOnNavigation({
    basePath,
    handleClearAllFilters,
    clearFilterForUrlsPaths,
  });

  /* Retain Filters section - end */

  return (
    <EntitiesStyled>
      {/* Heading Comp Code */}
      <div className="header">
        <h1>Entities</h1>
        <aui-button
          id="add-entity-btn"
          buttontitle={CONSTANTS.BREADCRUMB_HEADING.ADD_ENTITY}
          buttonclass="aui-modal-launch"
          className="aui-modal-launch"
          variant="link-style-arrow"
          onClick={(e: any) => {
            e.preventDefault();
            navigate(CONSTANTS.PAGE_ROUTES.ADD_ENTITY);
          }}
        />
      </div>

      {/* Search Filter */}
      <EntitiesListFilters
        searchValue={defaultQueryParamsAPIStore?.search}
        clientCodeValue={defaultQueryParamsAPIStore?.source}
        clientLabelValue={defaultQueryParamsAPIStore?.clientLabel}
        searchError={popoverSearchErrorMsg}
        searchFieldRef={searchFieldRef}
        clientFilterRef={clientFilterRef}
        handleClearAllFilters={handleClearAllFilters}
      />

      {/* Table Component */}
      <div className="container p-lg-0">
        <TableComp
          theadData={columnHeaders}
          tbodyData={entities}
          isTableLoading={loading}
          clearAllFilterFunc={handleClearAllFilters}
          tableName="Enities"
        />
      </div>

      {/* Show Records and Pagination Section */}
      <div className="heading-lbl-wrapper mt-4 pagination-sec d-flex flex-wrap justify-content-between">
        {entities?.length > 0 && (
          <ShowNumberOfRecordsNatsComp
            totalCount={paginationData?.totalCount}
            onChangeFunc={handleChangeNumOfRecords}
            reset={reset}
          />
        )}

        {/* AUI v2 Pagination Component */}
        {entities?.length > 0 && !loading && (
          <div className="col-8 pr-0">
            <aui-pagination
              inputdata={passAuiObject(paginationData)}
              alignment="end"
            />
          </div>
        )}
      </div>
    </EntitiesStyled>
  );
};

export default EntitiesList;
