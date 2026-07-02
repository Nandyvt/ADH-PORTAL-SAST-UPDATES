import React from "react";
import { getCurrentYear } from "common/utils";
import AdminFooterWrapper from "./styled";

const AdminFooter = ({ buttonClick, isLoginPage }: any) => {
  return (
    <AdminFooterWrapper
      className="text-left footerstyle mt-4"
      buttonClick={buttonClick}
      isLoginPage={isLoginPage}
    >
      <p>
        <span className="d-block" aria-hidden>
          National Center, 7272 Greenville Ave., Dallas, TX 75231 | Customer
          Service: 1-800-AHA-USA-1, 1-800-242-8721
        </span>
      </p>
      <span className="sr-only">
        National Center, 7272 Greenville Ave., Dallas, TX 75231 | Customer
        Service: 1-800-A H A-U S A-1, 1-800-242-872
      </span>
      <p className="mb-0">
        <span className="d-block" aria-hidden>
          &copy;{getCurrentYear()} American Heart Association, Inc. All rights
          reserved. Unauthorized use prohibited. The American Heart Association
          is a qualified 501(c)(3) tax-exempt organization. *Red Dress ™ DHHS,
          Go Red ™ AHA ; National Wear Red Day® is a registered trademark.
        </span>
        <span className="sr-only">
          &copy;{getCurrentYear()} American Heart Association, Inc. All rights
          reserved. Unauthorized use prohibited. The American Heart Association
          is a qualified 501(c)(3) tax-exempt organization. *Red Dress ™ D H H
          S, Go Red ™ A H A ; National Wear Red Day® is a registered trademark.
        </span>
      </p>
    </AdminFooterWrapper>
  );
};
export default AdminFooter;
