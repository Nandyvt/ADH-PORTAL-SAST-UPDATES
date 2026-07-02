import styled from "styled-components";

export const HeadingLabelWrapper = styled.div`
  .menuheading {
    color: var(--primary-black);
    font-size: 1.875rem;
    opacity: 1;
    margin-bottom: 1.75rem;
    margin-top: 1.875rem;
    padding-bottom: 0.625rem;
    font-weight: 400;
    border-bottom: 1px solid var(--aui-header-borderclr);
  }
`;

export const BorderBottomStyles = styled.div`
  .border-bottom-styles {
    border-bottom: 2px solid var(--aui-header-borderclr);
    margin: 2rem 0rem;
  }
`;

export const consumerTypeFilterOptions = [
  {
    label: "Push",
    value: "push",
  },
  {
    label: "Pull",
    value: "pull",
  },
];

export const navigateToConsumerListingTab = (
  navigate: any,
  setChangeCompOnView: any
) => {
  // Get the current URL parameters
  const currentUrlParams = new URLSearchParams(window.location.search);

  // Set or update the 'view' query parameter
  currentUrlParams.delete("view");

  // Push the new URL with updated query parameters to history
  navigate(`${window.location.pathname}?${currentUrlParams.toString()}`);
  setChangeCompOnView("list-consumer");
};

export const validateOptionalFieldsState = (state: any) => {
  const errors: any = {};

  // Validate consumerConfig.maxAckPending
  const maxAckPendingRegex = /^[0-9]+$/;
  if (
    !!state.consumerConfig?.maxAckPending &&
    !maxAckPendingRegex.test(String(state.consumerConfig.maxAckPending))
  ) {
    errors.maxAckPending = "Max Ack Pending should contain only numbers.";
  }

  // Validate consumerConfig.name
  const consumerConfigNameRegex = /^[A-Za-z_]+$/;
  if (
    !!state.consumerConfig?.name &&
    (typeof state.consumerConfig.name !== "string" ||
      state.consumerConfig.name.trim() === "" ||
      !consumerConfigNameRegex.test(state.consumerConfig.name))
  ) {
    errors.consumerConfigName =
      "Consumer Name should contain only alphabets or special character(underscore)";
  }

  // Validate description
  if (
    !!state.description &&
    (typeof state.description !== "string" || state.description.trim() === "")
  ) {
    errors.description = "description should be a non-empty string.";
  }

  // Return errors object if any errors found, else return true
  if (Object.keys(errors).length > 0) {
    return { valid: false, errors };
  }
  return { valid: true };
};

export function validateMandatoryFieldsState(state: any, checkedCount: any) {
  const errors: any = {};

  // Validate clientCode
  if (!state.clientCode?.value || state.clientCode.value.trim() === "") {
    errors.clientCode = "clientCode should have a non-empty string value.";
  }

  // Validate streamId
  if (!state.streamId?.value || typeof state.streamId.value !== "number") {
    errors.streamId = "streamId should have a non-empty number value.";
  }

  // Validate type
  if (!state.type?.value || state.type.value.trim() === "") {
    errors.type = "type should have a non-empty string value.";
  }

  // subscription validation
  if (checkedCount === 0) {
    errors.subscription = "Please select at least one subscription.";
  }

  // Return errors object if any errors found, else return true
  if (Object.keys(errors).length > 0) {
    return { valid: false, errors };
  }
  return { valid: true };
}

export const modifyURLOnTabChange = (
  params: { [key: string]: string },
  setterFunc: any,
  navigateObj: any
) => {
  // Get the current URL parameters
  const currentUrlParams = new URLSearchParams(window.location.search);

  // Loop through the params object and update the URL parameters
  Object.keys(params).forEach((key) => {
    currentUrlParams.set(key, params[key]);
  });

  // react router dom v6 navigate object
  navigateObj(`${window.location.pathname}?${currentUrlParams.toString()}`);

  // Call the setter function to update state
  if (setterFunc) {
    setterFunc(params); // directly set the object with updated params
  }
};

export const generateFinalDataForSelectedSubscription = (
  subscriptionAllData: any,
  subscriptionSelectedData: any
) => {
  const finalData: any = [];

  // Group subscriptionSelectedData by source for easier comparison
  const partialEntitiesMap = subscriptionSelectedData.reduce(
    (acc: { [x: string]: any[] }, { source, entity }: any) => {
      if (!acc[source]) acc[source] = [];
      acc[source].push(entity);
      return acc;
    },
    {}
  );

  // Iterate over subscriptionAllData to compare with subscriptionSelectedData
  subscriptionAllData?.forEach(({ source, entities }: any) => {
    const partialEntities = partialEntitiesMap[source] || [];

    // Check if all entities are selected
    if (entities.every((entity: any) => partialEntities.includes(entity))) {
      finalData.push({ source, entity: "ALL" });
    } else {
      // Add individual entities if not all are selected
      const remainingEntities = partialEntities.filter((entity: any) =>
        entities.includes(entity)
      );
      remainingEntities.forEach((entity: any) => {
        finalData.push({ source, entity });
      });
    }
  });

  return finalData;
};

export const areSubscriptionsEqual = (
  subscriptionAllData: any,
  subscriptionSelectedData: any
) => {
  // Group subscriptionSelectedData by source for easier comparison
  const partialEntitiesMap = subscriptionSelectedData.reduce(
    (acc: { [x: string]: any[] }, { source, entity }: any) => {
      if (!acc[source]) acc[source] = [];
      acc[source].push(entity);
      return acc;
    },
    {}
  );

  // Iterate over subscriptionAllData to compare with subscriptionSelectedData
  const isEqual = subscriptionAllData?.every(({ source, entities }: any) => {
    const partialEntities = partialEntitiesMap[source] || [];

    // Check if both sets of entities have the same elements (same length and same items)
    return (
      entities.length === partialEntities.length &&
      entities.every((entity: any) => partialEntities.includes(entity))
    );
  });

  return isEqual;
};

export const truncatePrePopulateValue = (value: string, maxLength: number) => {
  return value?.length > maxLength ? `${value.slice(0, maxLength)}..` : value;
};
