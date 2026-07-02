import React, { useEffect, useRef, useState } from "react";
import { firstLetterCaps, removeAllSpecialChar } from "common/utils";
import { ChildCheckboxesProps } from "./util";
import { mergeObjects } from "../CreateCredential/utils";

const ChildCheckboxes = ({
  service,
  data,
  setTobeDeleted,
  tobeDeleted,
  setPermissions,
  permissions,
  defaultSelectedPermission,
  setCheckBoxState,
  checkBoxState,
}: ChildCheckboxesProps) => {
  const [serviceObject] = useState<any>(data);

  const checkboxRef: any = useRef(null);

  useEffect(() => {
    const handleChildAuiCheckboxChange = (event: any) => {
      const splitArray = event.detail.id.split("-");
      const serviceName = splitArray[1];
      const endpoint = splitArray[3];
      const method = splitArray[2];
      if (event.detail.value) {
        setTobeDeleted({});
      } else {
        setTobeDeleted({
          [serviceName]: { [endpoint]: [method] },
        });
      }
      setCheckBoxState({
        [serviceName]: { [endpoint]: [method] },
      });
    };

    const childCheckboxes: any = Array.from(
      document.querySelectorAll(`[checkboxid^="child-"]`)
    );
    childCheckboxes.forEach((checkbox: any) => {
      checkbox?.addEventListener(
        "auiCheckboxChange",
        handleChildAuiCheckboxChange
      );
    });
    return () => {
      childCheckboxes.forEach((checkbox: any) => {
        checkbox?.removeEventListener(
          "auiCheckboxChange",
          handleChildAuiCheckboxChange
        );
      });
    };
  }, []);

  useEffect(() => {
    // get all child checkboxes
    const childCheckboxes: any = Array.from(
      document.querySelectorAll(`[checkboxid^="child-"]`)
    );
    // for every service in defaultSelectedPermission check the checkboxes and set the value
    childCheckboxes.forEach((checkbox: any) => {
      const splitArray = checkbox.checkboxid.split("-");
      const serviceName = splitArray[1];
      const endpoint = splitArray[3];
      const method = splitArray[2];

      checkbox.value =
        defaultSelectedPermission?.[serviceName]?.[endpoint]?.includes(method);
    });
    setPermissions((prev: any) => {
      return mergeObjects(prev, defaultSelectedPermission, tobeDeleted);
    });
  }, [defaultSelectedPermission]);

  return (
    <div
      key={service}
      id={`edit-permissions-${service}`}
      role="region"
      aria-labelledby={`${service}_accordian_button`}
      data-parent="#accordionExample"
      className={`col-lg-10 px-md-3 px-sm-3 px-lg-3 form-group row ${service}-checkboxes collapse show `}
    >
      {Object.entries(serviceObject).map((resource): any => {
        return (
          <fieldset
            className="col-12 d-md-flex m-0 p-0 spacing-httpmethods"
            aria-labelledby={removeAllSpecialChar(
              `${resource[0]}-label-${service}` as string
            )}
            key={removeAllSpecialChar(
              `${resource[0]}-label-${service}` as string
            )}
          >
            <label
              htmlFor="checkbox"
              key={resource[0]}
              className="col-sm-12 col-md-4 col-form-label px-0"
              id={removeAllSpecialChar(
                `${resource[0]}-label-${service}` as string
              )}
            >
              {resource[0]}
            </label>
            <div className="col-12 col-md-8 col-sm-12 col-lg-6 px-0 alignCheckboxes d-sm-flex d-flex flex-wrap justify-content-start pt-2 pos-relative">
              {Object.values(serviceObject[resource[0]]).map(
                (httpMethods): any => {
                  return (
                    <div
                      className={`form-group col-4 col-sm-3 ${httpMethods}-cls`}
                      key={`${resource[0]}-${httpMethods}-${service}`}
                    >
                      <aui-checkbox
                        checkboxid={`child-${service}-${httpMethods}-${resource[0]}`}
                        label={firstLetterCaps(httpMethods as string)}
                        ref={checkboxRef}
                      />
                    </div>
                  );
                }
              )}
            </div>
          </fieldset>
        );
      })}
    </div>
  );
};

export default ChildCheckboxes;
