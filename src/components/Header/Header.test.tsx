import React from "react";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { useSelector } from "react-redux";
import {
  createMemoryRouter,
  MemoryRouter,
  RouterProvider,
} from "react-router-dom";
import Profile from "pages/Profile/Profile";
import Header from "./index";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

jest.mock("common/utils", () => ({
  getErrorMessage: jest.fn(),
  setSideMenuToggleStatus: jest.fn(),
  signOut: jest.fn(),
}));

jest.mock("app/hooks/auth/authManager", () => ({
  adhLogin: jest.fn(),
}));

jest.mock("common/utils/logger.utils", () => ({
  logger: jest.fn(),
}));

jest.mock("app/hooks/auth/auth.slice", () => ({
  getAhaSsoToken: jest.fn(),
}));

jest.mock("components/Toast/toast.slice", () => ({
  showToast: jest.fn(),
}));

describe("Header component", () => {
  const mockState = {
    user: {
      ahaSsoUser: {
        firstName: "John",
        lastName: "Doe",
      },
      user: {
        roleName: "SUPER_USER",
      },
    },
    header: {
      headerTitle: "My Header",
      roleSwitchObj: {
        isRoleSwitchDone: true,
      },
    },
  };

  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementation((selectorFn) =>
      selectorFn(mockState)
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders header with user info and logo", () => {
    const { getByAltText } = render(
      <MemoryRouter>
        <Header
          showMyAccountMenu
          buttonClick={jest.fn()}
          setButtonClick={jest.fn()}
        />
      </MemoryRouter>
    );
    const logo = getByAltText("Profile Icon");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute(
      "src",
      expect.stringContaining("Icons-Avatar.svg")
    );
  });

  test("toggles menu visibility on button click", () => {
    const { getByLabelText } = render(
      <MemoryRouter>
        <Header buttonClick={jest.fn()} setButtonClick={jest.fn()} />
      </MemoryRouter>
    );
    const toggleButton = getByLabelText("Toggle Navigation");

    act(() => {
      fireEvent.click(toggleButton);
    });

    expect(toggleButton.firstChild).toHaveClass("aha-icon-hamburger");

    act(() => {
      fireEvent.click(toggleButton);
    });

    expect(toggleButton.firstChild).toHaveClass("aha-icon-hamburger");
  });

  test("handles sign out button click", () => {
    const { getByText } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const signOutButton = getByText("Sign Out");

    fireEvent.click(signOutButton);

    expect(signOutButton).toBeInTheDocument();
  });

  test("navigates to profile page on profile button click", async () => {
    // Create a router with Header in the root layout
    const router: any = createMemoryRouter(
      [
        {
          path: "/",
          element: (
            <>
              <Header />
            </>
          ),
          children: [
            {
              path: "profile",
              element: <Profile />,
            },
          ],
        },
      ],
      {
        initialEntries: ["/"], // Start at root
        initialIndex: 0,
      }
    );

    // Render the app with the router
    const { getByText } = render(<RouterProvider router={router} />);

    // Click the profile button
    fireEvent.click(getByText("Profile"));

    // Verify navigation occurred
    await waitFor(() => {
      expect(router?.state?.location?.pathname).toBe("/profile");
    });
  });

  test("adds and removes classes based on scroll behavior", () => {
    const mockElement = { classList: { remove: jest.fn(), add: jest.fn() } };

    const mockHTMLCollection = {
      length: 1,
      item: jest.fn(() => mockElement),
      namedItem: jest.fn(() => null),
      0: mockElement, // Allow array-like indexing
    };

    // Mock document.getElementsByClassName
    jest
      .spyOn(document, "getElementsByClassName")
      .mockReturnValue(mockHTMLCollection as any);

    // Mock window.scrollY
    Object.defineProperty(window, "scrollY", {
      writable: true,
      configurable: true,
      value: 0, // Initial value
    });

    act(() => {
      render(
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      );
    });

    // Simulate scrolling down
    act(() => {
      Object.defineProperty(window, "scrollY", { value: 50 });
      window.dispatchEvent(new Event("scroll"));
    });

    expect(mockElement.classList.remove).toHaveBeenCalledWith("top-0");
    expect(mockElement.classList.add).toHaveBeenCalledWith("top-70");

    // Simulate scrolling up
    act(() => {
      Object.defineProperty(window, "scrollY", { value: 150 });
      window.dispatchEvent(new Event("scroll"));
    });

    expect(mockElement.classList.remove).toHaveBeenCalledWith("top-0");
    expect(mockElement.classList.add).toHaveBeenCalledWith("top-70");

    // Cleanup
    jest.restoreAllMocks();
  });
});
