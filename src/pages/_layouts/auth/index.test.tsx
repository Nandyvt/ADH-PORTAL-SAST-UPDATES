import React from "react";
import { render } from "@testing-library/react";
import AuthLayout from "./index";

describe("AuthLayout Component", () => {
  test("renders children correctly", () => {
    // Mock child component
    const ChildComponent = () => <div>Child Component</div>;

    // Render AuthLayout with ChildComponent as children
    const { getByText } = render(
      <AuthLayout>
        <ChildComponent />
      </AuthLayout>
    );

    // Ensure ChildComponent is rendered inside AuthLayout
    expect(getByText("Child Component")).toBeInTheDocument();
  });
});
