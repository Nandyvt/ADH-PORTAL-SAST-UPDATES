import React from "react";
import { render, cleanup } from "@testing-library/react";
import AdminFooter from "./index";
import AdminFooterWrapper from "./styled";

describe("AdminFooter", () => {
  /* test("renders correctly", () => {
    const { container } = render(<AdminFooter />);
    expect(container).toMatchSnapshot();
  }); */

  jest.mock("common/utils", () => ({
    getCurrentYear: jest.fn(),
  }));

  it("should render the correct text content", () => {
    const { getByText } = render(<AdminFooter />);
    const firstParagraph = getByText(
      "National Center, 7272 Greenville Ave., Dallas, TX 75231 | Customer Service: 1-800-AHA-USA-1, 1-800-242-8721"
    );
    const currentYear = new Date().getFullYear();
    const textMatcher = (content: any, element: any) => {
      const hasText = (node: any) =>
        node.textContent ===
        `©${currentYear} American Heart Association, Inc. All rights reserved. Unauthorized use prohibited. The American Heart Association is a qualified 501(c)(3) tax-exempt organization. *Red Dress ™ DHHS, Go Red ™ AHA ; National Wear Red Day® is a registered trademark.`;
      return hasText(element);
    };
    const secondParagraph = getByText(textMatcher);
    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });

  it("renders with the background color style", () => {
    const { container } = render(<AdminFooterWrapper />);
    const footer = container.firstChild;
    expect(footer).toHaveStyle("background-color: #343a40");
  });

  afterEach(cleanup);
});
