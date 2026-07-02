import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Breadcrumbs from "./index";

describe("Breadcrumbs", () => {
  it("renders breadcrumbs correctly", () => {
    const routePath = "/users";
    render(
      <MemoryRouter initialEntries={[routePath]}>
        <Breadcrumbs routePath={routePath} />
      </MemoryRouter>
    );

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Users")).toBeInTheDocument();
  });
  it("renders ", () => {
    const routePath = "/dashboard";
    const { debug } = render(
      <MemoryRouter initialEntries={[routePath]}>
        <Breadcrumbs routePath={routePath} />
      </MemoryRouter>
    );

    const dashboard = screen.queryByText("Dashboard");
    expect(dashboard).toBeNull();
  });
});
