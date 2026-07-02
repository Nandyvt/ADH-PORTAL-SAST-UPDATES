import React, { createRef, useCallback, useEffect, useState } from "react";
import "styles/custom-select.scss";

interface Props {
  items: any;
  selectedValue: any;
  callParentOnSelect: any;
  id: string;
  disabled?: boolean;
  isLoading?: boolean;
  approveRejectInd?: boolean;
}

const Dropdown = (props: Props) => {
  const {
    items,
    selectedValue,
    callParentOnSelect,
    id,
    disabled,
    isLoading,
    approveRejectInd,
  } = props;
  const [selectedItemName, setSelectedItemName] = useState<any>("");
  const [showItems, setShowItems] = useState<boolean>(false);
  const [focusOptionIndex, setFocusOptionIndex] = useState<number>(0);
  const refsArray = items.map(() => createRef());
  const dropDownRef = createRef<HTMLDivElement>();

  const updateSelectedValue = (value: any) => {
    if (value) {
      if (items && items.length > 0) {
        items.forEach((element: any, index: number) => {
          if (element.value === value) {
            setSelectedItemName(element.label);
            setFocusOptionIndex(index);
          }
        });
      }
    }
  };

  useEffect(() => {
    setSelectedItemName(items[0]?.label);
    setFocusOptionIndex(0);
    updateSelectedValue(selectedValue);
    document.addEventListener("click", function (e: any) {
      if (
        !document?.getElementById(`dropdown-wrapper-${id}`)?.contains(e.target)
      ) {
        setShowItems(false); // Clicked outside the box - Close Dropdown
      }
    });
  }, [items, selectedValue, id]);

  useEffect(() => {
    if (showItems) {
      refsArray[focusOptionIndex].current.focus();
    }
  }, [showItems]);

  const toggleDropDown = () => {
    if (disabled) return;
    setShowItems(!showItems);
  };

  const toggleDropdownOnKeyPress = (event: any) => {
    event?.preventDefault();
    if (event.which === 32 || event.which === 13) {
      toggleDropDown();
    }
  };

  const selectOption = (value: any, index: number) => {
    if (index > -1) {
      !approveRejectInd && setFocusOptionIndex(index);
    }
    if (!value) {
      items.forEach((item: any, i: number) => {
        if (i === focusOptionIndex) {
          value = item.value;
          setFocusOptionIndex(i);
        }
      });
    }
    callParentOnSelect(value);
    !approveRejectInd && updateSelectedValue(value); // To discplay in component
    setShowItems(false);
  };

  const upAndDownOption = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.keyCode === 27 || event.keyCode === 9) {
      // On Escape Toggle Dropdown
      dropDownRef?.current?.focus();
      toggleDropDown();
      return;
    }

    // On Key UP Arrow
    if (event.which === 38 && focusOptionIndex > 0) {
      const setIndex = focusOptionIndex - 1;
      setFocusOptionIndex(setIndex);
      refsArray[setIndex].current.focus();
    }
    // On Key Down Arrow
    if (event.which === 40 && focusOptionIndex < items.length - 1) {
      const setIndex = focusOptionIndex + 1;
      setFocusOptionIndex(setIndex);
      refsArray[setIndex].current.focus();
    }
    // On Enter
    if (event.which === 13) {
      selectOption(undefined, -1);
    }
  };

  const generatecstItemClasses = (item: any, index: any): string => {
    let className: any = "cst-item";
    if (approveRejectInd && item.disableInd) {
      className += " cst-item-disabled";
    } else if (focusOptionIndex === index) {
      className += " cst-item-selected";
    }
    return className;
  };

  return (
    <div>
      <div
        id={`dropdown-wrapper-${id}`}
        className={`cst-select ${disabled ? "cst-select-disabled" : ""} ${
          isLoading ? "cst-select-loading" : ""
        }`}
      >
        {" "}
        <div
          role="combobox"
          ref={dropDownRef}
          aria-expanded={!!showItems}
          className="cst-select-fld"
          onClick={() => toggleDropDown()}
          onKeyPress={toggleDropdownOnKeyPress}
          aria-haspopup="listbox"
          aria-owns={`${id}-select-dropdown`}
          aria-controls={`${id}-select-dropdown`}
          id={`${id}-box`}
          tabIndex={0}
          aria-labelledby={`${id}-label`}
        >
          <input
            type="text"
            value={selectedItemName || ""}
            className="cst-selected-item"
            id={`${id}`}
            tabIndex={-1}
            readOnly
          />
          {/* <div className="sr-only">{selectedItemName}</div> */}
          <div
            className={`cst-arrow aha-icon-arrow-down ${
              showItems ? "cst-arrow-up" : "cst-arrow-down"
            }`}
          />
        </div>
        <div
          style={{ display: showItems ? "block" : "none" }}
          className="cst-select-dropdown"
          aria-labelledby={`${id}`}
          role="listbox"
          aria-expanded={!!showItems}
          id={`${id}-select-dropdown`}
        >
          {items.map((item: any, index: number) => (
            <div
              key={`${item.value}-${item.dropdownLabel}`}
              onClick={() => selectOption(item.value, index)}
              className={`${generatecstItemClasses(item, index)}`}
              onKeyDown={upAndDownOption}
              ref={refsArray[index]}
              role="option"
              tabIndex={0}
              aria-label={item?.ariaLabel ? item.ariaLabel : ""}
              aria-disabled={
                approveRejectInd && item.disableInd ? "true" : "false"
              }
            >
              {approveRejectInd ? item.dropdownLabel : item.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
