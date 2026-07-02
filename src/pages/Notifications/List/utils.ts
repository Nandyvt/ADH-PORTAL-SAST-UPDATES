import {
  closeActionPopoverOnFocusOut,
  toggleAriaExpandedElipses,
} from "common/utils";

export const filtersLabel = [
  { name: "Email", id: 1, isSelected: false },
  { name: "SMS", id: 2, isSelected: false },
  { name: "HTTP", id: 3, isSelected: false },
];

export interface IPagination {
  pageNumber: number;
  pageOffset: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  isFirst: number;
  isLast: number;
}
export const defaultValues: IPagination = {
  pageNumber: 1,
  pageOffset: 0,
  pageSize: 20,
  totalCount: 0,
  totalPages: 0,
  isFirst: 0,
  isLast: 0,
};

export const togglePopover = (e: any) => {
  Array.from(document.querySelectorAll(".connection-td-wrapper")).forEach(
    (el) => {
      if (e.currentTarget?.nextSibling !== el) {
        el.classList.remove("d-flex", "d-none");
        el.classList.add("d-none");
      }
    }
  );

  /* Accessiility fix */
  toggleAriaExpandedElipses(e.currentTarget); // toggle aria-expanded
  closeActionPopoverOnFocusOut(e);
};

export const highlightFilter = (event: any, state: any) => {
  if (state) {
    event?.currentTarget?.classList?.toggle("selected-filter");
    event?.currentTarget?.classList?.remove("default-color");
  } else {
    event?.currentTarget?.classList?.toggle("default-color");
    event?.currentTarget?.classList?.remove("selected-filter");
  }
};
