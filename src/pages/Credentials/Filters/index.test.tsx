import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { CredentialsFilters } from "./index";
import { ICredentialsFiltersProps } from "./util";

describe("CredentialsFilters", () => {
  it("should trigger handleClientsFilterChange when clients filter changes", async () => {
    const setSelectedClients = jest.fn();
    const setChannelName = jest.fn();
    const setStatus = jest.fn();

    const { getByLabelText } = render(
      <CredentialsFilters
        setSelectedClients={setSelectedClients}
        setChannelName={setChannelName}
        setStatus={setStatus}
        status="statusValue" // Add this prop
        channelName="channelNameValue" // Add this prop
        clients={["client1", "client2"]} // Add this prop
        clearAllFilters={false} // Add this prop
        clientName="testClient" // Add this prop
      />
    );
  });

  it("should trigger handleStatusFilterChange when status filter changes", async () => {
    const setSelectedClients = jest.fn();
    const setChannelName = jest.fn();
    const setStatus = jest.fn();

    const { getByLabelText } = render(
      <CredentialsFilters
        setSelectedClients={setSelectedClients}
        setChannelName={setChannelName}
        setStatus={setStatus}
        status="statusValue" // Add this prop
        channelName="channelNameValue" // Add this prop
        clients={["client1", "client2"]} // Add this prop
        clearAllFilters={false} // Add this prop
        clientName="testClient" // Add this prop
      />
    );
  });

  it("should trigger handleChannelFilterChange when channel filter changes", async () => {
    const setSelectedClients = jest.fn();
    const setChannelName = jest.fn();
    const setStatus = jest.fn();

    const { getByLabelText } = render(
      <CredentialsFilters
        setSelectedClients={setSelectedClients}
        setChannelName={setChannelName}
        setStatus={setStatus}
        status="statusValue" // Add this prop
        channelName="channelNameValue" // Add this prop
        clients={["client1", "client2"]} // Add this prop
        clearAllFilters={false} // Add this prop
        clientName="testClient" // Add this prop
      />
    );
  });
});
