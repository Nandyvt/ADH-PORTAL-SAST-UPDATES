import CONSTANTS from "common/constants";

export const keydownToggleNoOfRecordTableFilter = (event: any) => {
  if (
    event.keyCode === CONSTANTS.KEY_ENTER ||
    event.keyCode === CONSTANTS.KEY_SPACEBAR
  ) {
    event.stopPropagation();
    event.preventDefault();
    event.currentTarget.nextSibling.classList.toggle("visible_cls");
    event.currentTarget.nextSibling.classList.contains("visible_cls") === true
      ? event.currentTarget.setAttribute("aria-expanded", "true")
      : event.currentTarget.setAttribute("aria-expanded", "false");
  }
};

export const toggleNoOfRecordTableFilter = (event: any) => {
  event.currentTarget.nextSibling.classList.toggle("visible_cls");
  event.currentTarget.classList.toggle("rotateArrow");
};
