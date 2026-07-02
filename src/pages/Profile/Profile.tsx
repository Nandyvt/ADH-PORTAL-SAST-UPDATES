import store from "app/store";
import { ssouserProfile } from "common/utils";
import { setHeaderTitleText } from "components/Header/header.slice";
import React, { useEffect } from "react";
import { Wrapper } from "styled";
import { useUsersList } from "./profileHook";
import ProfileWrapper from "./styled";

const Profile = () => {
  useEffect(() => {
    store.dispatch(
      setHeaderTitleText({
        headerTitle: "My Profile",
      })
    );
  });
  const userProfile = ssouserProfile();

  const { users } = useUsersList(userProfile.email);

  function showPencil(roleName: string) {
    const roles = [
      "super user",
      "admin",
      "shopcpr - user",
      "care plan -user",
      "client user",
    ];
    return roles.includes(roleName.toLocaleLowerCase());
  }

  let roleCards: any = [];
  const roleType = (roleId: any) => {
    if (roleId === 1 || roleId === 6) {
      return "admin";
    }
    if (roleId === 4) {
      return "tenants";
    }
    return "clients";
  };

  return (
    <Wrapper className="d-flex flex-column w-100">
      <ProfileWrapper>
        <div className="d-lg-flex mt-4 m-sm-2 pl-lg-3 p-sm-2">
          <div className="container flex-grow-1 pl-3">
            <h1
              className="proj-heading"
              aria-label="My Profile"
              data-testid="my-profile-heading"
            >
              My Profile
            </h1>
            <div className="d-sm-flex user-mob">
              <div className="user-style">
                <div className="d-flex justify-content-evenly align-items-center">
                  <img
                    src={userProfile.photoURL}
                    className="user-img"
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src = "/images/avatar.jpg";
                    }}
                    alt="User"
                  />
                  {/* <h1
                    className="font-600 font18 pt-2 d-block d-sm-none"
                    data-testid="test-heading"
                  >
                    {`${userProfile.firstName} ${userProfile.lastName}`}
                  </h1> */}
                </div>
              </div>
              <div className="pl-sm-4">
                <h1
                  className="font-600 name-heading pt-2 d-block"
                  data-testid="test-heading-sm"
                >
                  {`${userProfile.firstName} ${userProfile.lastName}`}
                </h1>
                <span className="pt-3 pt-sm-4 pt-md-5 d-flex flex-row pb-2">
                  <div className="icon-spacing">
                    <img
                      src="/images/locations.svg"
                      alt="Location"
                      title="Location"
                    />
                  </div>
                  <span className="pl-3 font14">
                    {userProfile.countryofResidence}
                  </span>
                </span>
                <div className="d-lg-flex d-sm-block">
                  <span className="d-flex flex-row py-2">
                    <div className="icon-spacing">
                      <img
                        src="/images/phone.svg"
                        alt="Phone"
                        title="Phone Number"
                      />
                    </div>
                    <span className="pl-2 font14">
                      {userProfile.phoneNumber}
                    </span>
                  </span>
                  <span className="pl-lg-5 d-flex flex-row py-2">
                    <div className="icon-spacing">
                      <img
                        src="/images/email.svg"
                        alt="Email"
                        title="Email ID"
                      />
                    </div>
                    <span className="pl-3 font14">{userProfile.email}</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="d-flex mt-5 justify-content-between">
              <h2
                className="font-600 mb-0 role-heading"
                data-testid="test-roleheading"
              >
                Roles
              </h2>
            </div>
            <div className="role-card-wrapper">
              {users && users.length > 0 && users[0].roles ? (
                users[0].roles.map((role: any) => {
                  const { roleName, clientName, roleId, userRoleStatus } = role;
                  roleCards = (
                    <div
                      key={roleId + clientName}
                      className="col-lg-auto col-md-6 mt-3 role-box h-auto pl-0"
                    >
                      <div
                        className={`d-flex flex-column addRoleBox changeWidth ${
                          userRoleStatus === "ACTIVE"
                            ? "containerSA"
                            : "containerTN"
                        }`}
                      >
                        <div className="helpTextWrapper">
                          <span className="roleText">Role</span>
                          <div className="tooltip-role viewOnly">
                            {showPencil(roleName) ? (
                              <>
                                <img
                                  className="helpTextStyles"
                                  alt="ViewOnlyIcon"
                                  src="../images/roleIconViewOnly.svg"
                                />
                                <span className="tooltiptext">View Only</span>
                              </>
                            ) : (
                              <div className="mt-4" />
                            )}
                          </div>
                        </div>

                        <div className="col-md-12 no-gutters pl-0 pr-0 mb-2 roleContainer">
                          <div className="roleSec">
                            <aui-tags
                              crossicon={false}
                              tagid="tagid"
                              numberoftags={`${roleName} ${
                                clientName ? `(${clientName})` : ""
                              }`}
                              size="small"
                              type={roleType(roleId)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                  return roleCards;
                })
              ) : (
                <div
                  className="aui-block-loader"
                  role="alert"
                  aria-live="assertive"
                  aria-label="Page is Loading"
                />
              )}
            </div>
          </div>
        </div>
      </ProfileWrapper>
    </Wrapper>
  );
};
export default Profile;
