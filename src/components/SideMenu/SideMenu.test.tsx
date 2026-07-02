import React from "react";

import { render, fireEvent } from "@testing-library/react";

import { BrowserRouter, Router } from "react-router-dom";

import { AHAMenu } from "./AHASideMenu";

const mockLocation = {
  pathname: "/users",
  search: "",
  hash: "",
  state: null,
  key: "testKey",
};
const menuData = [
  { path: "/dashboard", title: "Dashboard" },
  { path: "/clients", title: "Clients" },
  { path: "/users", title: "Users" },
  { path: "/credentials", title: "Credentials" },
  {
    child: [
      { path: "/transactionLogs", title: "Transactional Logs" },
      { path: "/dashboard", title: "NATS Monitoring" },
    ],
    title: "Data Hub",
  },
  { child: [{ path: "/settings", title: "Menu" }], title: "Settings" },
  {
    child: [{ path: "/dashboard", title: "Swagger Docs" }],
    title: "Documentation",
  },
  {
    child: [{ path: "/notifications", title: "Notifications" }],
    title: "Notifications",
  },
];

localStorage.setItem("Menus", JSON.stringify(menuData));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => mockLocation,
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

// Package dependency import mocks

jest.mock("pages/_layouts/componentUtil", () => ({
  useWindowDimensionOnPageResize: jest.fn(),
}));

jest.mock("common/utils", () => ({
  getSideMenuToggleStatus: jest.fn(),
  setSideMenuToggleStatus: jest.fn(),
  signOut: jest.fn(),
}));

let props = {
  buttonClick: false,
  setButtonClick: jest.fn(),
};

describe("SideMenu Component", () => {
  beforeEach(() => {
    jest.spyOn(React, "useEffect").mockImplementation((f) => f());
  });

  /* it("should match snapshot", () => {
    const { container } = render(
      <BrowserRouter>
        <AHAMenu {...props} />
      </BrowserRouter>
    );

    expect(container).toMatchSnapshot();
  }); */

  it("renders the SideMenuWrapper component", () => {
    const { getByRole } = render(
      <BrowserRouter>
        <AHAMenu {...props} />
      </BrowserRouter>
    );

    const sideMenu = getByRole("group");
    expect(sideMenu).toBeInTheDocument();
  });

  it("expands the menu when the expand button is clicked", () => {
    props = {
      buttonClick: true,
      setButtonClick: jest.fn(),
    };
    const { getByRole, getByLabelText } = render(
      <BrowserRouter>
        <AHAMenu {...props} />
      </BrowserRouter>
    );
    global.outerWidth = 992;

    const expandButton = getByRole("button", { name: "Navigation Menu" });
    fireEvent.click(getByLabelText("Navigation Menu"));
    expect(expandButton).toHaveAttribute("aria-expanded", "true");
    expect(expandButton).toHaveClass("sideMenuMobArrowBtn");
  });
});
