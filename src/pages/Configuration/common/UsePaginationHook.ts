import store from "app/store";
import CONSTANTS from "common/constants";
import { useEffect } from "react";

const UsePagination = (setPageNumberSliceFun: any) => {
  useEffect(() => {
    const handleChangePagination = (event: any) => {
      const newPageNumber = event.detail;
      store.dispatch(setPageNumberSliceFun(newPageNumber));
    };

    window.addEventListener(
      CONSTANTS.AUI_CUSTOM_EVENTS.PAGINATION_CHANGE,
      handleChangePagination
    );

    return () => {
      window.removeEventListener(
        CONSTANTS.AUI_CUSTOM_EVENTS.PAGINATION_CHANGE,
        handleChangePagination
      );
    };
  }, []);

  /*  return pageNumber; */
};

export default UsePagination;
