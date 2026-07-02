/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef, useState } from "react";
import { ParentCheckboxesProps } from "./util";
import ChildCheckboxes from "./ChildCheckboxes";
import { mergeObjects } from "../CreateCredential/utils";

const ParentCheckboxes = ({
  allPermssions,
  tobeDeleted,
  setTobeDeleted,
  setPermissions,
  permissions,
  defaultSelectedPermission,
}: ParentCheckboxesProps) => {
  const [checkBoxState, setCheckBoxState] = useState<any>({});
  const [services] = useState<any>(Object.keys(allPermssions) || []);

  const serviceChkBoxRef: any = useRef([]);
  serviceChkBoxRef.current = [];

  const parentCheckboxHandler = (event: any) => {
    // get all child checkboxes of selected service checkbox
    const service = event.target.id.split("-")[1];

    const childCheckboxes: any = Array.from(
      document.querySelectorAll(`[checkboxid^="child-${service}"]`)
    );
    const map = new Map();
    childCheckboxes.forEach((child: any) => {
      const childSplitArr = child.checkboxid.split("-");
      const method = childSplitArr[2];
      const endpoint = childSplitArr[3];
      child.value = event.target.checked;
      if (event.target.checked) {
        setTobeDeleted({});
        if (map.has(service)) {
          const serviceData = map.get(service);
          if (serviceData[endpoint]) {
            serviceData[endpoint].push(method);
          } else {
            serviceData[endpoint] = [method];
          }
        } else {
          map.set(service, { [endpoint]: [method] });
        }
      } else {
        setTobeDeleted({ [service]: {} });
      }
    });
    setCheckBoxState(Object.fromEntries(Array.from(map.entries())));
  };

  useEffect(() => {
    if (services.length > 0) {
      services.forEach((service: any) => {
        const childCheckboxes: any = Array.from(
          document.querySelectorAll(`[checkboxid^="child-${service}"]`)
        );
        const parentCheckBox: any = document.querySelector(
          `[id^="parent-${service}-checkbox"]`
        );
        if (parentCheckBox) {
          let allChecked = true;
          for (let i = 0; i < childCheckboxes.length; i += 1) {
            if (!childCheckboxes[i].value) {
              allChecked = false;
              break;
            }
          }
          parentCheckBox.checked = allChecked;
        }
      });
    }
  }, [permissions]);

  useEffect(() => {
    setPermissions((prev: any) => {
      return mergeObjects(prev, checkBoxState, tobeDeleted);
    });
  }, [checkBoxState]);

  return (
    <div className="aui-nav-accordion" id="services-permission">
      <div className="card mb-0">
        <div className="card-header" id="headingOneServices">
          <div className="card-body pt-2 pb-0 ml-1">
            <div className="accordion" id="accordionExample">
              {services.map((service: any) => {
                return (
                  <div key={service}>
                    <div className="borderbtm col-lg-8 px-0">
                      <div
                        className="h6 font-bold font16 d-flex flex-row "
                        id={`modalTitleAccountsLast-${service}`}
                      >
                        <div className="form-group form-check-bordered mb-0 pr-0">
                          <input
                            data-testid="selectall"
                            type="checkbox"
                            aria-label={`${service} Select All`}
                            id={`parent-${service}-checkbox`}
                            name={`parent-${service}-checkbox`}
                            className="serviceChkBoxes"
                            ref={serviceChkBoxRef}
                            onChange={parentCheckboxHandler}
                          />
                          <label
                            htmlFor={`parent-${service}-checkbox`}
                            id={`parent-${service}-checkbox-label`}
                            className="fontnormal parent-checkbox"
                          >
                            &nbsp;
                          </label>
                        </div>
                        <button
                          type="button"
                          id={`${service}_accordian_button`}
                          className="btn btn-block p-0 text-left aui-accordion-btn text-capitalize"
                          aria-label={`${service} accordian`}
                          aria-controls={`edit-permissions-${service}`}
                          data-toggle="collapse"
                          data-target={`#edit-permissions-${service}`}
                          aria-expanded="true"
                        >
                          {service}
                          <i className="acc-btn-arrow aha-icon-arrow-down" />
                        </button>
                      </div>
                    </div>
                    <ChildCheckboxes
                      setPermissions={setPermissions}
                      permissions={permissions}
                      setTobeDeleted={setTobeDeleted}
                      service={service}
                      data={allPermssions[service]}
                      tobeDeleted={tobeDeleted}
                      defaultSelectedPermission={defaultSelectedPermission}
                      checkBoxState={checkBoxState}
                      setCheckBoxState={setCheckBoxState}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentCheckboxes;
