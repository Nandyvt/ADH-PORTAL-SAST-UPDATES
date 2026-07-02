/* eslint-disable prefer-destructuring */
import { setAhaSsoAccessToken } from "app/hooks/auth/auth.slice";
import { ahaSsoLogout } from "app/hooks/auth/authManager";
import store from "app/store";
import { setAhaSsoUser } from "app/user.slice";
import { useSelector } from "react-redux";
import SignOutApi from "services/api/Signout.api";
import { useEffect } from "react";
import CONSTANTS from "./constants";
import { logger } from "./utils/logger.utils";

export async function sleep(time: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
}

export function validJSON(JSONString: string) {
  try {
    JSON.parse(JSONString);
    return true;
  } catch (e) {
    return false;
  }
}

export const getCurrentQuarter = () => {
  const month = new Date().getMonth();
  if (month < 3) {
    return 1;
  }
  if (month < 6) {
    return 2;
  }
  if (month < 9) {
    return 3;
  }
  return 4;
};

export const getFIleSize = (fileSize: number) => {
  const fSExt = ["Bytes", "KB", "MB", "GB"];
  let i = 0;
  while (fileSize > 900) {
    fileSize /= 1000;
    i += 1;
  }
  return `${Math.round(fileSize * 100) / 100} ${fSExt[i]}`;
};

export const dateToLocaleDateString = (date: string) => {
  return new Date(`${date}`).toLocaleDateString();
};

export const dateToLocaleTimeString = (date: string) => {
  return new Date(`${date}`).toLocaleTimeString();
};

export const checkExpiryJwt = (token: any) => {
  const currentTime = new Date().getTime();
  if (token.exp * 1000 < currentTime) {
    /* expired */
    return true;
  }
  return false;
};

export const lowerCaseAllWordsExceptFirstLetters = (string: string) => {
  return string.replace(/\S*/g, (word) => {
    return word.charAt(0) + word.slice(1).toLowerCase();
  });
};

export const firstLetterCaps = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const removeAllSpecialChar = (string: string) => {
  return string?.replace(/[^a-zA-Z\s]/g, "");
};

export const parseJwt = (token: any) => {
  const base64Url = token?.split(".")[1];
  const base64 = base64Url?.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => {
        const charCode = c.charCodeAt(0).toString(16);
        const paddedHex = charCode.padStart(2, "0");
        return `%${paddedHex}`;
      })
      .join("")
  );
  const isTokenExpired = checkExpiryJwt(JSON.parse(jsonPayload));
  const parsedJWT = JSON.parse(jsonPayload);
  return { isTokenExpired, parsedJWT };
};

export const rotateElipses = (btncls: string, e: any) => {
  Array.from(document.querySelectorAll(btncls)).forEach((el) => {
    if (e.currentTarget === el) {
      if (el.classList.contains("rotate-90")) {
        el.classList.remove("rotate-90");
        el.classList.toggle("rotate-90-anti");
      } else if (el.classList.contains("rotate-90-anti")) {
        el.classList.remove("rotate-90-anti");
        el.classList.toggle("rotate-90");
      } else {
        el.classList.toggle("rotate-90");
      }
    } else {
      el.classList.remove("rotate-90");
    }
  });
};
export function getMainIcon(action: string) {
  let iconName = "";
  switch (action.toLocaleLowerCase()) {
    case "activate":
      iconName = "Unlock";
      break;
    case "deactivate":
      iconName = "Lock";
      break;
    case "delete":
      iconName = "LockDelete";
      break;
    default:
      iconName = "Lock";
  }
  return iconName;
}

// eg: "2020-01-01T00:00:00Z" to "Jan 01, 2020"
export const formatDate = (dateString: string, dateFormat: string): any => {
  if (!dateString) {
    return null;
  }
  const date = new Date(`${dateString}`);
  const strArray = [
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
  const d = date.getDate();
  const m = strArray[date.getMonth()];
  const y = date.getFullYear();
  if (dateFormat === "time-minute") {
    const timeWithoutSecond = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const paddedDay = d <= 9 ? `0${d}` : String(d);
    return `${m} ${paddedDay}, ${y} ${timeWithoutSecond}`;
  }
  const timeWithSecond = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const paddedDay = d <= 9 ? `0${d}` : String(d);

  return {
    dateResp: `${m} ${paddedDay}, ${y}`,
    timeResp: timeWithSecond,
  };
};

export const ssouserProfile = () => {
  let userProfile: any;
  try {
    userProfile = JSON.parse(
      sessionStorage.getItem(CONSTANTS.WEB_STORE_KEY) ?? ""
    ).profile;
    userProfile.countryofResidence = JSON.parse(
      userProfile.countryofResidence
    ).Name;
    return userProfile;
  } catch (e) {
    userProfile = {
      photoURL: "/images/avatar.jpg",
      firstName: "NA",
      lastName: "NA",
      countryofResidence: "NA",
      email: "NA",
    };
    return userProfile;
  }
};

export const calculateDynamicSliceCount = (UIElement: any) => {
  let jsMinLeft: any = null;
  let jsRows = 0;
  let checkFound = false;
  document.querySelectorAll(".demo div").forEach((item: any, index: any) => {
    const jsCompareLeft = item.offsetLeft;
    if (jsCompareLeft <= jsMinLeft || jsMinLeft === null) {
      jsRows += 1;
      jsMinLeft = jsCompareLeft;
    }

    if (jsRows === 3 && !checkFound) {
      checkFound = true;
    }
  });
};

export const getXYPosition = (UIElement: any) => {
  const xyPos = { x: 0, y: 0 };
  xyPos.x = UIElement.getBoundingClientRect().x;
  xyPos.y = UIElement.getBoundingClientRect().y + window.scrollY;
  return xyPos;
};

export const getXYPosRelativeToParent = (
  childEle: any,
  parentContainer: any
) => {
  const parentPos = parentContainer.getBoundingClientRect();
  const childPos = childEle.getBoundingClientRect();
  const relativePos: any = { x: 0, y: 0 };

  relativePos.x = childPos.left - parentPos.left;
  relativePos.y = childPos.top - parentPos.top;

  return relativePos;
};

export const getErrorMessage = (error: any, customMsg?: any): string => {
  let message = "";
  // eslint-disable-next-line no-debugger
  debugger;
  if (customMsg?.length > 0) {
    message = customMsg;
    return message;
  }

  if (error?.response?.data?.error?.details?.length > 0) {
    error.response.data.error.details.map((detail: any) => {
      message += `, ${detail.message}`;
      return message;
    });
    // eslint-disable-next-line no-debugger
    debugger;
    if (message.startsWith(",")) {
      message = message.slice(1);
    }
    return message;
  }

  if (error?.response?.data?.error?.message?.length > 0) {
    message = error.response.data.error.message;
    return message;
  }

  if (error?.response?.data?.error?.code?.length > 0) {
    message = error.response.data.error.code;
  }

  return error.message;
};
export function intToString(num: any) {
  num = num.toString().replace(/[^0-9.]/g, "");
  if (num < 1000) {
    return num;
  }
  const si = [
    { v: 1e3, s: "K" },
    { v: 1e6, s: "M" },
    { v: 1e9, s: "B" },
    { v: 1e12, s: "T" },
    { v: 1e15, s: "P" },
    { v: 1e18, s: "E" },
  ];
  let index;
  for (index = si.length - 1; index > 0; index -= 1) {
    if (num >= si[index].v) {
      break;
    }
  }
  return (
    (num / si[index].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") +
    si[index].s
  );
}

// new Date("dateString") is browser-dependent and discouraged, so we'll write
// a simple parse function for U.S. date format (which does no error checking)
export function parseDate(str: any) {
  const mdy = str.split("/");
  return new Date(mdy[2], mdy[0] - 1, mdy[1]);
}

export function datediff(first: any, second: any) {
  // Take the difference between the dates and divide by milliseconds per day.
  // Round to nearest whole number to deal with DST.
  return Math.round((second - first) / (1000 * 60 * 60 * 24));
}

export const generateEllipsesForYAxisValues = (element: any) => {
  if (element?.length > 5) {
    return `${element.slice(0, 5)}...`;
  }
  return `${element}`;
};

export const YaxisStyling = (yaxis: any[]) => {
  const YaxisObject: any = [];
  yaxis.forEach((element) => {
    const val = {
      value: element,
    };
    const style = {
      textStyle: {
        fontFamily: "Montserrat",
        fontSize: 14,
        fontWeight: 600,
        lineHeight: 17,
        width: 400,
        color: "#222328",
      },
    };
    const finalObject = {
      ...val,
      ...style,
    };
    YaxisObject.push(finalObject);
  });
  return YaxisObject;
};

export const closeModalPopup = (modalId: any) => {
  // get modal
  const modal = document.querySelector<any>(modalId);

  // change state like in hidden modal
  modal.classList.toggle("show");
  modal.setAttribute("aria-hidden", "true");
  modal.setAttribute("style", "display: none");

  document.querySelector<any>("body").classList.remove("modal-open");
  document.querySelector<any>("body").setAttribute("style", "");
};

export const toggleModalStyles = () => {
  document.querySelector(".modal-backdrop")?.classList.toggle("show");
  document.querySelector("body")?.classList.toggle("modal-open");
};

export const toggleUserActionEllipses = () => {
  document
    .querySelector<any>(".rotate-90 ~ .connection-td-wrapper")
    .classList.remove("d-block");
  document
    .querySelector<any>(".rotate-90 ~.connection-td-wrapper")
    .classList.add("d-none");

  document
    .querySelector<any>(".btnEllipses.rotate-90")
    .classList.remove("rotate-90");
  document.querySelector<any>(".btnEllipses").classList.add("rotate-90-anti");
};

export const toggleServiceCheckboxForAllHttpCheckBoxes = (
  service: any,
  parentContainerCls: any
) => {
  const CheckBoxesForService = document
    .querySelector<any>(`#${service}`)
    .closest(`.${parentContainerCls}`)
    .nextSibling.querySelectorAll('input[type="checkbox"]');

  const allCheckedResult = Array.prototype.every.call(
    CheckBoxesForService,
    (checkedState: any) => {
      return checkedState.checked;
    }
  );

  document.querySelector<any>(`#${service}`).checked = allCheckedResult;
};

export function capitalizeFirstLetter(str: string) {
  if (typeof str === "undefined") return "";
  return str?.charAt(0)?.toUpperCase() + str?.slice(1);
}

export const signOut = async () => {
  await SignOutApi({ accessToken: localStorage.getItem("userToken") })
    .then(() => {})
    .catch(() => {})
    .finally(() => {
      ahaSsoLogout();
    });
};

export const openInNewTab = (url: string): void => {
  const newWindow = window.open(url, "_blank", "noopener,noreferrer");
  if (newWindow) newWindow.opener = null;
};

export const GetAhaUserDetails = () => {
  const ahaStateObject = useSelector((state: any) => {
    return state?.authed?.ahaSsoUser;
  });
  return ahaStateObject;
};

export const setSideMenuToggleStatus = (status: any) => {
  const { parsedJWT } = parseJwt(localStorage.getItem("userToken"));
  localStorage.setItem(`sideMenuToggleStatus-${parsedJWT?.user_id}`, status);
};

export const getSideMenuToggleStatus = () => {
  const { parsedJWT } = parseJwt(localStorage.getItem("userToken"));
  return localStorage.getItem(`sideMenuToggleStatus-${parsedJWT?.user_id}`);
};
export function onUserLoaded(user: any) {
  logger("<---------onUserLoaded------->");
  logger("AHA SSO TOKEN DETAILS: ", user);
  store.dispatch(setAhaSsoUser(user.profile));
  store.dispatch(setAhaSsoAccessToken(user.access_token));
}

export function onUserUnloaded() {
  logger("<---------onUserUnloaded------->");
  store.dispatch(setAhaSsoUser({ user: {} }));
}

export function jsonColorObjectDefault() {
  const defaultColor = "rgba(34, 35, 40)";
  return {
    default: "rgba(34, 35, 40, .85)",
    number: defaultColor,
    colon: "rgba(34, 35, 40, .85)",
    keys: "rgba(34, 35, 40, .85)",
    keys_whiteSpace: "rgba(34, 35, 40, .85)",
    primitive: defaultColor,
    string: defaultColor,
    error: defaultColor,
    background: "#fff",
    background_warning: defaultColor,
  };
}

export const isEllipsisActive = (el: any) => {
  return el?.offsetWidth < el?.scrollWidth;
};

export const UTC2ISOConvertFunc = (dateProp: any) => {
  if (!dateProp) {
    return "";
  }
  const timeZoneOffset = new Date().getTimezoneOffset() * 60000;
  const getOffSetDate = +new Date(decodeURI(dateProp)) - timeZoneOffset;
  const OffSetISOTime = new Date(getOffSetDate).toISOString();
  return OffSetISOTime;
};

function parseDecodeUrlSafeLink(name: any) {
  const Winurl = window.location.href;
  const match = RegExp(`[?&]${name}=([^&]*)`).exec(Winurl);
  return match && decodeURIComponent(match[1].replace(/\+/g, " "));
}

export function getParamsFromURL(demohref: string = "") {
  const urlLocation = window.location.href;
  const cleanUrl =
    decodeURIComponent(decodeURIComponent(urlLocation)).replace(/\+/g, "%20") ??
    "";
  const paramString =
    cleanUrl.match(
      /^([^?]+)\?(.*)$/
    ); /* sonarqube catastrophic backtracking security fix */

  const pathName = window?.location?.pathname;
  if (paramString == null) {
    return { base: cleanUrl, params: null, pathName: null };
  }

  let paramList = [];
  if (paramString[2].includes("&amp;")) {
    paramList = paramString[2].split("&amp;");
  } else {
    paramList = paramString[2].split("&");
  }

  const params: any = {};

  for (let i = 0; i < paramList.length; i += 1) {
    const values = paramList[i].split("=");

    if (values[0] === "status") {
      params.transactionStatus = values[1];
    } else if (values[0] === "startDate" || values[0] === "endDate") {
      params[values[0]] = UTC2ISOConvertFunc(values[1]);
    } else {
      params[values[0]] = values[1];
    }
  }

  const searchParamsUrl = window.location.search;
  return { base: paramString[1], pathName, params, searchParamsUrl };
}

export const passAuiObject = (inputObj: Array<Object> | Object): string => {
  if (inputObj instanceof Array) {
    return JSON.stringify([...inputObj]);
  }
  return JSON.stringify({ ...inputObj });
};

export function AddEventListenerToElement(
  target: EventTarget | null,
  event: string,
  handler: EventListenerOrEventListenerObject
): void {
  useEffect(() => {
    if (target) {
      target.addEventListener(event, handler);

      return () => {
        target.removeEventListener(event, handler);
      };
    }

    // Return an empty function if the target is null
    return () => {};
  }, [target, event, handler]);
}

export const formatOptionsForMultiSelectFilter = (dataArray: any) =>
  dataArray?.map((item: any) => ({
    label: item.name,
    value: item.id,
  }));

interface DropdownItem {
  name: string;
  code: string;
}

export interface DropdownOption {
  label: string;
  value: string;
}

export const formatOptionsForClientDropdown = (
  dataArray: DropdownItem[] = []
): DropdownOption[] => {
  return dataArray.map((item) => ({
    label: item.name,
    value: item.code,
  }));
};

export const setHoursMinutesToZero = (date: Date) => {
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
};

export const getCurrentYear = () => {
  return new Date().getFullYear();
};

/* Accessibility Fixes - start */

const focusOutCommonActionFunc = (
  event: any,
  elipsesTarget: any,
  popoverTarget: any
) => {
  const relatedTarget = event?.relatedTarget || document.activeElement;
  // Check if the related target is not inside the div
  if (
    relatedTarget &&
    !elipsesTarget?.contains(relatedTarget) &&
    !popoverTarget?.contains(relatedTarget) &&
    relatedTarget !== document?.querySelector("body")
  ) {
    if (elipsesTarget) event?.currentTarget?.classList.remove("d-flex");
    popoverTarget?.classList.add("d-none");
    elipsesTarget?.setAttribute("aria-expanded", "false");
  }
};

export const toggleAriaExpandedElipses = (elipsesBtnRef: any) => {
  // toggle aria-expanded
  if (elipsesBtnRef?.getAttribute("aria-expanded") === "false") {
    elipsesBtnRef?.setAttribute("aria-expanded", "true");
  } else {
    elipsesBtnRef?.setAttribute("aria-expanded", "false");
  }
  elipsesBtnRef?.nextSibling?.classList.toggle("d-none");
};

export const closeActionPopoverOnFocusOut = (
  eventParent: any,
  elipsesRef?: any,
  popoverRef?: any
) => {
  /* Accessiility fix */
  const elipsesTarget = elipsesRef || eventParent?.currentTarget;
  const popoverTarget = popoverRef || eventParent?.currentTarget?.nextSibling;

  /* Add focusout event listener for elipses button */
  elipsesTarget?.addEventListener("focusout", (event: any) => {
    focusOutCommonActionFunc(event, elipsesTarget, popoverTarget);
  });

  /* Add focusout event listener for popover */
  popoverTarget?.addEventListener("focusout", (event: any) => {
    focusOutCommonActionFunc(event, elipsesTarget, popoverTarget);
  });

  /* Add keyup event listener for popover for escape to close */
  popoverTarget?.addEventListener("keyup", (event: any) => {
    if (event.key === "Escape") {
      if (elipsesTarget) event.currentTarget?.classList.remove("d-flex");
      event.currentTarget?.classList.add("d-none");
      elipsesTarget?.setAttribute("aria-expanded", "false");
      elipsesTarget?.focus();
    }
  });
};

/* Accessibility Fixes - end */

export const getCurrentDateTime = (customDate: any) => {
  // Create a new Date object for the current date
  const currentDate = new Date();

  const currentDatetime = new Date();

  // Set the time part of the currentDate object to match the currentTime object
  currentDatetime.setHours(currentDate.getHours());
  currentDatetime.setMinutes(currentDate.getMinutes());
  currentDatetime.setSeconds(currentDate.getSeconds());
  currentDatetime.setMilliseconds(0);
  return currentDatetime;
};

export const getCustomDateRange = (
  rangeDays: number,
  beforeCurrentDay: boolean
) => {
  let lastCustomDate;

  if (beforeCurrentDay) {
    lastCustomDate = new Date().getDate() - rangeDays;
  } else {
    lastCustomDate = new Date().getDate() + rangeDays;
  }

  const customDate = new Date(new Date().setDate(lastCustomDate));
  return customDate;
};
// Define types for the styles object
type Styles = {
  [key: string]: string;
};

export const applyStylesToShadowDomElement = (
  shadowHostId: string,
  elementId: string,
  styles: Styles
) => {
  const shadowHost = document.getElementById(shadowHostId);
  if (shadowHost) {
    const { shadowRoot } = shadowHost;
    if (shadowRoot) {
      const element = shadowRoot.getElementById(elementId);
      if (element) {
        // Apply each style to the element using forEach
        Object.entries(styles).forEach(([property, value]) => {
          (element.style as any)[property] = value;
        });
      }
    }
  }
};

export const makeContentEditableFalse = () => {
  // Select the element with contenteditable attribute set to true
  const spanjsoneditor = document.querySelector('[contenteditable="true"]');
  if (spanjsoneditor) {
    spanjsoneditor.setAttribute("contenteditable", "false");
  }
};

export const clearAUIValue = (ref: any) => {
  if (ref.current) {
    ref.current.clearValue();
  }
};
