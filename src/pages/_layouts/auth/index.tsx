import React, { ReactNode } from "react";
import PropTypes from "prop-types";

interface Props {
  children: ReactNode;
}
export default function AuthLayout({ children }: Props) {
  return (
    <>
      <div>{children}</div>
    </>
  );
}
AuthLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
