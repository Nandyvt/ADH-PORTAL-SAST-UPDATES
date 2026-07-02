import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { getUsers } from "services/api/user.api";
import AutoSuggestComp from "./index";

jest.mock("services/api/user.api", () => ({
  getUsers: jest.fn(),
}));

jest.useFakeTimers(); // 1. enable fake timers

test("renders AutoSuggest component with debounce", async () => {
  (getUsers as jest.Mock).mockResolvedValueOnce({
    data: {
      users: [{ email: "test1@example.com" }, { email: "test2@example.com" }],
    },
  });

  const onChangeHandler = jest.fn();
  const setIsError = jest.fn();
  const setSelectedUserLookup = jest.fn();
  const autoSuggestValue = "example@example.com";
  const setAutoSuggestValue = jest.fn();
  const register = jest.fn();

  const { getByPlaceholderText } = render(
    <AutoSuggestComp
      onChangeHandler={onChangeHandler}
      setIsError={setIsError}
      setSelectedUserLookup={setSelectedUserLookup}
      autoSuggestValue={autoSuggestValue}
      setAutoSuggestValue={setAutoSuggestValue}
      register={register}
    />
  );

  const autoSuggestInput = getByPlaceholderText("Type for Email LookUp");
  fireEvent.change(autoSuggestInput, { target: { value: "test" } });

  // 2. advance time by 1 second
  act(() => {
    jest.advanceTimersByTime(1000);
  });

  // Now the debounced callback has fired
  expect(getUsers).toHaveBeenCalledWith({ paramsData: { email: "test" } });
});
