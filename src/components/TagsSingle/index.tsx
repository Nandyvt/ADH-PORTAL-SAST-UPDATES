/* eslint-disable react/no-array-index-key */
import React, { useEffect, useRef, useState } from "react";
import { BadgeContainer, MoreBadge, Popover, PopoverBadge } from "./styled";

// Helper function to get the X, Y position relative to the parent
const getXYPosRelativeToParent = (
  element: HTMLElement,
  parent: HTMLElement
) => {
  const rect = element.getBoundingClientRect();
  const parentRect = parent.getBoundingClientRect();
  return {
    x: rect.left - parentRect.left,
    y: rect.top - parentRect.top,
  };
};

// Helper function to get X, Y position based on the viewport
const getXYPosition = (element: HTMLElement) => {
  const rect = element.getBoundingClientRect();
  return {
    x: rect.left + window.scrollX,
    y: rect.top + window.scrollY,
  };
};

// Function to handle the next sibling popover styles for large screens
const nextSiblingPopoverStyles = (event: any, x: number, y: number) => {
  event.currentTarget.nextSibling.style.left = `${x - 10}px`;
  event.currentTarget.nextSibling.style.top = `${y - 10}px`;
};

// Helper function to dynamically toggle the popover and adjust its position
const handleSmallScreenPopover = (event: any, x: number, y: number) => {
  if (x > 200) {
    event.currentTarget.nextSibling.style.left = `${x - 173}px`;
  } else if (x > 190) {
    event.currentTarget.nextSibling.style.left = `1.5rem`;
  } else {
    event.currentTarget.nextSibling.style.left = `1rem`;
  }
  event.currentTarget.nextSibling.style.top = `${y - 10}px`;
};

const handleMediumScreenPopover = (event: any, x: number, y: number) => {
  if (x >= 389 && x < 400) {
    event.currentTarget.nextSibling.style.right = `${x - 250}px`;
  } else if (x > 370) {
    event.currentTarget.nextSibling.style.right = `${x - 230}px`;
  } else {
    event.currentTarget.nextSibling.style.right = `${x - 320}px`;
  }
  event.currentTarget.nextSibling.style.top = `${y - 10}px`;
};

const handleLargeScreenPopover = (event: any, x: number, y: number) => {
  if (x >= 550) {
    event.currentTarget.nextSibling.style.left = `${x - 200}px`;
  } else {
    event.currentTarget.nextSibling.style.left = `${x - 20}px`;
  }
  event.currentTarget.nextSibling.style.top = `${y - 10}px`;
};

const toggleRolePopover = (event: any) => {
  const { x: xProp, y: yProp } =
    window.outerWidth > 991
      ? getXYPosRelativeToParent(
          event.currentTarget,
          event.currentTarget.parentNode.parentNode
        )
      : getXYPosition(event.currentTarget);

  const screenWidth = window.outerWidth;

  // Adjust popover position based on screen width
  if (screenWidth > 319 && screenWidth < 376) {
    handleSmallScreenPopover(event, xProp, yProp);
  } else if (screenWidth >= 376 && screenWidth < 576) {
    nextSiblingPopoverStyles(event, xProp, yProp);
  } else if (screenWidth >= 576 && screenWidth < 768) {
    handleMediumScreenPopover(event, xProp, yProp);
  } else if (screenWidth >= 768 && screenWidth < 992) {
    handleLargeScreenPopover(event, xProp, yProp);
  } else if (screenWidth >= 992 && screenWidth < 1600) {
    nextSiblingPopoverStyles(event, xProp, yProp);
  }

  // Toggle the popover visibility
  event.currentTarget.classList.toggle("popover-open");
  event.currentTarget.nextSibling.classList.toggle("d-none");
};

const BadgeTags: React.FC<{
  sources: any[];
  maxVisible?: number;
}> = ({ sources, maxVisible = 4 }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const moreBadgeRef = useRef<HTMLButtonElement | null>(null);

  const visibleBadges = sources?.slice(0, maxVisible) || [];
  const extraBadges = sources?.slice(maxVisible) || [];

  const togglePopover = (event: any) => {
    toggleRolePopover(event);
    setIsPopoverOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      popoverRef.current &&
      !popoverRef.current.contains(event.target as Node) &&
      moreBadgeRef.current &&
      !moreBadgeRef.current.contains(event.target as Node)
    ) {
      setIsPopoverOpen(false);
    }
  };

  useEffect(() => {
    if (isPopoverOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPopoverOpen]);

  return (
    <BadgeContainer>
      {visibleBadges.map((badge: string, index: number) => (
        <div key={`${badge}-${index}`}>
          <aui-tags
            crossicon={false}
            numberoftags={badge}
            size="small"
            type="clients"
          />
        </div>
      ))}
      {extraBadges.length > 0 && (
        <>
          <MoreBadge
            className={`${isPopoverOpen ? "zindextoggle" : ""}`}
            onClick={togglePopover}
            ref={moreBadgeRef}
          >
            +{extraBadges.length}
          </MoreBadge>
          <Popover
            ref={popoverRef}
            className={`${isPopoverOpen ? "" : "d-none"}`}
          >
            {extraBadges.map((badge: string, index: number) => (
              <PopoverBadge key={`${badge}-${index}`}>
                <aui-tags
                  crossicon={false}
                  numberoftags={badge}
                  size="small"
                  type="clients"
                />
              </PopoverBadge>
            ))}
          </Popover>
        </>
      )}
    </BadgeContainer>
  );
};

BadgeTags.defaultProps = {
  maxVisible: 4,
};

export default BadgeTags;
