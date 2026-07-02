import React from "react";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import store from "app/store";
import NatsCredentialsAdd from "./index";

// Create a new query client for testing
const queryClient = new QueryClient();

describe("NatsCredentialsList Component", () => {
  it("renders add credentials", async () => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <NatsCredentialsAdd />
          </MemoryRouter>
        </QueryClientProvider>
      </Provider>
    );

    // Check if the main heading is rendered
    expect(screen.getByText(/Add NATS Credentials/i)).toBeInTheDocument();
  });
});
