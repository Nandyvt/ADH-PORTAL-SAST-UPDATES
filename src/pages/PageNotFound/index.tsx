import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PageNotFoundStyle from "./style";

const PageNotFoundComp: React.FunctionComponent<any> = () => {
  const navigate = useNavigate();

  const userStateAuthed = useSelector((state: any) => {
    return state?.authed?.userToken;
  });

  useEffect(() => {
    /* Automate Email SafeLink Encoding changes */
    const urlLocation = window.location.href;
    if (urlLocation?.indexOf("/transactionLogs%3F") > 0) {
      const cleanUrl =
        decodeURIComponent(decodeURIComponent(urlLocation))?.replace(
          /\+/g,
          "%20"
        ) ?? "";
      window.location.replace(cleanUrl);
    } else {
      navigate("/NotFound");
    }
  }, []);

  if (window.location.href?.indexOf("/transactionLogs%3F") > 0) {
    return <></>;
  }

  return (
    <PageNotFoundStyle className="px-5">
      <div className="row">
        <div className="col-lg-2" />
        <div className="col-lg-8 col-md-12 mb-5 notfoundcontent">
          <div className="d-flex justify-content-around">
            <img className="img-404" src="../images/404.svg" alt="NotFound" />
          </div>
          <div className="notfound-content">
            <div className="errmsg mb-2">Oops! Page does not exist.</div>
            <div className="message">
              The page you are looking for cannot be found on{" "}
              {window.location.hostname}. Either the URL is incorrect, or the
              page has been removed.
            </div>
            <div className="d-flex justify-content-around mt-3">
              <button
                type="button"
                className="btn btn-round btn-primary dashbord-btn"
                onClick={() => {
                  navigate(userStateAuthed !== "" ? "/dashboard" : "/");
                }}
              >
                Go to {userStateAuthed !== "" ? "Dashboard" : "Home"}
              </button>
            </div>
          </div>
        </div>

        <div className="col-lg-2" />
      </div>
    </PageNotFoundStyle>
  );
};
export default PageNotFoundComp;
