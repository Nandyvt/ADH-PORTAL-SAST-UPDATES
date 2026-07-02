import React, { useState, useEffect, useCallback } from "react";
import Autosuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import store from "app/store";
import { showToast } from "components/Toast/toast.slice";
import { getUsers } from "services/api/user.api";
import { getErrorMessage } from "common/utils";
import { useDebouncedCallback } from "use-debounce";
import AutoSuggestStyles from "./styled";

const AutoSuggestComp = ({
  onChangeHandler,
  setIsError = () => {},
  setSelectedUserLookup = () => {},
  autoSuggestValue,
  setAutoSuggestValue,
  register,
}: any) => {
  /* Auto Suggest State changes  - start */
  const [autoSuggestData, setAutoSuggestData] = useState<any>([]);

  const [suggestionsList, setSuggestionsList] = useState<any[]>([]);

  // Autosuggest will call this function every time you need to clear suggestions.
  const onSuggestionsClearRequested = useCallback(() => {
    setSuggestionsList([]);
  }, []);

  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  const getSuggestionValue = useCallback((suggestion: any) => {
    return suggestion.email;
  }, []);

  const escapeRegexCharacters = (str: any) => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  };

  const getLookUpEmailsApi = (paramsObj: any, value: any) => {
    getUsers({ paramsData: paramsObj })
      .then((response: any) => {
        if (response.data.users === null) {
          setAutoSuggestData([]);
        } else {
          setAutoSuggestData(response.data.users);
        }
        return null;
      })
      .catch((error: any) => {
        store.dispatch(
          showToast({
            type: "danger",
            title: "Error Occurred",
            message: getErrorMessage(error),
          })
        );
      });
  };

  // Debounce call second parameter is time in milliseconds. It will wait for 1 second before making api call
  const debounced = useDebouncedCallback((value) => {
    value?.trim().length > 2 && getLookUpEmailsApi({ email: value }, value);
  }, 1000);

  const onSuggestionsFetchRequested = useCallback(
    ({ value, reason }: any) => {
      setIsError(false);
      // make api call with dynamic email string
      debounced(value);
    },
    [debounced]
  );

  useEffect(() => {
    const escapedValue = escapeRegexCharacters(autoSuggestValue?.trim());
    if (escapedValue === "") {
      setSuggestionsList([]);
    }

    const regex = new RegExp(`\\b${escapedValue}`, "i");

    const filteredList = autoSuggestData.filter((item: any) =>
      regex.test(item.email)
    );
    setSuggestionsList(filteredList);

    document
      .querySelector<any>(".react-autosuggest__suggestions-container")
      .setAttribute("aria-label", "PopoverSuggestion");
  }, [autoSuggestData]);

  // Use your imagination to render suggestions.
  const renderSuggestion = useCallback((suggestion: any, { query }: any) => {
    const matches = match(suggestion.email, query);
    const parts = parse(suggestion.email, matches);

    return (
      <span>
        {parts.map((part: any) => {
          const classNameSuggest = part.highlight
            ? "react-autosuggest__suggestion-match"
            : "";

          return (
            <span
              className={classNameSuggest}
              key={`${part.highlight}-${part.text}`}
            >
              {part.text}
            </span>
          );
        })}
      </span>
    );
  }, []);

  const onChangeHandlerAutoSuggest = (
    event: any,
    { newValue, method }: any
  ) => {
    onChangeHandler(event);
    setAutoSuggestValue(newValue);
    setIsError(false);
  };

  // Autosuggest will pass through all these props to the input.
  const inputProps = {
    type: "text",
    placeholder: "Type for Email LookUp",
    value: autoSuggestValue,
    onChange: onChangeHandlerAutoSuggest,
    className: "form-control",
    id: "emailid",
    name: "email",
    "aria-required": true,
    required: true,
    ref: register,
  };

  const shouldRenderSuggestions = useCallback((value: any, reason: any) => {
    return value?.trim().length > 2;
  }, []);

  const onSuggestionSelectedFunc = useCallback(
    (event: any, { suggestionValue }: any) => {
      setIsError(true);
      autoSuggestData
        .filter((item: any) => item.email === suggestionValue)
        .map((reducedItem: any) => setSelectedUserLookup(reducedItem.id));
    },
    [autoSuggestData]
  );

  /* Auto Suggest State changes  - end */

  return (
    <AutoSuggestStyles>
      <Autosuggest
        suggestions={suggestionsList}
        onSuggestionSelected={onSuggestionSelectedFunc}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        shouldRenderSuggestions={shouldRenderSuggestions}
      />
    </AutoSuggestStyles>
  );
};

export default AutoSuggestComp;
