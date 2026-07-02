import JsonEditor from "components/JsonEditor";
import React, { useEffect, useState } from "react";
import store from "app/store";
import { showToast } from "components/Toast/toast.slice";

function JsonConfigurationComp({ jsonSchemaChange }: any) {
  const primaryEditColor = "rgba(193, 14, 33)";
  const defaultColor = "rgba(34, 35, 40)";

  const [editModeEnabled] = useState(true);
  const [jsonEditorSrcSettings, setJsonEditorSrcSettings] = useState({});
  const [, setUpdatedSettingsJson] = useState({});
  const [jsonEdited, setJsonEdited] = useState(false);

  useEffect(() => {
    if (editModeEnabled) {
      document
        .querySelectorAll(
          '#json-input-view-wrapper span[type="string"],#json-input-view-wrapper span[type="number"]'
        )
        .forEach((item: any) => {
          item.style.color = primaryEditColor;
        });
    } else {
      document
        .querySelectorAll(
          '#json-input-view-wrapper span[type="string"],#json-input-view-wrapper span[type="number"]'
        )
        .forEach((item: any) => {
          item.style.color = defaultColor;
        });
    }
  }, [editModeEnabled]);

  const onJSONEdit = (data: any): boolean => {
    // If there's an error in the data input
    if (data.error) {
      try {
        // Sanitize input and then set the value
        const sanitizedInput = JSON.parse(data.plainText.replace(/\s+/g, ""));

        setUpdatedSettingsJson(sanitizedInput);
        setJsonEditorSrcSettings(sanitizedInput);
        jsonSchemaChange(sanitizedInput);
        setJsonEdited(true);
        return true;
      } catch (parseError) {
        // Return false if parsing or sanitizing fails
        store.dispatch(
          showToast({
            type: "danger",
            title: "Error Occurred",
            message: "Invalid JSON format",
          })
        );
        return false;
      }
    }

    // If jsObject is undefined, handle based on whether jsonEdited was triggered
    if (data.jsObject === undefined) {
      if (!jsonEdited && data.error?.reason) {
        store.dispatch(
          showToast({
            type: "danger",
            title: "Error Occurred",
            message: data.error.reason,
          })
        );
      }

      setUpdatedSettingsJson({});
      setJsonEditorSrcSettings({});
      jsonSchemaChange({});
      setJsonEdited(true);
      return false; // Return false to indicate the settings were reset
    }

    // Otherwise, update the settings with the jsObject data
    setUpdatedSettingsJson(data.jsObject);
    setJsonEditorSrcSettings(data.jsObject);
    setJsonEdited(true);
    jsonSchemaChange(data.jsObject);
    return true; // Return true to indicate a successful update
  };

  return (
    <div className="mt-4 d-block">
      <div className="editor-title-wrapper">
        <p className="editor-title m-0 config-required">Configurations</p>
      </div>
      <div
        id="editor-div"
        className="editor-wrapper"
        style={{ pointerEvents: editModeEnabled ? "all" : "none" }}
      >
        <JsonEditor
          id="json-input-view-wrapper"
          placeholderProp={jsonEditorSrcSettings}
          editModeEnabled
          onChangeFunc={onJSONEdit}
        />
      </div>
    </div>
  );
}

export default JsonConfigurationComp;
