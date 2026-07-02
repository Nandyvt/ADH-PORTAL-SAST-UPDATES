import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const Loader = () => {
  // REDUX variables
  const loader = useSelector((state: any) => {
    return state.loader;
  });
  const [isLoding, setIsLoading] = useState<boolean>(loader.isPageLoading);

  useEffect(() => {
    setIsLoading(loader.isPageLoading);
  }, [loader]);

  return (
    <>
      {isLoding ? (
        <div
          className="aui-loader"
          role="alert"
          aria-live="assertive"
          aria-label="Page is loading"
        />
      ) : (
        ""
      )}
    </>
  );
};

export default Loader;
