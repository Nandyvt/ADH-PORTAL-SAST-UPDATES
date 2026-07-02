import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react";
import * as notification from "services/api/notification.api";
import SettingsModal from "./index";

jest.mock("app/store", () => ({
  dispatch: jest.fn(),
}));

describe("SettingsModal", () => {
  const toggleModal = true;
  beforeEach(() => {
    jest
      .spyOn(notification, "UpdateClientNotificationTypeService")
      .mockResolvedValue({
        status: 200,
        data: {
          clients: [
            {
              id: 23,
              name: "ADH",
              createdAt: "2022-07-26T05:03:22Z",
              updatedAt: "2023-04-13T11:26:23Z",
              is_active: 0,
              types: [
                {
                  id: 3,
                  type: "HTTP",
                  status: "ACTIVE",
                  configId: 171,
                },
              ],
            },
            {
              id: 99,
              name: "aha-apl-packages",
              createdAt: "2022-12-28T10:55:50Z",
              updatedAt: "2022-12-28T10:55:50Z",
              is_active: 1,
              types: [
                {
                  id: 3,
                  type: "HTTP",
                  status: "INACTIVE",
                  configId: 146,
                },
              ],
            },
            {
              id: 1,
              name: "John",
              createdAt: "2022-08-03T10:14:44Z",
              updatedAt: "2022-08-03T10:14:44Z",
              is_active: 1,
              types: [
                {
                  id: 1,
                  type: "Email",
                  status: "ACTIVE",
                  configId: 144,
                },
              ],
            },
          ],
        },
        _pagination: {
          pageNumber: 1,
          pageOffset: 1,
          pageSize: 20,
          totalCount: 12,
          totalPages: 1,
          isFirst: 1,
          isLast: 1,
        },
        requestId: "a3c7884a39db70a17a9a924b4ea21437",
      });
  });
  it("should render the modal correctly", async () => {
    const selectedClient = {
      name: "Test Client",
      types: [
        { id: 1, type: "Type 1", status: "ACTIVE" },
        { id: 2, type: "Type 2", status: "INACTIVE" },
      ],
    };
    const { getByTestId, getByLabelText } = render(
      <SettingsModal
        selectedClient={selectedClient}
        setRefresh={jest.fn()}
        refresh={false}
        toggleModal={toggleModal}
        setToggleModal={jest.fn()}
        popoverEvent={jest.fn()}
      />
    );
    expect(getByTestId("modal-content")).toHaveTextContent(
      `Update ${selectedClient.name} notification type.`
    );
    expect(getByLabelText("Type 1")).toBeInTheDocument();
    expect(getByLabelText("Type 2")).toBeInTheDocument();
  });
  //   it("should render the modal correctly", async () => {
  //     const selectedClient = {
  //       name: "Test Client",
  //       types: [
  //         { id: 1, type: "HTTP", status: "ACTIVE" },
  //         { id: 2, type: "EMAIL", status: "INACTIVE" },
  //       ],
  //     };
  //     const tree = render(
  //       <SettingsModal
  //         selectedClient={selectedClient}
  //         setRefresh={jest.fn()}
  //         refresh={false}
  //         toggleModal={toggleModal}
  //         setToggleModal={jest.fn()}
  //         popoverEvent={jest.fn()}
  //       />
  //     );
  //     expect(tree).toMatchSnapshot();
  //   });

  it("should update notification types on submit", async () => {
    const selectedClient = {
      name: "Test Client",
      types: [
        { id: 1, type: "Type 1", status: "ACTIVE" },
        { id: 2, type: "Type 2", status: "INACTIVE" },
      ],
    };
    const { getByLabelText, getByText } = render(
      <SettingsModal
        selectedClient={selectedClient}
        setRefresh={jest.fn()}
        refresh={false}
        toggleModal={toggleModal}
        setToggleModal={jest.fn()}
        popoverEvent={jest.fn()}
      />
    );
    expect(getByLabelText("Type 1")).toBeChecked();
    expect(getByLabelText("Type 2")).not.toBeChecked();

    fireEvent.click(getByLabelText("Type 1"));
    fireEvent.click(getByText("Update"));

    await waitFor(() => {
      expect(
        notification.UpdateClientNotificationTypeService
      ).toHaveBeenCalled();
    });
    fireEvent.click(getByLabelText("Close"));
  });

  it("should cancel the modal", () => {
    const setToggleModal = jest.fn();
    const { getByText } = render(
      <SettingsModal
        selectedClient={null}
        setRefresh={jest.fn()}
        refresh={false}
        toggleModal={toggleModal}
        setToggleModal={setToggleModal}
        popoverEvent={jest.fn()}
      />
    );
    fireEvent.click(getByText("Cancel"));
    expect(setToggleModal).toHaveBeenCalledWith(false);
  });
  it("Check if api throws an error", async () => {
    jest
      .spyOn(notification, "UpdateClientNotificationTypeService")
      .mockResolvedValue({
        status: 500,
        error: {
          message: "Internal Server Error",
        },
      });
    const setToggleModal = jest.fn();
    const selectedClient = {
      name: "Test Client",
      types: [
        { id: 1, type: "HTTP", status: "ACTIVE" },
        { id: 2, type: "EMAIL", status: "INACTIVE" },
      ],
    };
    const { getByLabelText, getByText } = render(
      <SettingsModal
        selectedClient={selectedClient}
        setRefresh={jest.fn()}
        refresh={false}
        toggleModal={toggleModal}
        setToggleModal={setToggleModal}
        popoverEvent={jest.fn()}
      />
    );
    fireEvent.click(getByLabelText("HTTP"));
    fireEvent.click(getByText("Update"));
    await waitFor(() => {
      expect(
        notification.UpdateClientNotificationTypeService
      ).toHaveBeenCalled();
    });
  });
});
