import React, { useEffect, useRef, useState } from "react";
import { Wrapper } from "styled";
import store from "app/store";
import { showToast } from "components/Toast/toast.slice";
import { setHeaderTitleText } from "components/Header/header.slice";
import { setPageLoadingStatus } from "components/Loader/loader.slice";
import { getSchema, getSchemaUrl } from "services/api/settings.api";
import { getErrorMessage } from "common/utils";
import AdminFooter from "components/AdminFooter";
import JSONInput from "react-json-editor-ajrm";
import Toast from "components/Toast";
import CONSTANTS from "common/constants";
import { useParams } from "react-router-dom";
import { localeEn } from "../../common/JsonEditor/JSONlocaleEN";
import { HeaderWrapper, SchemaWrapper, SchemaContentWrapper } from "./styled";

const Menu = (props: any) => {
  // Use the useParams hook compatible with react-router-dom v6
  const { code } = useParams<{ code: string }>();

  const footerSticky: any = useRef(null);

  const defaultColorObj = {
    default: "rgba(34, 35, 40, 1)",
    number: "rgba(34, 35, 40, 1)",
    colon: "rgba(34, 35, 40, 1)",
    keys: "rgba(34, 35, 40, .85)",
    keys_whiteSpace: "rgba(34, 35, 40, .85)",
    primitive: "rgba(34, 35, 40, 1)",
    string: "rgba(34, 35, 40)",
    error: "rgba(34, 35, 40, 1)",
    background: "#fff",
    background_warning: "rgba(34, 35, 40, 1)",
  };

  const [jsonEditorSrcSettings, setJsonEditorSrcSettings] = useState({});

  useEffect(() => {
    store.dispatch(setPageLoadingStatus({ isPageLoading: true }));
    store.dispatch(
      setHeaderTitleText({
        headerTitle: "",
      })
    );

    getSchema(code ?? "")
      .then((response) => {
        setJsonEditorSrcSettings(response.data.jsonschema.jsonSchema);
      })
      .catch((error) => {
        footerSticky.current.classList.add("stickToBottom");
        store.dispatch(
          showToast({
            type: "danger",
            title: "Error",
            message: getErrorMessage(error),
          })
        );
      })
      .finally(() => {
        store.dispatch(setPageLoadingStatus({ isPageLoading: false }));
      });
  }, []);

  const copySchemaUrl = () => {
    const schemaUrl = getSchemaUrl();
    if (!navigator.clipboard) {
      const el = document.createElement("input");
      el.value = schemaUrl;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    } else {
      navigator.clipboard.writeText(schemaUrl);
    }
  };
  return (
    <>
      <Toast />
      <Wrapper className="d-flex flex-column">
        <HeaderWrapper>
          <div className="container json-content">
            <a href="#maincontent" className="aui-skip-content d-none">
              Skip to main content
            </a>
            <div className="container pt-2 pb-2 px-0">
              <img src={CONSTANTS.HEADER_LOGO.LOGO_WITH_ADH} alt="AHA home" />
            </div>
          </div>
        </HeaderWrapper>
        <SchemaWrapper>
          <div className="container json-content">
            <SchemaContentWrapper>
              <h1
                className="menuheading"
                aria-label="Menu"
                data-testid="test-client"
              >
                JSON Schema
              </h1>
              <div className="editor-title-wrapper">
                <p className="editor-title m-0">JSON Editor</p>
                <button
                  role="link"
                  aria-label="Copy Link"
                  type="button"
                  className="title-buttons my-0 circleWrapper border-0"
                  onClick={() => {
                    copySchemaUrl();
                  }}
                >
                  <u className="editor-title m-0">Copy URL</u>
                </button>
              </div>
              <div
                id="editor-div"
                className="editor-wrapper"
                data-testid="editor-wrapper"
                style={{ pointerEvents: "none" }}
              >
                <JSONInput
                  placeholder={jsonEditorSrcSettings}
                  locale={localeEn}
                  width="auto"
                  height="auto"
                  confirmGood={false}
                  theme="light_mitsuketa_tribute"
                  colors={defaultColorObj}
                />
              </div>
            </SchemaContentWrapper>
          </div>
        </SchemaWrapper>
        <div className="menuFooterWrapper" ref={footerSticky}>
          <AdminFooter />
        </div>
      </Wrapper>
    </>
  );
};
export default Menu;
