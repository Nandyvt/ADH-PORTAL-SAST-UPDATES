import CONSTANTS from "common/constants";
import FileSaver from "file-saver";
import * as XLSX from "xlsx";

export const keydownToggleNoOfRecordTableFilter = (e: any) => {
  if (
    e.keyCode === CONSTANTS.KEY_ENTER ||
    e.keyCode === CONSTANTS.KEY_SPACEBAR
  ) {
    e.stopPropagation();
    e.preventDefault();
    e.currentTarget.nextSibling.classList.toggle("visible_cls");
    e.currentTarget.nextSibling.classList.contains("visible_cls") === true
      ? e.currentTarget.setAttribute("aria-expanded", "true")
      : e.currentTarget.setAttribute("aria-expanded", "false");
  }
};

export const toggleNoOfRecordTableFilter = (e: any) => {
  e.currentTarget.nextSibling.classList.toggle("visible_cls");
  if (window.outerWidth > 991) {
    const gridIconStatus = document.querySelectorAll<any>(
      ".custTableWrapper img"
    )[0];
    if (!gridIconStatus.nextSibling.classList.contains("d-none")) {
      gridIconStatus.click();
    }
    document
      .querySelectorAll<any>(".placeHolderWrapper img")
      .forEach((item, index) => {
        if (!item.nextSibling.classList.contains("d-none")) {
          item.click();
        }
      });
  } else if (window.outerWidth < 992) {
    const gridIconStatusMobile = document.querySelectorAll<any>(
      ".custTableWrapper .column-table"
    )[0];

    if (!gridIconStatusMobile.nextSibling.classList.contains("d-none")) {
      gridIconStatusMobile.click();
    }
    document
      .querySelectorAll<any>(".placeHolderWrapper img")
      .forEach((item, index) => {
        if (!item.nextSibling.classList.contains("d-none")) {
          item.click();
        }
      });
  }
  e.currentTarget.classList.toggle("rotateArrow");
};

export const clearDatePickerVal = () => {
  // DOM manipulation needed here as plugin doesnot support refs
  document.querySelector<any>(".rs-picker-toggle-clean")?.click();
};

// EXPORT FUNCTIONALITY
export const exportToCSV = (csvData: any, fileName: string) => {
  const ws = XLSX.utils.json_to_sheet(csvData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Transactional Logs");
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const data = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(data, `${fileName}.xlsx`, { autoBom: false });
};

// FILTER FUNCTIONALITY
export const generateOptions = (options: any) => {
  const arrayVal = options?.map((option: any) => {
    return {
      label: `${option}`,
      value: `${option}`,
    };
  });
  return arrayVal && arrayVal[0]?.label === "" ? "" : arrayVal;
};

export const generateOptionsEntityName = (options: any) => {
  const arrayVal = options?.map((option: any) => {
    return {
      label: `${option}`,
      value: `${option}`,
    };
  });
  return arrayVal?.filter((item: any) => item?.label !== "") || [];
};

export const toggleDatePicker = () => {
  if (document.querySelector<any>(".rs-picker-daterange-menu") === null) {
    document.querySelector<any>(".rs-picker.rs-picker-daterange").click();
  } else {
    document
      .querySelector<any>(".rs-picker-daterange-menu")
      .classList.add("d-none");
  }
};

export const searchByMapping: any = {
  id: "Transaction ID",
  message: "Error Message",
  code: "Organization Code",
  email: "Email",
};
export interface SearchParamObject {
  id: string;
  message: string;
  code: string;
  email: string;
}
export const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  const months: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month: string = months[date.getMonth()];
  const day: number = date.getDate();
  const hours: number = date.getHours();
  const minutes: number = date.getMinutes();
  const ampm: string = hours >= 12 ? "PM" : "AM";
  const formattedHours: number = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes: string =
    minutes < 10 ? `0${minutes}` : minutes.toString();
  return `${month} ${day}, ${formattedHours}:${formattedMinutes} ${ampm}`;
};
