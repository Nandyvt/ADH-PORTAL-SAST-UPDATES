/* eslint-disable react/require-default-props */
/* eslint-disable no-plusplus */
import React, { createRef, useEffect, useState } from "react";
import "styles/custom-multiselect.scss";

interface Props {
  items: any;
  selectedValue: any;
  callParentOnSelect: any;
  id: string;
  disabled?: boolean;
  isLoading?: boolean;
}

const MultiSelectDropdown = (props: Props) => {
  const [timeStamp, setTimeStamp] = useState<number>(Date.now());
  const { items, selectedValue, callParentOnSelect, id, disabled, isLoading } =
    props;
  const [showItems, setShowItems] = useState<boolean>(false);
  const [focusOptionIndex, setFocusOptionIndex] = useState<number>(0);
  const refsArray = items.map(() => createRef());
  const dropDownRef = createRef<HTMLDivElement>();

  useEffect(() => {
    setFocusOptionIndex(0);
    document.addEventListener("click", (e: any) => {
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

  const removeValueFromSelection = (item: any) => {
    let index: number = -1;
    for (let i = 0; i < selectedValue.length; i++) {
      if (selectedValue[i].value === item.value) {
        index = i;
        break;
      }
    }

    const newSelectedValue = selectedValue;
    if (index > -1) {
      newSelectedValue.splice(index, 1);
    }
    return newSelectedValue;
  };

  const isChecked = (item: any) => {
    let checked = false;
    for (let i = 0; i < selectedValue.length; i++) {
      if (selectedValue[i].value === item.value) {
        checked = true;
        break;
      }
    }
    return checked;
  };

  const selectOption = (item: any, index: number) => {
    if (isChecked(item)) {
      const newSelectedValues = removeValueFromSelection(item);
      callParentOnSelect(newSelectedValues);
    } else {
      const newSelectedValues = selectedValue;
      newSelectedValues.push(item);
      callParentOnSelect(newSelectedValues);
    }
    setTimeStamp(Date.now());
    refsArray[index].current.focus();
  };

  const upAndDownOption = (event: any, item: any, index: any) => {
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
    // On Key Enter or Spacebar
    if (event.which === 13 || event.which === 32) {
      selectOption(item, index);
    }
  };

  return (
    <div>
      <div
        id={`dropdown-wrapper-${id}`}
        className={`cst-select ${disabled ? "cst-select-disabled" : ""} ${
          isLoading ? "cst-select-loading" : ""
        }`}
      >
        <div
          role="combobox"
          ref={dropDownRef}
          aria-expanded={!!showItems}
          className="cst-select-fld cst-multiselect-fld"
          onClick={() => toggleDropDown()}
          onKeyPress={toggleDropdownOnKeyPress}
          aria-haspopup="listbox"
          aria-owns={`${id}-select-dropdown`}
          aria-controls={`${id}-select-dropdown`}
          id={`${id}-box`}
          tabIndex={0}
          aria-labelledby={`dropdown-label-${id}`}
        >
          <input
            type="text"
            value=""
            className="cst-selected-item"
            id={`${id}`}
            tabIndex={-1}
            readOnly
          />
          {timeStamp > 0 && (
            <ul className="aui-tag-list">
              {selectedValue.length > 0 &&
                selectedValue.map((item: any, index: any) => (
                  <li
                    key={`${item.label}${timeStamp}`}
                    className="aui-tag-item"
                  >
                    {item.label}
                  </li>
                ))}
            </ul>
          )}
          <div
            className={`cst-arrow aha-icon-arrow-down ${
              showItems ? "cst-arrow-up" : "cst-arrow-down"
            }`}
          />
        </div>
        <ul
          style={{ display: showItems ? "block" : "none" }}
          className="cst-select-dropdown"
          aria-labelledby={`${id}`}
          id={`${id}-select-dropdown`}
          aria-label="dropdown items"
        >
          {items.map((item: any, index: number) => (
            /* eslint-disable */
            <li key={"li-" + item.label}>
              {/* Add class 'cst-select-disabled' if disabled */}
              <div
                onClick={() => selectOption(item, index)}
                className={item.disableInd ? "cst-select-disabled" : ""}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === "Spacebar") {
                    e.preventDefault();
                    selectOption(item, index)
                  }
                }}
              >
                <div className="form-check-bordered">
                  {selectedValue.length > -1 && (
                    // Add attribute disabled if disabled
                    <input
                      type="checkbox"
                      value={item}
                      checked={isChecked(item)}
                      id={`${id}-select-check-${index}`}
                      onKeyDown={(event: any) =>
                        upAndDownOption(event, item, index)
                      }
                      ref={refsArray[index]}
                      key={`option-${item.label}`}
                      disabled={item.disableInd}
                    />
                  )}
                  <label htmlFor={`${id}-select-check-${index}`}>
                    {item.label}
                  </label>
                </div>
              </div>
            </li>
            /* eslint-enable */
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MultiSelectDropdown;
