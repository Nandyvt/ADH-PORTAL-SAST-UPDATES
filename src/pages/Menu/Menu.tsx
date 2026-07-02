/* eslint-disable array-callback-return */
import React, { useCallback, useEffect, useState } from "react";
import { Wrapper } from "styled";
import store from "app/store";
import { showToast } from "components/Toast/toast.slice";
import { setHeaderTitleText } from "components/Header/header.slice";
import { getRoles, getRolesMenu, patchMenu } from "services/api/settings.api";
import { getErrorMessage, getXYPosition, openInNewTab } from "common/utils";
import { useDispatch } from "react-redux";
import { setPageLoadingStatus } from "components/Loader/loader.slice";
import Modal from "components/Modal";
import JsonEditor from "components/JsonEditor";
import MenuWrapper from "./styled";

const Menu = () => {
  const defaultRoleCode = "CLIENT_ADMIN";
  const dispatch = useDispatch();

  const primaryEditColor = "rgba(193, 14, 33)";
  const defaultColor = "rgba(34, 35, 40)";

  interface IRole {
    name: string;
    code: string;
    level: number;
    id: number;
  }

  const [selectedRole, setSelectedRole] = useState("select");
  const [settingsJson, setSettingsJson] = useState({});
  const [jsonEditorSrcSettings, setJsonEditorSrcSettings] = useState({});
  const [defaultSettingsJson, setDefaultSettingsJson] = useState({});
  const [updatedSettingsJson, setUpdatedSettingsJson] = useState({});
  const [jsonEdited, setJsonEdited] = useState(false);
  const [roles, setRoles] = useState<IRole[]>([
    {
      name: "",
      code: "",
      level: 0,
      id: 0,
    },
  ]);
  const [editModeEnabled, setEditModeEnabled] = useState(false);
  const [preselectedRole, setPreSelectedRole] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [roleCode] = useState("ROLE_MENUS");
  const [roleId, setRoleId] = useState("4");
  const [resetJson, setResetJson] = useState(false);
  const dropDownToggler = (e: any) => {
    e.currentTarget.nextSibling.classList.toggle("rotate");
  };
  const dropDownDefaultState = (e: any) => {
    if (e.currentTarget.nextSibling.classList.contains("rotate") === true) {
      e.currentTarget.nextSibling.classList.remove("rotate");
    }
  };

  const toggleModalBg = useCallback(() => {
    document.querySelector(".modal-backdrop")?.classList.toggle("show");
    document.querySelector("body")?.classList.toggle("modal-open");
    return setShowConfirmationModal(!showConfirmationModal);
  }, [showConfirmationModal]);

  const triggerClickEvent = (elem: HTMLElement) => {
    if (elem) {
      const event = new Event("click", { bubbles: true });
      elem.dispatchEvent(event);
    }
  };

  const handleUnsavedChanges = (e: string) => {
    toggleModalBg();
    setPreSelectedRole(e);
    setShowConfirmationModal(true);
  };

  const onRoleSelect = (e: string) => {
    dispatch(setPageLoadingStatus({ isPageLoading: true }));
    setJsonEditorSrcSettings({});
    setSelectedRole(e);
    roles.forEach((val: any) => {
      if (val.code === e) {
        setRoleId(val.id);
      }
    });
  };

  useEffect(() => {
    getRolesMenu(roleId)
      .then((response) => {
        setSettingsJson(response.data.menus.activeMenus);
        setJsonEditorSrcSettings(response.data.menus.activeMenus);
        setDefaultSettingsJson(response.data.menus.defaultMenus);
      })
      .catch((error) => {
        store.dispatch(
          showToast({
            type: "danger",
            title: "Error",
            message: getErrorMessage(error),
          })
        );
      })
      .finally(() => {
        dispatch(setPageLoadingStatus({ isPageLoading: false }));
      });
  }, [roleId]);

  const toggleRolePopover = (event: any) => {
    // get Coordinates dynamically

    const { x, y } = getXYPosition(event.currentTarget);

    event.currentTarget.nextSibling.style.left = `${x - 230}px`;
    event.currentTarget.nextSibling.style.top = `${y - 10}px`;
    event.currentTarget.nextSibling.classList?.toggle("d-none");
  };

  useEffect(() => {
    store.dispatch(
      setHeaderTitleText({
        headerTitle: "",
      })
    );

    getRoles({ isActive: true })
      .then((response) => {
        const validRoles: IRole[] = [];
        response.data.roles.map((val: any) => {
          if (val.level !== 0) {
            validRoles.push({
              name: val.name,
              code: val.code,
              level: val.level,
              id: val.id,
            });
            if (val.code === defaultRoleCode) {
              setSelectedRole(val.code);
              setRoleId(val.id);
              onRoleSelect(val.code);
            }
          }
        });
        setRoles(validRoles);
      })
      .catch((error) => {
        store.dispatch(
          showToast({
            type: "danger",
            title: "Error",
            message: getErrorMessage(error),
          })
        );
      });
  }, []);

  const onJSONEdit = useCallback((e: any): boolean => {
    if (e.jsObject === undefined) {
      setUpdatedSettingsJson({});
      setJsonEditorSrcSettings({});
      setJsonEdited(true);
      return false;
    }

    setUpdatedSettingsJson(e.jsObject);
    setJsonEditorSrcSettings(e.jsObject);
    setJsonEdited(true);
    return true;
  }, []);

  const fetchRoleFromCode = (code: string): any => {
    for (let i = 0; i < roles.length; i += 1) {
      if (roles[i].code === code) {
        return roles[i];
      }
    }
    return null;
  };

  const saveUpdatedJson = () => {
    dispatch(setPageLoadingStatus({ isPageLoading: true }));
    const role = fetchRoleFromCode(selectedRole);
    const { id } = role;
    patchMenu(id, updatedSettingsJson)
      .then(() => {
        store.dispatch(
          showToast({
            type: "success",
            title: "Success",
            message: "Settings JSON updated successfully",
          })
        );
        setSettingsJson(updatedSettingsJson);
        setJsonEditorSrcSettings(updatedSettingsJson);
        setJsonEdited(false);
        if (preselectedRole.length > 0) {
          onRoleSelect(preselectedRole);
        }
      })
      .catch((error) => {
        const msg = getErrorMessage(error);
        store.dispatch(
          showToast({
            type: "danger",
            title: "Error",
            message: msg,
          })
        );
      })
      .finally(() => {
        dispatch(setPageLoadingStatus({ isPageLoading: false }));
        setPreSelectedRole("");
      });
  };

  const cancelEditModeModals = () => {
    const keyModals = document.getElementsByClassName("key-modal-cancel");
    const editModals = document.getElementsByClassName("edit-cancel");
    Array.from(keyModals).forEach((modal: any) => {
      triggerClickEvent(modal);
    });
    Array.from(editModals).forEach((modal: any) => {
      triggerClickEvent(modal);
    });
  };

  const onConfirmationModalSelection = (status: boolean) => {
    if (status) {
      saveUpdatedJson();
    } else {
      setJsonEdited(false);
      cancelEditModeModals();
      onRoleSelect(preselectedRole);
      setPreSelectedRole("");
    }
  };

  const resetJsonCallback = (status: boolean) => {
    if (status) {
      setJsonEditorSrcSettings(defaultSettingsJson);
      setJsonEdited(true);
      setUpdatedSettingsJson(defaultSettingsJson);
      setShowConfirmationModal(false);
      store.dispatch(
        showToast({
          type: "warning",
          title: "Reset",
          message: "Data in the JSON Editor is reset to default state.",
        })
      );
    }
  };

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
  return (
    <Wrapper className="d-flex flex-column p-3">
      <MenuWrapper className="" editMode={editModeEnabled}>
        <h1 className="menuheading" aria-label="Menu" data-testid="test-client">
          Menu
        </h1>
        <p data-testid="title">Select Roles</p>
        <div className="drop-down-wrapper col-md-12 col-lg-4 p-0">
          <select
            value={selectedRole}
            className="form-control"
            data-testid="roles-dropdown"
            aria-label="roles dropdown"
            onChange={(e) => {
              if (jsonEdited) {
                handleUnsavedChanges(e.target.value);
              } else {
                onRoleSelect(e.target.value);
              }
            }}
            onClick={(e) => {
              setResetJson(false);
              dropDownToggler(e);
            }}
            onBlur={(e) => {
              dropDownDefaultState(e);
            }}
          >
            {roles.map((item) => {
              return (
                <option key={item.code} value={item.code}>
                  {item.name}
                </option>
              );
            })}
          </select>
          <i className="aha-icon-arrow-down forModal" />
        </div>
        <div className="editor-title-wrapper">
          <p className="editor-title m-0">
            {editModeEnabled ? "JSON Editor" : "JSON Viewer"}
          </p>
          <div className="d-flex">
            <div className="circleSec tooltip-role-bkp">
              <button
                role="link"
                type="button"
                aria-describedby="Json_description"
                onMouseOver={(e) => toggleRolePopover(e)}
                onFocus={(e) => toggleRolePopover(e)}
                onMouseOut={(e) => toggleRolePopover(e)}
                onBlur={(e) => toggleRolePopover(e)}
                onClick={() => {
                  openInNewTab(`/settings/${roleCode}`);
                }}
                onKeyUp={(e) => {
                  if (e.key === "Enter" || e.key === "Spacebar") {
                    openInNewTab(`/settings/${roleCode}`);
                  }
                }}
                className="title-buttons my-0 circleWrapper border-0"
              >
                <span tabIndex={-1} className="circleCount">
                  <img
                    src="/images/Icons-New-Window.svg"
                    alt=""
                    className="mb-1"
                  />
                  <u className=" px-1">View Schema</u>
                </span>
              </button>
              <div
                aria-labelledby="Json_heading"
                aria-describedby="Json_description"
                role="tooltip"
                className="roleSec d-none"
              >
                <h3 id="Json_heading">JSON Schema</h3>
                <p
                  id="Json_description"
                  aria-label="This link redirects to another tab where user can perform JSON based format for defining the structure of A H A side
                  navigation. JSON Schema is intended to define validation,
                  documentation, hyperlink navigation and interaction control of
                  JSON data."
                >
                  JSON based format for defining the structure of AHA side
                  navigation. JSON Schema is intended to define validation,
                  documentation, hyperlink navigation and interaction control of
                  JSON data.
                </p>
              </div>
            </div>
            {!editModeEnabled && (
              <button
                aria-label="Edit JSON"
                type="button"
                className="title-buttons"
                onClick={() => {
                  setEditModeEnabled(!editModeEnabled);
                }}
              >
                <img
                  src="/images/Edit.svg"
                  alt="Edit Button"
                  className="mb-1"
                />
              </button>
            )}
            {editModeEnabled && (
              <button
                aria-label="Reset JSON"
                type="button"
                className="title-buttons"
                onClick={() => {
                  toggleModalBg();
                  setResetJson(true);
                  setShowConfirmationModal(true);
                }}
              >
                <i className="aha-icon-reload reset-btn" />
              </button>
            )}
          </div>
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
        {editModeEnabled && (
          <div className="d-flex align-items-center mb-4 mt-4">
            <aui-button
              variant="link-style"
              buttontitle="Cancel"
              type="button"
              data-testid="cancel-btn"
              buttonclass=""
              onClick={() => {
                setEditModeEnabled(!editModeEnabled);
                setJsonEditorSrcSettings(settingsJson);
                setJsonEdited(false);
                cancelEditModeModals();
              }}
            />

            <aui-button
              id="save-btn"
              data-testid="save-btn"
              variant="primary"
              buttontitle="Save"
              buttonclass=""
              disabled={!jsonEdited}
              onClick={() => jsonEdited && saveUpdatedJson()}
            />
          </div>
        )}
        <Modal
          isShown={showConfirmationModal}
          status=""
          hide={toggleModalBg}
          roles={[]}
          modalContent={
            resetJson
              ? "Are you sure you want to reset the JSON values?"
              : `Do you want to save before changing role to ${
                  fetchRoleFromCode(preselectedRole)?.name
                }`
          }
          mainIcon={resetJson ? "reset-change" : "role-change"}
          callback={
            resetJson ? resetJsonCallback : onConfirmationModalSelection
          }
        />
      </MenuWrapper>
    </Wrapper>
  );
};
export default Menu;
