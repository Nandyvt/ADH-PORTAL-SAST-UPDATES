/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/role-supports-aria-props */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from "react";
import { areSubscriptionsEqual } from "pages/Configuration/utils";
import { SubscriptionStyles } from "./styled";

const DropdownItem = ({
  label,
  children,
  isChecked,
  onToggle,
  value,
  hasChildren,
  checkedItems,
  isOpen,
  onOpen,
  parentOpen,
  isChildItem,
  parentKey,
}: any) => {
  const toggleOpen = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isChildItem) {
      onOpen(value); // Only toggle open for parent items
    }
  };

  const handleCheckboxChange = (e: any) => {
    e.stopPropagation();
    const newCheckedStatus = !isChecked;
    onToggle(value, newCheckedStatus, parentKey);

    if (hasChildren) {
      children?.forEach((child: { props: { value: any } }) =>
        onToggle(child.props.value, newCheckedStatus, value)
      );
    }
  };

  return (
    <li
      className={`dropdown-submenu${isOpen && parentOpen ? " open" : ""}`}
      role="none"
    >
      <div
        onClick={(e) => {
          if (!isChildItem) toggleOpen(e);
        }}
        onKeyDown={(e) =>
          e.key === "Enter" && (isChildItem ? undefined : toggleOpen(e))
        }
        role="menuitem"
        tabIndex={0}
        aria-haspopup={!!children}
        aria-expanded={isOpen}
      >
        <div className="dropdown-item-wrapper">
          <input
            type="checkbox"
            checked={isChecked}
            readOnly
            aria-checked={isChecked}
            onClick={(e: any) => {
              e.stopPropagation();
              handleCheckboxChange(e);
            }}
            id={`dropdown-menu-${value}`}
          />{" "}
          <label
            className="dropdown-input-label"
            htmlFor={`dropdown-menu-${value}`}
          >
            {label}
          </label>
          {!isChildItem && hasChildren && (
            <span className="aui-arrow-right-wrapper">
              <aui-icon
                icon="arrowright"
                svgwidth="15"
                svgheight="15"
                block={false}
              />
            </span>
          )}
        </div>
      </div>
    </li>
  );
};

const SubscriptionComp = ({
  checkedItems,
  setCheckedItems,
  checkedCount,
  setCheckedCount,
  allSourcesChecked,
  setAllSourcesChecked,
  sourceEntityData,
}: any) => {
  const [sourceEntitydropdownOpen, setSourceEntitydropdownOpen] =
    useState(false);

  const [openDropdown, setOpenDropdown] = useState<string | null>(
    sourceEntityData?.[0]?.source
  );

  const [openChildDropdown, setOpenChildDropdown] = useState<string | null>(
    null
  );

  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedSubscriptionRef = useRef<any>(null);

  const [selectedEntitiesForSource, setSelectedEntitiesForSource] =
    useState<any>({});

  useEffect(() => {
    if (sourceEntitydropdownOpen && sourceEntityData.length > 1) {
      // Automatically open the submenu for the second option
      const secondOption = sourceEntityData[0].source;
      setOpenDropdown(secondOption);
      setSelectedEntitiesForSource(sourceEntityData[0]);
    }
  }, [sourceEntitydropdownOpen]);

  const handleToggle = (
    key: string,
    checked: boolean,
    parentKey: string | null = null
  ) => {
    if (parentKey) {
      // Handle child checkbox change
      const itemKey = `${parentKey}:${key}`;
      setCheckedItems((prev: any) => {
        const updatedItems = { ...prev, [itemKey]: checked };

        // Find the relevant source from the sourceEntitiesMap
        const sourceItem = sourceEntityData.find(
          (item: any) => item.source === parentKey
        );

        setSelectedEntitiesForSource(sourceItem);

        // Check if all child checkboxes are checked
        const allChecked = sourceItem?.entities.every(
          (entity: string) => updatedItems[`${parentKey}:${entity}`]
        );

        // Update parent checkbox based on child checkboxes' state
        updatedItems[parentKey] = allChecked;

        return updatedItems;
      });
    } else {
      // Handle parent checkbox change
      setCheckedItems((prev: any) => {
        const updatedItems = { ...prev, [key]: checked };

        // Find the relevant source from the sourceEntitiesMap
        const sourceItem = sourceEntityData.find(
          (item: any) => item.source === key
        );

        setSelectedEntitiesForSource(sourceItem);
        // Update all child checkboxes if parent is checked/unchecked
        sourceItem?.entities?.forEach((entity: string) => {
          updatedItems[`${key}:${entity}`] = checked;
        });

        return updatedItems;
      });

      setOpenDropdown(key); // to open entity dropdown on click of source checkbox
    }
  };

  const handleClearAllSubscriptions = () => {
    setCheckedItems((prev: any) => {
      const updatedItems = { ...prev };
      Object.keys(updatedItems).forEach((key) => {
        updatedItems[key] = false;
      });
      return updatedItems;
    });
  };

  const handleClear = (key: string) => {
    setCheckedItems((prev: any) => {
      const updatedItems = { ...prev };

      // Clear the parent checkbox
      updatedItems[key] = false;

      // Find the relevant source from the passed key

      const sourceItem: any = key?.split(":")[0]; // eg sourceItem = "MSD,ADH etc"

      if (sourceItem in updatedItems) {
        const sourceItemVal = updatedItems[sourceItem]; // value indicates whether the source is checked

        // Uncheck the sourceItem if it is currently true (all entities under this source are checked)
        if (sourceItemVal) {
          updatedItems[sourceItem] = false;
        }
      }

      // uncheck ALL checkbox on clearing of any of the selected labels
      setAllSourcesChecked(false);
      return updatedItems;
    });
  };

  const handleOpenDropdown = (key: string) => {
    const sourceItem = sourceEntityData?.find(
      (item: any) => item.source === key
    );

    setSelectedEntitiesForSource(sourceItem);
    setOpenDropdown(key);
  };

  const handleOpenChildDropdown = (key: string) => {
    setOpenChildDropdown((prev) => (prev === key ? null : key));
  };

  const handleClickOutside = (event: any) => {
    const isOutsideDropdown =
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node);

    if (isOutsideDropdown) {
      setSourceEntitydropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const selectedSubscriptionsCount = (obj: any) => {
    return Object.keys(obj)?.reduce((count, key) => {
      if (obj[key] === true && key.includes(":")) {
        return count + 1;
      }
      return count;
    }, 0);
  };

  useEffect(() => {
    const count = selectedSubscriptionsCount(checkedItems);
    setCheckedCount(count);

    /* check if all source checkboxes are checked - start */
    const selectedSubscriptionData = Object.keys(checkedItems)
      .filter((key) => checkedItems[key] === true && key.includes(":"))
      .map((key) => {
        const [source, entity] = key.split(":");
        return {
          source,
          entity,
        };
      });

    const allSourcesChecked = areSubscriptionsEqual(
      sourceEntityData,
      selectedSubscriptionData
    );
    setAllSourcesChecked(allSourcesChecked);
    /* check if all source checkboxes are checked - end */
  }, [checkedItems]);

  const updateItemsBasedOnToggle = (prev: any, checked: boolean) => {
    const updatedItems = { ...prev };

    sourceEntityData.forEach((item: any) => {
      updatedItems[item.source] = checked;

      item.entities.forEach((entity: string) => {
        updatedItems[`${item.source}:${entity}`] = checked;
      });
    });

    return updatedItems;
  };

  const handleToggleAll = (checked: boolean) => {
    setCheckedItems((prev: any) => updateItemsBasedOnToggle(prev, checked));
    setAllSourcesChecked(checked);
  };

  const renderSelectedLabels = () => {
    return Object.keys(checkedItems)
      .filter((key: any) => checkedItems[key])
      .map((key) => {
        const [sourceKey, entity] = key.includes(":")
          ? key.split(":")
          : [key, null];
        if (!entity) return null;
        return (
          <div key={key} className="selected-label">
            {`${sourceKey} - ${entity}`}
            {/* Prepend sourceKey */}
            <aui-button
              variant="link-style"
              onClick={(e: any) => {
                e.preventDefault();
                handleClear(key);
              }}
            >
              <aui-icon icon="cross" svgwidth="9" svgheight="9" block={false} />
            </aui-button>
          </div>
        );
      });
  };

  const renderDropdownItems = () => {
    return (
      <>
        <DropdownItem
          label="All"
          value="all"
          isChecked={allSourcesChecked}
          onToggle={(_: any, isChecked: any) => {
            handleToggleAll(isChecked);
          }}
          hasChildren={false}
          checkedItems={checkedItems}
          onOpen={() => setOpenDropdown(null)}
          parentOpen
          isChildItem={false}
          parentKey={null}
        />
        {sourceEntityData?.map((item: any) => {
          const sourceKey: any = item.source;

          return (
            <DropdownItem
              key={sourceKey}
              label={sourceKey}
              isChecked={checkedItems[sourceKey]}
              onToggle={handleToggle}
              value={sourceKey}
              hasChildren
              checkedItems={checkedItems}
              isOpen={openDropdown === sourceKey}
              onOpen={handleOpenDropdown}
              parentOpen={openDropdown === sourceKey}
            />
          );
        })}
      </>
    );
  };

  const renderChip = (checkedCountParam: number) => {
    return (
      <div className="chip-wrapper d-flex align-items-center">
        <span className="chip d-flex align-items-center justify-content-center">{`${checkedCountParam} Selected`}</span>
        <aui-button
          variant="link-style"
          onClick={(e: any) => {
            e.preventDefault();
            handleClearAllSubscriptions();
          }}
        >
          <aui-icon icon="cross" svgwidth="9" svgheight="9" block={false} />
        </aui-button>
      </div>
    );
  };

  const renderEnititesDroddownItems = () => {
    const sourceKey = selectedEntitiesForSource;
    return selectedEntitiesForSource?.entities?.map((entity: any) => {
      return (
        <DropdownItem
          key={entity}
          label={entity}
          isChecked={checkedItems[`${sourceKey?.source}:${entity}`]}
          onToggle={handleToggle}
          value={entity}
          hasChildren={false}
          checkedItems={checkedItems}
          isOpen={openChildDropdown === entity}
          onOpen={handleOpenChildDropdown}
          parentOpen={openDropdown === sourceKey}
          isChildItem={false}
          parentKey={sourceKey?.source} // Pass parentKey to child items
        />
      );
    });
  };

  return (
    <SubscriptionStyles>
      <div className="row">
        <div className="col-lg-10">
          <label className="subs-heading">Subscriptions</label>
          {checkedCount > 0 && (
            <div ref={selectedSubscriptionRef} className="selected-labels">
              {renderSelectedLabels()}
            </div>
          )}
          <div className="dropdown" ref={dropdownRef}>
            <label
              htmlFor="dropdownInput"
              className="btn btn-default dropdown-toggle subs-label-placeholder"
            >
              {checkedCount < 1
                ? "Select Subscriptions"
                : renderChip(checkedCount)}
              <span className="icon-wrapper">
                <aui-icon
                  icon={sourceEntitydropdownOpen ? "arrowup" : "arrowdown"}
                  block={false}
                  svgwidth="20"
                  svgheight="20"
                />
              </span>
            </label>
            <input
              type="checkbox"
              id="dropdownInput"
              className="dropdown-input"
              data-check={sourceEntitydropdownOpen}
              onChange={() =>
                setSourceEntitydropdownOpen(!sourceEntitydropdownOpen)
              }
              checked={sourceEntitydropdownOpen}
            />
            <ul className="dropdown-menu source-dropdown-wrapper">
              {renderDropdownItems()}
            </ul>{" "}
            {sourceEntitydropdownOpen && (
              <ul className="dropdown-menu entity-dropdown-wrapper">
                {renderEnititesDroddownItems()}
              </ul>
            )}
          </div>
        </div>
      </div>
    </SubscriptionStyles>
  );
};

export default SubscriptionComp;
