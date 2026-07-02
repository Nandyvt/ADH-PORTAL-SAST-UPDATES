/* eslint-disable react/require-default-props */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { CreateNatsConsumer, ListSourceEntities } from "services/api/nats.api";
import store from "app/store";
import { showToast } from "components/Toast/toast.slice";
import { getErrorMessage } from "common/utils";
import { IBasicDetailsState } from "pages/Configuration/models";
import {
  generateFinalDataForSelectedSubscription,
  navigateToConsumerListingTab,
  validateMandatoryFieldsState,
  validateOptionalFieldsState,
} from "pages/Configuration/utils";
import { useSelector } from "react-redux";
import CONSTANTS from "common/constants";
import { logger } from "common/utils/logger.utils";
import { CreateConsumerStyles } from "./styled";
import BasicDetailsComp from "./BasicDetailsComp";
import AdditionalDetailsComp from "./AdditionalDetailsComp";
import SubscriptionComp from "./SubscriptionComp";

interface ICreateConsumerProps {
  setChangeCompOnView?: any;
}

const CreateConsumerComp = (props: ICreateConsumerProps) => {
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  /* Get Selected Stream from store */
  const streamDetailsObj = useSelector((state: any) => {
    return state?.streamDetails?.streamsDetailsData;
  });

  /* USeState for Subscription section - start */
  const [checkedItems, setCheckedItems] = useState<any>({});
  const [checkedCount, setCheckedCount] = useState(0);
  const [allSourcesChecked, setAllSourcesChecked] = useState(false);
  /* API call to get source entity mapping */
  const { data: sourceEntityData } = useQuery(
    "source-entity-list",
    () => ListSourceEntities({}),
    {
      select: (data: any) => {
        return data?.data?.sourceEntitiesMap;
      },
      onSuccess: () => {},
    }
  );
  /* USeState for Subscription section - end */

  const defaultValuesState = {
    clientCode: { label: "", value: "" },
    streamId: {
      label: streamDetailsObj?.name || "",
      value: streamDetailsObj?.ID || "",
    },
    type: { label: "Pull", value: "pull" },
    subscriptions: [],
    description: "",
    consumerConfig: {
      maxAckPending: 1000,
      name: "",
    },
    selectedSubscriptionCount: checkedCount,
    errorObj: {},
  };

  const [inputFieldState, setInputFieldState] =
    useState<IBasicDetailsState>(defaultValuesState);

  // Update inputFieldState when streamDetailsObj changes
  useEffect(() => {
    if (streamDetailsObj?.name && streamDetailsObj?.ID) {
      setInputFieldState((prevState) => ({
        ...prevState,
        streamId: {
          label: streamDetailsObj.name,
          value: streamDetailsObj.ID,
        },
      }));
    }
  }, [streamDetailsObj]);

  useEffect(() => {
    const validation = validateMandatoryFieldsState(
      inputFieldState,
      checkedCount
    );

    if (!validation.valid) {
      logger("Subscription Validation failed:", validation.errors);
      setIsDisabled(true);
    } else {
      logger("Subscription Validation passed!");
      setIsDisabled(false);
    }
  }, [
    inputFieldState.clientCode,
    inputFieldState.streamId,
    inputFieldState.type,
    checkedCount,
    streamDetailsObj,
  ]);

  // api call POST using useQuery
  const { mutate } = useMutation(CreateNatsConsumer, {
    onSuccess: () => {
      store.dispatch(
        showToast({
          type: "success",
          title: "Success",
          message: "NATS Consumer created successfully",
        })
      );

      // navigate to Consumer Listing Page
      navigateToConsumerListingTab(navigate, props.setChangeCompOnView);
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

  const getSubscriptionData = (dataObj: any) => {
    let result;

    if (allSourcesChecked) {
      result = [
        {
          source: "ALL",
          entity: "ALL",
        },
      ];
    } else {
      const selectedSubscriptionData = Object.keys(dataObj)
        .filter((key) => dataObj[key] === true && key.includes(":"))
        .map((key) => {
          const [source, entity] = key.split(":");
          return {
            source,
            entity,
          };
        });

      /* sourceEntityData - all data coming from api
      selectedSubscriptionData - selected subscriptions data
      */

      result = generateFinalDataForSelectedSubscription(
        sourceEntityData,
        selectedSubscriptionData
      );
    }

    return result;
  };

  function onClickSubmitHandler() {
    const validation = validateOptionalFieldsState(inputFieldState);

    if (!validation.valid) {
      logger("Validation Errors in consumer page:", validation.errors);
      setInputFieldState((prevState: any) => ({
        ...prevState,
        errorObj: validation.errors,
      }));
    } else {
      logger("Subscription optional fields Validation passed!");

      const apiReqData = {
        clientCode: inputFieldState?.clientCode?.value || "",
        streamId: Number(inputFieldState?.streamId?.value || 0),
        type: inputFieldState?.type?.value?.toUpperCase() || "",
        subscriptions: getSubscriptionData(checkedItems),
        description: inputFieldState?.description || "",
        consumerConfig: {
          name: inputFieldState?.consumerConfig?.name?.toUpperCase() || "",
          maxAckPending: Number(
            inputFieldState?.consumerConfig?.maxAckPending || 0
          ),
        },
      };

      mutate(apiReqData);
    }
  }

  return (
    <CreateConsumerStyles>
      {/* Heading Section */}
      <div className="heading">
        <h2>{CONSTANTS.BREADCRUMB_HEADING.ADD_NATS_CONSUMER}</h2>
      </div>

      <div className="mt-3">
        <p className="note m-0">
          Field marked with an asterisk (*) are mandatory
        </p>
      </div>

      {/* Basic Details Section */}
      <BasicDetailsComp
        setInputFieldState={setInputFieldState}
        inputFieldState={inputFieldState}
        defaultValuesState={defaultValuesState}
      />

      {/* Configuration Heading */}
      <div className="d-flex  mb-4 border-top-btnsec align-items-center">
        <h2 className="heading">Configuration Details</h2>
      </div>

      {/* Subscriptons - Custom Element */}
      <SubscriptionComp
        checkedItems={checkedItems}
        setCheckedItems={setCheckedItems}
        checkedCount={checkedCount}
        setCheckedCount={setCheckedCount}
        allSourcesChecked={allSourcesChecked}
        setAllSourcesChecked={setAllSourcesChecked}
        sourceEntityData={sourceEntityData}
      />

      {/* Additional Details Section */}
      <AdditionalDetailsComp
        setInputFieldState={setInputFieldState}
        inputFieldState={inputFieldState}
      />

      {/* CTA Section */}
      <div className="d-flex justify-content-end mt-4 border-top-btnsec align-items-center filters-padding mob-padding-btn">
        <aui-button
          buttontitle="Cancel"
          type="button"
          variant="link-style"
          onClick={(e: any) => {
            e.preventDefault();
            navigateToConsumerListingTab(navigate, props.setChangeCompOnView);
          }}
        />
        <aui-button
          variant="primary"
          buttontitle="Create"
          buttonclass="Addbtn"
          disabled={isDisabled}
          onClick={() => {
            if (!isDisabled) {
              onClickSubmitHandler();
            }
          }}
        />
      </div>
    </CreateConsumerStyles>
  );
};

export default CreateConsumerComp;
