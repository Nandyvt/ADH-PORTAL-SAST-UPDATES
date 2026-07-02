import { adhLogin } from "app/hooks/auth/authManager";
import CONSTANTS from "common/constants";
import { onUserLoaded, onUserUnloaded } from "common/utils";
import { logger } from "common/utils/logger.utils";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Wrapper } from "styled";
import { LoadingWrapper } from "./styled";

const Location = () => {
  const [count, setCount] = useState<number>(0);
  const navigate = useNavigate();
  const authState = useSelector((state: any) => {
    return state.authed;
  });

  useEffect(() => {
    logger("AHA TOKEN:", authState.ahaSsoAccessToken, "COUNT:", count);
    if (authState.ahaSsoAccessToken && count === 1) {
      setCount(2);
      logger("user loaded:", authState);

      adhLogin(authState.ahaSsoAccessToken, null, null).then((res) => {
        navigate(res);
      });
    }
  }, [authState.ahaSsoAccessToken, count]);

  useEffect(() => {
    setCount(1);
    logger("Landing Page Loaded");

    CONSTANTS.WINDOW.userManager.events.addUserLoaded(onUserLoaded);
    CONSTANTS.WINDOW.userManager.events.addUserUnloaded(onUserUnloaded);
  }, []);

  const [imageLoaded, setImageLoaded] = useState(false);
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <LoadingWrapper>
      <Wrapper className="d-flex flex-column">
        <div className="container d-flex justify-content-center align-items-center loadingstyle">
          <h2
            className={`aha-size font-600 ${
              imageLoaded ? "visib-shown" : "visib-hidden"
            }`}
            data-testid="test-loadingtitle"
          >
            Welcome to ADH
          </h2>

          <img
            src="/images/progress_logo_animation.gif"
            className="gifimage"
            alt="Logo"
            onLoad={handleImageLoad}
          />
        </div>
      </Wrapper>
    </LoadingWrapper>
  );
};

export default Location;
