import React, { useEffect, useRef, useState } from "react";
import NATSHeadingComp from "pages/Configuration/Nats/Streams/Details/NATSHeadingComp";
import { ClientListService } from "services/api/clients.api";
import CONSTANTS from "common/constants";
import { useMutation, useQuery } from "react-query";
import { logger } from "common/utils/logger.utils";
import { formatDataForMultiSelectFilter } from "pages/Users/util";
import { AddEventListenerToElement, getErrorMessage } from "common/utils";
import { CreateNatsEntity } from "services/api/nats.api";
import store from "app/store";
import { showToast } from "components/Toast/toast.slice";
import { useNavigate } from "react-router-dom";
import { IEntityCreateRequestAPI } from "pages/Configuration/models";
import JsonConfigurationComp from "./JsonConfigurationComp";
import { AddEntityStylesWrapper } from "./styled";

const AddEntity = () => {
  const nameFieldRef = useRef<any>(null);
  const sourceMultiSelectRef = useRef<any>(null);

  const [isDisabled, setIsDisabled] = useState(true);

  const navigate = useNavigate();

  const [addEntityFormData, setAddEntityFormData] = useState({
    form_data: {
      name: "",
      sources: [],
      json_schema: {},
    },
    form_error_data: {
      name: "",
      sources: "",
      json_schema: "",
    },
  });

  const NameInputField = (
    <div className="col-md-6 col-sm-6 col-lg-4">
      <aui-input
        placeholder="Enter Name"
        inputid="nameInputField"
        clearable
        direction="column"
        label="Name"
        ref={nameFieldRef}
        required
      />
      {/* Show error message */}
      {addEntityFormData?.form_error_data?.name && (
        <p className="text-danger">
          {addEntityFormData?.form_error_data?.name}
        </p>
      )}
    </div>
  );

  const { data: clientSources } = useQuery(
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

  /* Add event Listeners */
  const getNameFieldInput = async (event: any) => {
    const value = event.detail;
    setAddEntityFormData((prev: any) => {
      return {
        ...prev,
        form_data: {
          ...prev?.form_data,
          name: value,
        },
      };
    });
  };

  AddEventListenerToElement(
    document.querySelector("aui-input"),
    "auiInputChange",
    getNameFieldInput
  );

  const getMultiSelectSources = async () => {
    const selectedSources =
      await sourceMultiSelectRef.current?.getCurrentValue();
    setAddEntityFormData((prev: any) => {
      return {
        ...prev,
        form_data: {
          ...prev?.form_data,
          sources: selectedSources?.map((item: any) => item?.value),
        },
      };
    });
  };

  AddEventListenerToElement(
    document.querySelector("aui-multiselect"),
    "auiMultiselectChange",
    getMultiSelectSources
  );

  const SourcesMultiSelectDropdown = (
    <div className="col-6 col-md-6 col-lg-4 pb-3 ml-4 mt-minus2">
      <aui-multiselect
        options={`${JSON.stringify(
          formatDataForMultiSelectFilter(clientSources)
        )}`}
        iconbackground
        placeholder="Select Sources"
        multiselectid="sources-multiselect-dropdown"
        label="Sources"
        labelgrid="col-sm-3"
        multiselectgrid="col-sm-9"
        direction="column"
        ref={sourceMultiSelectRef}
        searchable
        required
      />
    </div>
  );

  /* Event Listener for json schema selection */
  const jsonSchemaChange = (jsonSchemaObj: any) => {
    setAddEntityFormData((prev: any) => {
      return {
        ...prev,
        form_data: {
          ...prev?.form_data,
          json_schema: jsonSchemaObj,
        },
      };
    });
  };

  function validateNameField(nameFieldVal: string) {
    const regex = /^[A-Za-z_]+$/;
    return regex.test(nameFieldVal);
  }

  const navigateToEntityListingPage = () => {
    // navigate to Entity Listing Page
    navigate(CONSTANTS.PAGE_ROUTES.NATS_ENTITIES_LISTING);
  };

  useEffect(() => {
    /* clear form data errors */
    setAddEntityFormData((prev: any) => {
      return {
        ...prev,
        form_error_data: {
          ...prev?.form_error_data,
          name: "",
          sources: "",
          json_schema: "",
        },
      };
    });
    const hasJsonSchemaValue =
      Object.keys(addEntityFormData?.form_data?.json_schema).length > 0;
    if (
      addEntityFormData?.form_data?.name &&
      addEntityFormData?.form_data?.sources?.length > 0 &&
      hasJsonSchemaValue
    ) {
      setIsDisabled(false);
    } else setIsDisabled(true);
  }, [addEntityFormData.form_data]);

  const { mutate } = useMutation(CreateNatsEntity, {
    onSuccess: () => {
      store.dispatch(
        showToast({
          type: "success",
          title: "Success",
          message: "Entity created successfully",
        })
      );

      navigateToEntityListingPage();
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

  const validateFormDataSubmit = () => {
    /* Validate Name Field */
    const isNameFieldValid = validateNameField(
      addEntityFormData?.form_data?.name
    );

    if (!isNameFieldValid) {
      setAddEntityFormData((prev: any) => {
        return {
          ...prev,
          form_error_data: {
            ...prev?.form_error_data,
            name: "Name Should contain only alphabets and underscore.",
          },
        };
      });
    } else {
      /* Create api request payload */
      const entityReqData: IEntityCreateRequestAPI = {
        name: addEntityFormData?.form_data?.name,
        json_schema: addEntityFormData?.form_data?.json_schema,
        sources: addEntityFormData?.form_data?.sources,
      };

      mutate(entityReqData);
    }
  };
  return (
    <AddEntityStylesWrapper>
      {/* Heading */}
      <NATSHeadingComp
        ariaLabel="Add Entity"
        dataTestID="add-entity"
        headingLabel="Add Entity"
      />

      <div className="mt-2">
        <p className="note m-0">
          Field marked with an asterisk (*) are mandatory
        </p>
      </div>

      <div className="row justify-content-start mt-4 mb-3">
        {NameInputField}
        {SourcesMultiSelectDropdown}
      </div>

      {/* Notification Banner */}
      <aui-alert type="info">
        <p className="mb-0 font-500" id="alert">
          JSON schema must be defined using a Draft 7 version for creating a new
          entity
        </p>
      </aui-alert>

      {/* JSON Schema Section */}
      <JsonConfigurationComp jsonSchemaChange={jsonSchemaChange} />

      {/* CTA Section */}
      <div className="d-flex justify-content-end mt-4 border-top-btnsec align-items-center filters-padding mob-padding-btn">
        <aui-button
          buttontitle="Cancel"
          type="button"
          variant="link-style"
          onClick={navigateToEntityListingPage}
        />
        <aui-button
          variant="primary"
          buttontitle="Create"
          buttonclass="Addbtn"
          disabled={isDisabled}
          onClick={() => {
            validateFormDataSubmit();
          }}
        />
      </div>
    </AddEntityStylesWrapper>
  );
};

export default AddEntity;
