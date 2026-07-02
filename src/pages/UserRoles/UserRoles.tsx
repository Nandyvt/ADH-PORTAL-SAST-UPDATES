import React, { useEffect, useState, FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import Header from "components/Header";
import AdminFooter from "components/AdminFooter";
import CONSTANTS from "common/constants";
import RolePermissionsModal from "components/RolePermissionsModal";
import { Wrapper } from "../../styled/index";

import { UserRolesStyles } from "./Styled";

interface UserRoles {
  id: number;
  role: string;
  rolePermissions: Array<JSON>;
  tenantName: string;
  clientName: string;
}

const GenerateRoleCards = ({ dataRoleArr, setCardSelectState }: any) => {
  const toggleHoverState = (event: any) => {
    if (event.type === "mouseenter") {
      event.currentTarget.classList.add("hovered");
    } else if (event.type === "mouseleave") {
      event.currentTarget.classList.remove("hovered");
    }
  };

  const toggleClickState = (event: any) => {
    event.currentTarget.classList.toggle("selected");
    setCardSelectState(true);
  };

  return dataRoleArr.map((item: any) => {
    return (
      <div key={item.id} className="col-md-4 no-gutters">
        <label htmlFor={item.id} className="col-md-12">
          <input
            type="radio"
            id={item.id}
            data-testid={`radioBtn-${item.id}`}
            name="card-roles"
            value={item.id}
          />
          <div
            className="col-md-12 no-gutters card-wrapper"
            onMouseEnter={(e) => toggleHoverState(e)}
            onMouseLeave={(e) => toggleHoverState(e)}
            onClick={(e) => toggleClickState(e)}
            onKeyUp={(e) => toggleClickState(e)}
            role="button"
            tabIndex={0}
          >
            <div className="col-md-2 alignSelf-Start">
              <p className="arrow-wrapper">
                <span className="arrow-styles" />
              </p>
            </div>
            <div className="col-md-10 alignSelf-base">
              <div className="col-md-12 mb-3 d-flex no-gutters">
                <div className="col-md-10">
                  <p className="role-label">Role</p>
                  <p className="role-name">{item.role}</p>
                </div>
                <div className="col-md-2 text-right tooltip-role">
                  <img
                    alt="PermissionIcon"
                    src="../images/IconViewPermissions.svg"
                    data-toggle="modal"
                    data-target="#modal1"
                  />
                  <span className="tooltiptext">View Permissions</span>
                </div>
              </div>
              <div className="col-md-12 no-gutters card-tenantClientSec">
                <div className="col-md-5 separatorLine">
                  <p className="role-label color-tenantClient">Tenant</p>
                  <p className="tenantClient-name">{item.tenantName}</p>
                </div>
                <div className="col-md-5">
                  <p className="role-label color-tenantClient">Client</p>
                  <p className="tenantClient-name">{item.clientName}</p>
                </div>
              </div>
            </div>
          </div>
        </label>
      </div>
    );
  });
};

const UsersComp: FunctionComponent<UserRoles> = (props: any) => {
  useEffect(() => {}, []);

  const navigate = useNavigate();
  const [cardSelectState, setCardSelectState] = useState(false);

  const mockDataRoles = [
    {
      id: 1234,
      role: "Super Admin",
      rolePermissions: [],
      tenantName: "NA",
      clientName: "NA",
    },
    {
      id: 1235,
      role: "Super Admin",
      rolePermissions: [],
      tenantName: "NA",
      clientName: "NA",
    },
    {
      id: 1237,
      role: "Super Admin",
      rolePermissions: [],
      tenantName: "NA",
      clientName: "NA",
    },
    {
      id: 1238,
      role: "Super Admin",
      rolePermissions: [],
      tenantName: "NA",
      clientName: "NA",
    },
    {
      id: 1245,
      role: "Super Admin",
      rolePermissions: [],
      tenantName: "NA",
      clientName: "NA",
    },
    {
      id: 1278,
      role: "Tenant Admin",
      rolePermissions: [],
      tenantName: "NA",
      clientName: "NA",
    },
    {
      id: 9876,
      role: "Super Admin",
      rolePermissions: [],
      tenantName: "NA",
      clientName: "NA",
    },
    {
      id: 9698,
      role: "Super Admin",
      rolePermissions: [],
      tenantName: "NA",
      clientName: "NA",
    },
    {
      id: 9980,
      role: "Tenant Admin",
      rolePermissions: [],
      tenantName: "NA",
      clientName: "NA",
    },
  ];

  const checkBtnClick = (event: any) => {
    navigate(CONSTANTS.PAGE_ROUTES.DASHBOARD);
  };
  return (
    <Wrapper className="d-flex flex-column">
      <Header showMyAccountMenu={false} />
      <UserRolesStyles>
        <div className="container" role="main">
          <h1
            className="proj-heading mb-5"
            aria-label="Select Role"
            data-testid="test-projects"
          >
            Select Role
          </h1>
          <div className="row roleCardWrapper row mb-5">
            <GenerateRoleCards
              dataRoleArr={mockDataRoles}
              setCardSelectState={setCardSelectState}
            />
          </div>
          <div
            className={`btn-group row no-gutters mb-5 ${
              !cardSelectState ? "notAllowedCursor" : ""
            }`}
          >
            <div className="btnwidth">
              <button
                type="button"
                aria-label="Next"
                className="btn btn-round btn-primary btnwidth"
                disabled={!cardSelectState}
                onClick={(e) => checkBtnClick(e)}
                data-testid="roleNextBtn"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </UserRolesStyles>
      <RolePermissionsModal />
      <AdminFooter />
    </Wrapper>
  );
};

export default UsersComp;
