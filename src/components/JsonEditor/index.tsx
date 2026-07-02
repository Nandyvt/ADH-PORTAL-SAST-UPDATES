import React from "react";
import JSONInput from "react-json-editor-ajrm";
import { localeEn } from "../../common/JsonEditor/JSONlocaleEN";
import { JsonEditorStyled } from "./styled";

export const JsonEditor = (props: any) => {
  const { idProp, placeholderProp, editModeEnabled, viewProp, onChangeFunc } =
    props;
  const primaryEditColor = "rgba(193, 14, 33)";

  //   Default Color Pattern
  const defaultColor = "rgba(34, 35, 40)";
  const defaultColorObj = {
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

  const editModeColorObj = {
    default: defaultColor,
    number: primaryEditColor,
    colon: defaultColor,
    keys: "rgba(34, 35, 40, .85)",
    keys_whiteSpace: "rgba(34, 35, 40, .85)",
    primitive: defaultColor,
    string: primaryEditColor,
    error: primaryEditColor,
    background: "#fff",
    background_warning: "#fff",
  };

  return (
    <section>
      <JsonEditorStyled>
        <div
          id="transactional-editor-div"
          data-testid="editor-wrapper"
          className="d-flex flex-column"
        >
          <JSONInput
            id={idProp}
            viewOnly={viewProp}
            placeholder={placeholderProp}
            locale={localeEn}
            width="auto"
            height="auto"
            confirmGood={false}
            theme="light_mitsuketa_tribute"
            colors={editModeEnabled ? editModeColorObj : defaultColorObj}
            onChange={onChangeFunc}
          />
        </div>
      </JsonEditorStyled>
    </section>
  );
};

JsonEditor.defaultProps = {
  type: "",
  requestPayload: "",
  errorPayload: "",
  viewProp: false,
  editModeEnabled: false,
  onChangeFunc: () => {},
};

export default JsonEditor;
