import React, { useEffect, useRef } from "react";
import { IFormInterface } from "./utils";
import { InputFormWrapper } from "./styled";

const InputForm = ({
  model,
  onChange,
  wrapperClass,
  defaultValue = [],
}: IFormInterface) => {
  const formUI = model.map((field: any, i: any) => {
    let element;
    if (!field.customData && field.hideElement !== true) {
      const { key } = field;
      const type = field.type || "text";
      const { required } = field.props;
      let input = null;
      // check type from jsonForm and add relevant form element
      if (type === "text") {
        input = (
          <div
            className="col-lg-6 col-md-6 col-sm-6 margin-top-form-field"
            key={key}
          >
            <aui-input
              label={field.label}
              inputid={key}
              direction="column"
              required={required}
              placeholder={`Enter ${field.label}`}
              value={defaultValue[i] || ""}
            />
          </div>
        );
        element = input;
      }
      // other form elements add if(type==="dropdown"){<aui-dropdown/>} and handle onchange
    }
    return element;
  });

  // query all aui-input and add event listner
  useEffect(() => {
    Array.from(document.querySelectorAll("aui-input")).forEach(
      (element: any) => {
        element.addEventListener("auiInputChange", onChange);
      }
    );
    return () => {
      Array.from(document.querySelectorAll("aui-input")).forEach(
        (element: any) => {
          element.removeEventListener("auiInputChange", onChange);
        }
      );
    };
  }, [model]);

  return (
    <InputFormWrapper className={wrapperClass}> {formUI}</InputFormWrapper>
  );
};

export default InputForm;
