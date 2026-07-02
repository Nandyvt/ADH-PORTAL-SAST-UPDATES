/* eslint-disable react/require-default-props */
import React, { useEffect, useRef, useState } from "react";
import CONSTANTS from "common/constants";
import { toggleRolePopover } from "pages/Users/CustomisedTable/util";
import { useSelector } from "react-redux";
import TagsTableDataStyles from "./styled";

interface ITagsTableDataProps {
  tagData: [];
  propertyName?: string;
  id: number;
}
const TagsTableDataComp = (props: ITagsTableDataProps) => {
  const [openPopoverId, setOpenPopoverId] = useState<number | null>(null);
  const popoverRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const circleSecRef = useRef<HTMLButtonElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isMovedToNextLine, setIsMovedToNextLine] = useState(false);

  const generateBadgeContent = (tagDetailsObj: any) => {
    return (
      <div
        key={`${tagDetailsObj.source} - ${tagDetailsObj.entity}`}
        className="roleStylesMin roleColorCodeCPU"
      >
        <p title={`${tagDetailsObj?.source} - ${tagDetailsObj?.entity}`}>
          {`${tagDetailsObj?.source} - ${tagDetailsObj?.entity}`}
        </p>
      </div>
    );
  };

  const generateTagContent = (tagContentArr: any) => {
    return tagContentArr?.length > 0
      ? tagContentArr
          .slice(0, CONSTANTS.ROLE_STATUS.SLICE_COUNT)
          .map(generateBadgeContent)
      : null;
  };

  const sideMenuState = useSelector((state: any) => {
    return state?.user?.sideMenuState;
  });
  const togglePopover = (userId: number) =>
    setOpenPopoverId((prevOpenId) => (prevOpenId === userId ? null : userId));

  // Function to adjust the position of the circleSec button
  const adjustCirclePosition = () => {
    setIsMovedToNextLine(true);
  };

  // Effect to set up click outside event listener and adjust position
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Element;
      const popoverRefsArray = Object.values(popoverRefs.current);
      if (
        target &&
        !target?.classList.contains("circleCount") &&
        !target?.classList.contains("circleWrapper")
      ) {
        popoverRefsArray.forEach((ref: any) => {
          if (ref && ref !== event.target && !ref.contains(event.target)) {
            setOpenPopoverId(null);
          }
        });
      }
    };

    // Attach the event listener to the document
    document.addEventListener("mousedown", handleOutsideClick);
    // Adjust the button position on load and resize
    window.addEventListener("resize", adjustCirclePosition);
    adjustCirclePosition();

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("resize", adjustCirclePosition);
    };
  }, [sideMenuState]);

  return (
    <TagsTableDataStyles>
      <div
        className="roleColumnWrapper d-flex align-items-center"
        data-title={props.propertyName}
        ref={containerRef}
      >
        {generateTagContent(props.tagData)}

        {/* generate tags for data more than 4 */}
        {props?.tagData?.length > CONSTANTS.ROLE_STATUS.SLICE_COUNT && (
          <div
            className={`circleSec tooltip-role-bkp ${
              isMovedToNextLine ? "w-100" : ""
            }`}
          >
            <button
              ref={circleSecRef}
              type="button"
              onClick={(e) => {
                toggleRolePopover(e);
                togglePopover(props.id);
              }}
              className={`${
                openPopoverId === props.id ? "z-index-6" : ""
              } circleWrapper`}
            >
              <span className="circleCount">
                +{props.tagData.length - CONSTANTS.ROLE_STATUS.SLICE_COUNT}
              </span>
            </button>
            <div
              className={`roleSec ${
                openPopoverId === props.id ? "d-block" : "d-none"
              }`}
              ref={(ref) => {
                popoverRefs.current[props.id] = ref;
              }}
            >
              {props.tagData
                .slice(
                  CONSTANTS.ROLE_STATUS.SLICE_COUNT,
                  props.tagData.length + 1
                )
                .map((additionalTagData: any) =>
                  generateBadgeContent(additionalTagData)
                )}
            </div>
          </div>
        )}
      </div>
    </TagsTableDataStyles>
  );
};

export default TagsTableDataComp;
