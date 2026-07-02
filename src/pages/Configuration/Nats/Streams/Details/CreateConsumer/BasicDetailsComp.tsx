/* eslint-disable react/require-default-props */
import CONSTANTS from "common/constants";
import {
  applyStylesToShadowDomElement,
  formatOptionsForClientDropdown,
  passAuiObject,
} from "common/utils";
import { logger } from "common/utils/logger.utils";
import {
  consumerTypeFilterOptions,
  truncatePrePopulateValue,
} from "pages/Configuration/utils";
import React, { useEffect, useRef } from "react";
import { useQuery } from "react-query";
import { ClientListService } from "services/api/clients.api";
import { ListNatsStreams } from "services/api/nats.api";

export interface IConsumerStateProps {
  setInputFieldState: any;
  inputFieldState: any;
  defaultValuesState?: any;
}

const BasicDetailsComp = (props: IConsumerStateProps) => {
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
  const clientFieldRef = useRef<any>(null);
  const streamFieldRef = useRef<any>(null);
  const typeFieldRef = useRef<any>(null);
  const consumerNameFieldRef = useRef<any>(null);

  const prepopulateRef = useRef<any>(null);

  const clientDropdownField = (
    <div className="col-md-6 col-lg-6 col-sm-6 mb-2">
      <aui-dropdown
        id="client-field"
        dropdownid="client-field"
        label="Client"
        placeholder="Select Client"
        labelgrid="col-sm-3"
        dropdowngrid="col-sm-9"
        direction="column"
        clearable
        iconbackground
        searchable
        required
        options={passAuiObject(formatOptionsForClientDropdown(clients)) ?? []}
        ref={clientFieldRef}
      />
    </div>
  );

  /* API Call */
  const { data: streamsListDropdown } = useQuery(
    "stream-list-create-consumer",
    () => ListNatsStreams({ pageSize: CONSTANTS.MAX_RECORDS }),
    {
      select: (data) => {
        const { streams } = data?.data ?? {};
        return streams?.map((stream: any) => ({
          label: stream?.name,
          value: stream?.ID,
        }));
      },
    }
  );

  const streamDropdownField = (
    <div className="col-md-6 col-lg-6 col-sm-6 mb-2">
      <aui-dropdown
        id="stream-field"
        dropdownid="stream-field"
        label="Stream"
        placeholder="Select Stream"
        labelgrid="col-sm-3"
        dropdowngrid="col-sm-9"
        direction="column"
        clearable
        iconbackground
        searchable
        required
        options={passAuiObject(streamsListDropdown)}
        ref={streamFieldRef}
        value={
          streamsListDropdown
            ? JSON.stringify(props?.defaultValuesState?.streamId)
            : { label: "", value: "" }
        }
      />
    </div>
  );

  const typeDropdownField = (
    <div className="col-md-6 col-lg-6 col-sm-6 mt-lg-4 mb-2 mt-md-3  mt-sm-3">
      <aui-dropdown
        id="type-field"
        dropdownid="type-field"
        label="Type"
        placeholder="Select Type"
        labelgrid="col-sm-3"
        dropdowngrid="col-sm-9"
        direction="column"
        clearable
        iconbackground
        required
        options={passAuiObject(consumerTypeFilterOptions)}
        ref={typeFieldRef}
        value={JSON.stringify(props.defaultValuesState.type)}
      />
    </div>
  );

  const prepopulateCombinedTruncatedVal =
    `${
      truncatePrePopulateValue(props.inputFieldState?.streamId?.label, 14) ||
      truncatePrePopulateValue(props.defaultValuesState?.streamId?.label, 14) ||
      "<Stream>"
    }_` +
    `${
      truncatePrePopulateValue(props.inputFieldState?.clientCode?.label, 14) ||
      truncatePrePopulateValue(
        props.defaultValuesState?.clientCode?.label,
        14
      ) ||
      "<Client>"
    }_` +
    `${
      props.inputFieldState?.type?.label ||
      props.defaultValuesState?.type ||
      "<Type>"
    }`;

  const prepopulateCombinedVal =
    `${
      props.inputFieldState?.streamId?.label ||
      props.defaultValuesState?.streamId?.label ||
      "<Stream>"
    }_` +
    `${
      props.inputFieldState?.clientCode?.label ||
      props.defaultValuesState?.clientCode?.label ||
      "<Client>"
    }_` +
    `${
      props.inputFieldState?.type?.label ||
      props.defaultValuesState?.type ||
      "<Type>"
    }`;

  const ConsumerNameInputField = (
    <div className="col-md-6 col-lg-6 col-sm-6 mb-2 mt-lg-4">
      <span
        ref={prepopulateRef}
        className="custom-prepopulate-label d-none"
        title={prepopulateCombinedVal}
      >
        {prepopulateCombinedTruncatedVal}
      </span>
      <aui-input
        id="consumer-name-field"
        placeholder="Enter Consumer Name"
        label="Consumer Name"
        direction="column"
        labelgrid="col-sm-3"
        inputgrid="col-sm-9"
        enablefocus={false}
        errorstate={false}
        required={false}
        errormessage="Should contain only alphabets,special Character(_)"
        inputid="input-consumer-name"
        ref={consumerNameFieldRef}
      />
      {props.inputFieldState?.errorObj?.consumerConfigName && (
        <p className="text-danger">
          {props.inputFieldState?.errorObj?.consumerConfigName}
        </p>
      )}
    </div>
  );

  /* Attach Event Handlers */
  const handleClientDropdownChange = async () => {
    const clientDropdownData = await clientFieldRef?.current?.getCurrentValue();

    props.setInputFieldState((prevState: any) => {
      const updatedState = {
        ...prevState,
        clientCode: clientDropdownData,
      };
      return updatedState;
    });
  };

  const handleStreamDropdownChange = async () => {
    const newStreamId = await streamFieldRef?.current?.getCurrentValue();

    props.setInputFieldState((prevState: any) => {
      const updatedState = {
        ...prevState,
        streamId: newStreamId,
      };
      return updatedState;
    });
  };

  const handleTypeDropdownChange = async () => {
    const typeData = await typeFieldRef?.current?.getCurrentValue();

    props.setInputFieldState((prevState: any) => {
      const updatedState = {
        ...prevState,
        type: typeData,
      };
      return updatedState;
    });
  };

  const handleConsumerNameChange = (event: any) => {
    /* reset error object for consumer name */
    props.setInputFieldState((prevState: any) => ({
      ...prevState,
      errorObj: {
        ...prevState?.errorObj,
        consumerConfigName: "",
      },
    }));
    props.setInputFieldState((prevState: any) => ({
      ...prevState,
      consumerConfig: {
        ...prevState?.consumerConfig,
        name: event.detail,
      },
    }));
  };
  useEffect(() => {
    clientFieldRef.current?.addEventListener(
      "auiDropdownChange",
      handleClientDropdownChange
    );

    streamFieldRef.current?.addEventListener(
      "auiDropdownChange",
      handleStreamDropdownChange
    );

    typeFieldRef.current?.addEventListener(
      "auiDropdownChange",
      handleTypeDropdownChange
    );

    consumerNameFieldRef.current?.addEventListener(
      "auiInputChange",
      handleConsumerNameChange
    );

    // NATS Stream Add Page Styling start
    // add timeout to apply styles to shadow dom elements
    setTimeout(() => {
      applyStylesToShadowDomElement(
        "consumer-name-field",
        "input-consumer-name",
        {
          paddingLeft: "12rem",
        }
      );

      prepopulateRef?.current?.classList?.remove("d-none");
    }, 1000);

    return () => {
      clientFieldRef.current?.removeEventListener(
        "auiDropdownChange",
        handleClientDropdownChange
      );
      streamFieldRef.current?.removeEventListener(
        "auiDropdownChange",
        handleStreamDropdownChange
      );
      typeFieldRef.current?.removeEventListener(
        "auiDropdownChange",
        handleTypeDropdownChange
      );
      consumerNameFieldRef.current?.removeEventListener(
        "auiInputChange",
        handleConsumerNameChange
      );
    };
  }, []);

  return (
    <div className="row justify-content-start mt-4 mb-4">
      <div className="col-lg-10 d-flex flex-wrap p-0">
        {clientDropdownField}
        {streamDropdownField}
        {typeDropdownField}
        {ConsumerNameInputField}
      </div>
    </div>
  );
};

export default BasicDetailsComp;
