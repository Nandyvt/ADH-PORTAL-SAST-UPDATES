import store from "app/store";
import CONSTANTS from "common/constants";
import {
  formatOptionsForClientDropdown,
  getErrorMessage,
  passAuiObject,
} from "common/utils";
import { logger } from "common/utils/logger.utils";
import { showToast } from "components/Toast/toast.slice";
import { ICredentialCreateAPI } from "pages/Configuration/models";
import React, { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { ClientListService } from "services/api/clients.api";
import { ListNatsStreams } from "services/api/nats.api";
import { CreateNatsCredentials } from "services/api/natsCredentials.api";
import { NatsCredentialAddStyled } from "./styled";

const NatsCredentialsAdd = () => {
  const navigate = useNavigate();
  const [addForm, setAddForm] = useState<any>({});

  // Get Clients List
  const { data: clients } = useQuery(
    "clients",
    () =>
      ClientListService({
        pageSize: CONSTANTS.MAX_RECORDS,
        pageNumber: 1,
        isActive: true,
      }),
    {
      select: (data) => data?.data?.clients,
      onError: (err) => logger("Error loading clients data ", err),
    }
  );

  // Get Streams Read and Write Access
  const { data: readStreamsData } = useQuery(
    "read-streams",
    () =>
      ListNatsStreams({
        pageNumber: 1,
        pageSize: 100,
        clientCode: "ADH",
        streamName: "ENV_HUB",
      }),
    {
      select: (data) => data?.data?.streams,
    }
  );
  const readStreamsListData = readStreamsData || [];

  const [showPasswordError, setShowPasswordError] = useState(false);
  const [passwordErrorMessages, setPasswordErrorMessages] = useState("");
  const [showUsernameError, setShowUsernameError] = useState(false);
  const [usernameErrorMessages, setUsernameErrorMessages] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const usernameRef: any = useRef({});
  const passwordRef: any = useRef({});
  const clientdropdownRef: any = useRef({});
  const [isLoading, setIsLoading] = useState(false);

  const handleUsernameChange = (event: any) => {
    setShowUsernameError(false);
    setAddForm((prev: any) => {
      return {
        ...prev,
        username: event.detail,
      };
    });
  };

  const handlePasswordChange = (event: any) => {
    setShowPasswordError(false);
    setAddForm((prev: any) => {
      return {
        ...prev,
        password: event.detail,
      };
    });
  };

  const [writeStreamsListData, setWriteStreamsListData] = useState<any>([]);
  const getWriteAccessList = async (clientCode: any) => {
    setIsLoading(true);
    await ListNatsStreams({
      pageNumber: 1,
      pageSize: 100,
      clientCode,
    })
      .then((data) => {
        setWriteStreamsListData(data?.data?.streams);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handleClientDropdownChange = (event: any) => {
    setAddForm((prev: any) => {
      return {
        ...prev,
        code: event?.detail?.value,
      };
    });
    if (event?.detail?.value) {
      getWriteAccessList(event?.detail?.value);
    }
  };

  const [selectedReadStreams, setSelectedReadStreams] = useState<any>([]);
  const [selectedWriteStreams, setSelectedWriteStreams] = useState<any>([]);
  const handleReadCheckboxChange = (event: any) => {
    const { detail } = event;
    const { value, label } = detail;

    if (value) {
      setSelectedReadStreams((prevState: any[]) => {
        return [...prevState, label];
      });
    } else {
      setSelectedReadStreams((prevState: any[]) => {
        return prevState.filter((stream: any) => stream !== label);
      });
    }
  };

  const handleWriteCheckboxChange = (event: any) => {
    const { detail } = event;
    const { value, label } = detail;

    if (value) {
      setSelectedWriteStreams((prevState: any[]) => {
        return [...prevState, label];
      });
    } else {
      setSelectedWriteStreams((prevState: any[]) => {
        return prevState.filter((stream: any) => stream !== label);
      });
    }
  };

  useEffect(() => {
    usernameRef.current?.addEventListener(
      "auiInputChange",
      handleUsernameChange
    );
    passwordRef.current?.addEventListener(
      "auiInputChange",
      handlePasswordChange
    );
    clientdropdownRef.current?.addEventListener(
      "auiDropdownChange",
      handleClientDropdownChange
    );

    const childReadCheckboxes: any = Array.from(
      document.querySelectorAll(`[checkboxid^="read-access-"]`)
    );

    childReadCheckboxes.forEach((checkbox: any) => {
      checkbox?.addEventListener("auiCheckboxChange", handleReadCheckboxChange);
    });

    const childWriteCheckboxes: any = Array.from(
      document.querySelectorAll(`[checkboxid^="write-access-"]`)
    );
    if (addForm?.code) {
      childWriteCheckboxes.forEach((checkbox: any) => {
        checkbox?.addEventListener(
          "auiCheckboxChange",
          handleWriteCheckboxChange
        );
      });
    }

    return () => {
      usernameRef.current?.removeEventListener(
        "auiInputChange",
        handleUsernameChange
      );
      passwordRef.current?.removeEventListener(
        "auiInputChange",
        handlePasswordChange
      );
      clientdropdownRef.current?.removeEventListener(
        "auiDropdownChange",
        handleClientDropdownChange
      );
      childReadCheckboxes.forEach((checkbox: any) => {
        checkbox?.removeEventListener(
          "auiCheckboxChange",
          handleReadCheckboxChange
        );
      });
      if (addForm?.code)
        childWriteCheckboxes.forEach((checkbox: any) => {
          checkbox?.removeEventListener(
            "auiCheckboxChange",
            handleWriteCheckboxChange
          );
        });
    };
  }, [
    handleUsernameChange,
    handlePasswordChange,
    handleClientDropdownChange,
    handleReadCheckboxChange,
    handleWriteCheckboxChange,
  ]);

  // API call POST using useQuery
  const { mutate } = useMutation(CreateNatsCredentials, {
    onSuccess: () => {
      store.dispatch(
        showToast({
          type: "success",
          title: "Success",
          message: "NATS Credential created successfully",
        })
      );

      // navigate to stream Listing Page
      navigate(CONSTANTS.PAGE_ROUTES.NATS_CREDENTIALS_LISTING);
    },
    onError: (apierror: any) => {
      store.dispatch(
        showToast({
          type: "danger",
          title: "Error Occurred",
          message: getErrorMessage(apierror),
        })
      );
    },
  });

  useEffect(() => {
    setAddForm((prev: any) => {
      return {
        ...prev,
        publishStreams: {
          list: selectedWriteStreams,
        },
        subscribeStreams: {
          list: selectedReadStreams,
        },
      };
    });
  }, [selectedReadStreams, selectedWriteStreams]);

  const getValue = (ref: any) => {
    return ref.current?.value || "";
  };

  useEffect(() => {
    if (
      usernameRef.current &&
      passwordRef.current &&
      clientdropdownRef.current
    ) {
      if (
        getValue(usernameRef) !== "" &&
        getValue(passwordRef) !== "" &&
        addForm.code !== ""
      ) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    }
  }, [addForm, isDisabled]);

  const onClickSubmitHandler = async () => {
    const usernameEdit = getValue(usernameRef);

    if (usernameEdit === "") {
      setShowUsernameError(true);
      setUsernameErrorMessages("");
      return false;
    }
    if (!CONSTANTS.REGEX.USERNAME.test(usernameEdit)) {
      setShowUsernameError(true);
      setUsernameErrorMessages(
        "Username should contain only alphabets and underscores"
      );
      return false;
    }
    setShowUsernameError(false);

    const passwordEdit = getValue(passwordRef);
    if (passwordEdit === "") {
      setShowPasswordError(true);
      setPasswordErrorMessages("");
      return false;
    }
    if (!CONSTANTS.REGEX.PASSWORD.test(passwordEdit)) {
      setShowPasswordError(true);
      setPasswordErrorMessages(
        "Password must contain min of 7 char, including at least one uppercase letter, one lowercase letter, one digit, and one special character from #$@!%&*?"
      );
      return false;
    }
    setShowPasswordError(false);

    if (getValue(usernameRef) && getValue(passwordRef) && addForm?.code) {
      const searchObject = clients.find(
        (client: any) => client.code === addForm?.code
      );

      if (searchObject?.code) {
        const credentialData: ICredentialCreateAPI = {
          clientCode: searchObject?.code,
          username: addForm?.username,
          password: addForm?.password,
          publishStreams: {
            list: addForm.publishStreams?.list,
          },
          subscribeStreams: {
            list: addForm.subscribeStreams?.list,
          },
        };

        mutate(credentialData);
      }
    } else {
      store.dispatch(
        showToast({
          type: "danger",
          title: "Error Occurred",
          message: "Please fill all mandatory fields",
        })
      );
    }

    return true;
  };

  // Change password type to text
  const [passwordType, setPasswordType] = useState("password");
  return (
    <NatsCredentialAddStyled>
      {/* Heading Comp Code */}
      <div className="header">
        <h1>Add NATS Credentials</h1>
      </div>

      <div className="mt-2">
        <p className="note m-0">
          Field marked with an asterisk (*) are mandatory
        </p>
      </div>

      <div className="row">
        <div className="col-lg-10">
          <div className="row">
            <div
              className="col-lg-6 col-md-6 col-sm-12 col-12 margin-top-filter"
              key="client-code"
            >
              <aui-dropdown
                ref={clientdropdownRef}
                dropdownid="dropdown-client-name"
                placeholder="Select Client"
                label="Client"
                direction="column"
                options={
                  passAuiObject(formatOptionsForClientDropdown(clients)) ?? []
                }
                clearable
                required
                requiredmessage="Client is required"
                searchable
                enablefocus={false}
                labelgrid="col-sm-3"
                dropdowngrid="col-sm-9"
                errorstate={false}
                iconbackground
              />
            </div>
            <div
              className="col-lg-6 col-md-6 col-sm-12 col-12 margin-top-filter"
              key="user-name"
            >
              <aui-input
                ref={usernameRef}
                id="user-name-field"
                placeholder="Enter Username"
                label="Username"
                direction="column"
                labelgrid="col-sm-3"
                inputgrid="col-sm-9 demo123"
                enablefocus={false}
                errorstate={false}
                required
                requiredmessage="Username is required"
                inputid={`input-${"user-name"}`.toLocaleLowerCase()}
              />
              {showUsernameError ? (
                <span
                  className="error-message"
                  aria-errormessage={usernameErrorMessages}
                >
                  {usernameErrorMessages}
                </span>
              ) : null}
            </div>
          </div>
          <div className="row">
            <div
              className="col-lg-6  col-md-6 col-sm-12 col-12 margin-top-filter"
              key="password"
            >
              <div>
                <aui-input
                  ref={passwordRef}
                  id="password-name-field"
                  placeholder="Enter Password"
                  label="Password"
                  direction="column"
                  type={passwordType}
                  labelgrid="col-sm-3"
                  inputgrid="col-sm-9 demo123"
                  enablefocus={false}
                  errorstate={false}
                  required
                  requiredmessage="Password is required"
                  inputid={`input-${"password"}`.toLocaleLowerCase()}
                />
                <div className="d-flex flex-column">
                  {showPasswordError ? (
                    <span
                      className="error-message"
                      aria-errormessage={passwordErrorMessages}
                    >
                      {` ${passwordErrorMessages} \n `}
                    </span>
                  ) : null}
                  <span className="password-helper-text">
                    Must be 7 or more characters and contain at least 1 number
                    and 1 special character.
                  </span>
                </div>
              </div>
              <button
                type="button"
                className="noBtnStyle mb-2 password-toggle"
                aria-label="View Password"
                onClick={() => {
                  if (passwordType === "password") {
                    setPasswordType("text");
                  } else {
                    setPasswordType("password");
                  }
                }}
              >
                <aui-icon
                  block
                  icon={passwordType === "password" ? "eye" : "eyeCPNT"}
                  svgclass=""
                  svgwidth="20"
                  svgheight="20"
                  pathclass=""
                  customcolor
                  fillcolor="#777979"
                  hovercolor="#777979"
                />
              </button>
            </div>
          </div>

          {/* Read Access Checkboxes */}
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12 margin-top-filter">
              <span className="checkbox-title">Read Access</span>
              <div className="d-flex flex-row flex-wrap read-access">
                {readStreamsListData?.map((stream: any) => (
                  <React.Fragment key={stream.name}>
                    <aui-checkbox
                      checkboxid={`read-access-${stream.name}`}
                      checkboxclass="mr-3"
                      label={stream.name}
                    />
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* Write Access Checkboxes */}
          <div className="row">
            {writeStreamsListData?.length > 0 &&
              addForm?.code.length > 0 &&
              !isLoading && (
                <div className="col-lg-12 col-md-12 col-sm-12 col-12 margin-top-filter mb-2">
                  <span className="checkbox-title">Write Access</span>
                  <div className="d-flex flex-row flex-wrap write-access">
                    {writeStreamsListData?.map((stream: any) => (
                      <React.Fragment key={stream.name}>
                        <aui-checkbox
                          checkboxid={`write-access-${stream.name}`}
                          checkboxclass="mr-3"
                          label={stream.name}
                        />
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-end mt-4 border-top-btnsec align-items-center filters-padding mob-padding-btn">
        <aui-button
          buttontitle="Cancel"
          variant="link-style"
          type="button"
          onClick={(e: any) => {
            e.preventDefault();
            navigate(CONSTANTS.PAGE_ROUTES.NATS_CREDENTIALS_LISTING);
          }}
        />
        <aui-button
          variant="primary"
          buttontitle="Create"
          buttonclass="Addbtn"
          disabled={isDisabled}
          onClick={() => {
            if (!isDisabled) onClickSubmitHandler();
          }}
        />
      </div>
    </NatsCredentialAddStyled>
  );
};

export default NatsCredentialsAdd;
