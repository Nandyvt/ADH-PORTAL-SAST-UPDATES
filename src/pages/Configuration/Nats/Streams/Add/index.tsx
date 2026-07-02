import store from "app/store";
import CONSTANTS from "common/constants";
import {
  applyStylesToShadowDomElement,
  formatOptionsForClientDropdown,
  getErrorMessage,
  passAuiObject,
} from "common/utils";
import { logger } from "common/utils/logger.utils";
import { showToast } from "components/Toast/toast.slice";
import { IStreamCreateRequestAPI } from "pages/Configuration/models";
import React, { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { ClientListService } from "services/api/clients.api";
import { CreateNatsStream } from "services/api/nats.api";
import { NatsStreamsAddStyled } from "./styled";

const NatsCredentialsAdd2 = () => {
  const navigate = useNavigate();
  const [addForm, setAddForm] = useState<any>({
    code: "",
    streamName: "",
    retention: "Interest",
    discard: "New",
    maxAgeCategory: "Days",
    maxAgeTime: "7",
    description: "",
  });

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

  //   client handler
  const clientDropdownRef: any = useRef({});
  const handleClientDropdownChange = (event: any) => {
    setAddForm((prev: any) => {
      return {
        ...prev,
        code: event?.detail?.value,
      };
    });
  };

  //   retention handler
  const retentionDropdownRef: any = useRef({});
  const handleRetentionDropdownChange = (event: any) => {
    setAddForm((prev: any) => {
      return {
        ...prev,
        retention: event?.detail?.value,
      };
    });
  };
  const retentionPolicyOptions = [
    {
      label: "Interest",
      value: "Interest",
    },
    {
      label: "WorkQueue",
      value: "WorkQueue",
    },
    {
      label: "Limits",
      value: "Limits",
    },
  ];

  //   discard handler
  const discardDropdownRef: any = useRef({});
  const handleDiscardDropdownChange = (event: any) => {
    setAddForm((prev: any) => {
      return {
        ...prev,
        discard: event?.detail?.value,
      };
    });
  };
  const discardOptions = [
    {
      label: "Old",
      value: "Old",
    },
    {
      label: "New",
      value: "New",
    },
  ];

  //   age handler
  const maxAgeDropdownRef: any = useRef({});
  const maxAgeInputRef: any = useRef({});
  const handleMaxAgeDropdownChange = (event: any) => {
    maxAgeInputRef.current?.clearValue();
    setAddForm((prev: any) => {
      return {
        ...prev,
        maxAgeCategory: event?.detail?.value,
      };
    });
  };
  const handleMaxAgeInputChange = (event: any) => {
    setAddForm((prev: any) => {
      return {
        ...prev,
        maxAgeTime: event?.target?.value,
      };
    });
  };
  const maxAgeOptions = [
    {
      label: "Hours",
      value: "Hours",
    },
    {
      label: "Days",
      value: "Days",
    },
    {
      label: "Weeks",
      value: "Weeks",
    },
    {
      label: "Months",
      value: "Months",
    },
  ];

  //   stream name handler
  const streamNameRef: any = useRef({});
  const dynamicStreamNameObj = {
    ui_text: "ENV_{ClientCode}",
    api_request: "",
  };
  const [dynamicStreamName, setDynamicStreamName] =
    useState(dynamicStreamNameObj);
  const generateStreamName = () => {
    const envName = process.env.REACT_APP_MY_ENV;
    const ClientCode = addForm?.code;
    setDynamicStreamName({
      ...dynamicStreamName,
      ui_text: `${envName?.toUpperCase()}_${ClientCode ?? ""}`,
    });
  };
  const handleStreamNameChange = (event: any) => {
    setAddForm((prev: any) => {
      // Safely extract and default to an empty string
      const value = event?.target?.value ?? "";

      return {
        ...prev,
        // Now it's safe to call `.toUpperCase()` on `value`
        streamName: value.toUpperCase(),
      };
    });
  };

  //   description handler
  const descriptionRef: any = useRef({});
  const handleDescriptionChange = (event: any) => {
    setAddForm((prev: any) => {
      return {
        ...prev,
        description: event?.detail,
      };
    });
  };

  useEffect(() => {
    clientDropdownRef.current?.addEventListener(
      "auiDropdownChange",
      handleClientDropdownChange
    );

    retentionDropdownRef.current?.addEventListener(
      "auiDropdownChange",
      handleRetentionDropdownChange
    );

    discardDropdownRef.current?.addEventListener(
      "auiDropdownChange",
      handleDiscardDropdownChange
    );

    maxAgeDropdownRef.current?.addEventListener(
      "auiDropdownChange",
      handleMaxAgeDropdownChange
    );

    maxAgeInputRef.current?.addEventListener("input", handleMaxAgeInputChange);

    // NATS Stream Add Page Styling start
    applyStylesToShadowDomElement("stream-name-field", "input-stream-name", {
      paddingLeft: "12rem",
    });
    document
      .querySelectorAll<any>("aui-dropdown")
      ?.forEach((item: any) =>
        item?.shadowRoot
          ?.querySelector(".aui-dropdown-wrapper label")
          ?.setAttribute("style", "padding-left:0 !important")
      );
    // NATS Stream Add Page Styling end
    streamNameRef.current?.addEventListener("input", handleStreamNameChange);

    descriptionRef.current?.addEventListener(
      "auiTextareaChange",
      handleDescriptionChange
    );

    return () => {
      clientDropdownRef.current?.removeEventListener(
        "auiDropdownChange",
        handleClientDropdownChange
      );
      retentionDropdownRef.current?.removeEventListener(
        "auiDropdownChange",
        handleRetentionDropdownChange
      );
      discardDropdownRef.current?.removeEventListener(
        "auiDropdownChange",
        handleDiscardDropdownChange
      );
      maxAgeDropdownRef.current?.removeEventListener(
        "auiDropdownChange",
        handleMaxAgeDropdownChange
      );
      maxAgeInputRef.current?.removeEventListener(
        "input",
        handleMaxAgeInputChange
      );
      streamNameRef.current?.removeEventListener(
        "input",
        handleStreamNameChange
      );
      descriptionRef.current?.removeEventListener(
        "auiTextareaChange",
        handleDescriptionChange
      );
    };
  }, [
    handleClientDropdownChange,
    handleRetentionDropdownChange,
    handleDiscardDropdownChange,
    handleMaxAgeDropdownChange,
    handleMaxAgeInputChange,
    handleStreamNameChange,
    handleDescriptionChange,
  ]);

  // API call POST using useQuery
  const { mutate } = useMutation(CreateNatsStream, {
    onSuccess: () => {
      store.dispatch(
        showToast({
          type: "success",
          title: "Success",
          message: "NATS Stream created successfully",
        })
      );

      // navigate to stream Listing Page
      navigate(CONSTANTS.PAGE_ROUTES.NATS_STREAM_LISTING);
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

  //   Is Disabled and form use effect
  const [isDisabled, setIsDisabled] = useState(true);
  useEffect(() => {
    if (clientDropdownRef.current) {
      if (addForm?.code !== "") {
        generateStreamName();
      } else {
        setDynamicStreamName(dynamicStreamNameObj);
      }
    }

    const hasRequiredFields =
      addForm?.code && addForm?.retention && addForm?.discard;
    const isLimitRetention = addForm?.retention === "Limits";
    const hasMaxAge = addForm?.maxAgeCategory && addForm?.maxAgeTime;

    if (
      hasRequiredFields &&
      (!isLimitRetention || (isLimitRetention && hasMaxAge))
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [addForm]);

  const onClickSubmitHandler = async () => {
    if (addForm?.code && addForm?.retention && addForm?.discard) {
      if (
        addForm?.retention === "Limits" &&
        !addForm?.maxAgeCategory &&
        !addForm?.maxAgeTime
      ) {
        store.dispatch(
          showToast({
            type: "danger",
            title: "Error Occurred",
            message: "Please select Max Age when Retention Policy is Limits",
          })
        );
        return false;
      }

      const searchObject = clients.find(
        (client: any) => client.code === addForm?.code
      );

      let maxAge = "";
      if (addForm?.maxAgeCategory && addForm?.maxAgeTime) {
        const maxAgeTime = parseInt(addForm.maxAgeTime, 10);

        const conversionFactors: any = {
          Hours: 1,
          Days: 24,
          Weeks: 24 * 7,
          Months: 24 * 30,
        };

        const factor = conversionFactors[addForm.maxAgeCategory];
        if (factor !== undefined) {
          maxAge = `${maxAgeTime * factor}h`;
        }
      }

      if (searchObject?.code) {
        const streamData: IStreamCreateRequestAPI = {
          clientCode: searchObject?.code,
          name: addForm?.streamName,
          description: addForm?.description,
          streamConfig: {
            discard: addForm?.discard,
            retention: addForm?.retention,
            maxAge,
          },
        };

        mutate(streamData);
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

  return (
    <NatsStreamsAddStyled>
      {/* Heading Comp Code */}
      <div className="header">
        <h1>{CONSTANTS.BREADCRUMB_HEADING.ADD_NATS_STREAM}</h1>
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
                ref={clientDropdownRef}
                dropdownid="dropdown-client-name"
                placeholder="Select Client"
                label="Client"
                direction="column"
                options={
                  passAuiObject(formatOptionsForClientDropdown(clients)) ?? []
                }
                clearable
                required
                requiredmessage="Client is Mandatory"
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
              key="stream-name"
            >
              <span
                className="custom-clientCode-streamName-label"
                title={dynamicStreamName.ui_text}
              >
                {dynamicStreamName.ui_text ?? ""}
              </span>
              <aui-input
                ref={streamNameRef}
                id="stream-name-field"
                placeholder="Enter Stream Name"
                label="Stream Name"
                direction="column"
                required={false}
                labelgrid="col-sm-3"
                inputgrid="col-sm-9 demo123"
                enablefocus={false}
                errorstate={false}
                errormessage="Should contain only alphabets,special Character(_)"
                inputid="input-stream-name"
                value={addForm?.streamName}
              />
            </div>
          </div>
          <div className="row">
            <div
              className="col-lg-6 col-md-6 col-sm-12 col-12 margin-top-filter"
              key="retention-policy"
            >
              <aui-dropdown
                ref={retentionDropdownRef}
                id="retention-policy"
                placeholder="Select Retention Policy"
                label="Retention Policy"
                required
                direction="column"
                options={passAuiObject(retentionPolicyOptions)}
                clearable
                searchable={false}
                enablefocus={false}
                labelgrid="col-sm-3"
                dropdowngrid="col-sm-9"
                value={passAuiObject({ label: "Interest", value: "Interest" })}
                iconbackground
              />
            </div>
            <div
              className="col-lg-6 col-md-6 col-sm-12 col-12 margin-top-filter max-age"
              key="max-age"
            >
              <div className="age-dropdown">
                <aui-dropdown
                  ref={maxAgeDropdownRef}
                  id="max-age"
                  placeholder="Select Age"
                  label="Max Age"
                  required={addForm?.retention === "Limits"}
                  direction="column"
                  options={passAuiObject(maxAgeOptions)}
                  value={passAuiObject({ label: "Days", value: "Days" })}
                  clearable
                  searchable={false}
                  enablefocus={false}
                  iconbackground={false}
                  dropdownclass="w-100"
                  dropdowngrid="col-lg-6"
                />
              </div>
              <div className="age-input" aria-label="Enter Max Age">
                <aui-input
                  ref={maxAgeInputRef}
                  id="max-age-field"
                  placeholder="Enter Max Age"
                  label=" "
                  direction="column"
                  required={false}
                  enablefocus={false}
                  errorstate={false}
                  type="number"
                  value={7}
                  errormessage="Should contain only numbers"
                  inputid="input-max-age"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div
              className="col-lg-6 col-md-6 col-sm-12 col-12 margin-top-filter"
              key="discard-policy"
            >
              <aui-dropdown
                ref={discardDropdownRef}
                id="discard-policy"
                placeholder="Select Discard Policy"
                label="Discard Policy"
                required
                direction="column"
                options={passAuiObject(discardOptions)}
                clearable
                searchable={false}
                enablefocus={false}
                labelgrid="col-sm-3"
                dropdowngrid="col-sm-9"
                value={passAuiObject({ label: "New", value: "New" })}
                iconbackground
              />
            </div>
            <div
              className="col-lg-6 col-md-6 col-sm-12 col-12 margin-top-filter"
              key="description"
            >
              <aui-textarea
                ref={descriptionRef}
                placeholder="A Stream to handle data from source system. Max (255) characters.."
                label="Description"
                direction="column"
                required={false}
                labelgrid="col-sm-3"
                textareagrid="col-sm-9"
                minlength={2}
                maxlength={255}
                textareaid="input-stream-description"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-end mt-4 border-top-btnsec align-items-center filters-padding mob-padding-btn">
        <aui-button
          buttontitle="Cancel"
          type="button"
          variant="link-style"
          onClick={(e: any) => {
            e.preventDefault();
            navigate(CONSTANTS.PAGE_ROUTES.NATS_STREAM_LISTING);
          }}
        />
        <aui-button
          variant="primary"
          buttontitle="Create"
          buttonclass="Addbtn"
          disabled={isDisabled}
          onClick={(e: any) => {
            e.preventDefault();
            if (!isDisabled) onClickSubmitHandler();
          }}
        />
      </div>
    </NatsStreamsAddStyled>
  );
};

export default NatsCredentialsAdd2;
