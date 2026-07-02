/* eslint-disable no-return-assign */
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import TabsWrapperStyles from "./styled";

interface ITab {
  heading: string;
  contentComp: any;
  tabid: string;
  urlTabName: string;
}

interface ITabsProps {
  tabs: ITab[];
  activeTab: string;
}

const TabsComp: React.FC<ITabsProps> = (props: ITabsProps) => {
  const navigate = useNavigate();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]); // Use ref to store tab elements

  const handleURLOnTabChange = (tabString: string) => {
    // Create a new instance of URLSearchParams
    const searchParams = new URLSearchParams();

    // Set the 'tab' parameter to the provided tabString value
    searchParams.set("tab", tabString);

    // Push the new URL with only the 'tab' parameter
    navigate({
      pathname: window.location.pathname, // Keep the current pathname
      search: `?${searchParams.toString()}`, // Only include the 'tab' parameter
    });
  };

  const handleTabClick = (tab: ITab) => {
    handleURLOnTabChange(tab.urlTabName);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    currentIndex: number
  ) => {
    let newIndex = currentIndex;

    if (e.key === "Enter" || e.key === " ") {
      handleTabClick(props.tabs[currentIndex]);
      return;
    }
    if (e.key === "ArrowRight") {
      // Move to the next tab (circular)
      newIndex = (currentIndex + 1) % props.tabs.length;
    } else if (e.key === "ArrowLeft") {
      // Move to the previous tab (circular)
      newIndex = (currentIndex - 1 + props.tabs.length) % props.tabs.length;
    }

    // Update the URL and tab state for the new tab
    handleTabClick(props.tabs[newIndex]);

    // Move focus to the new tab
    if (tabRefs.current[newIndex]) {
      tabRefs?.current[newIndex]?.focus();
    }
  };

  return (
    <TabsWrapperStyles>
      <aui-tabs>
        <div
          className="aui-tab-container w-100"
          role="tablist" // Add tablist role
          aria-label="View Details tab control" // Provide an accessible label
        >
          <div className="aui-tabs">
            {props?.tabs?.map((tab: ITab, index: number) => (
              <div key={tab.tabid} className="aui-tabchild">
                <button
                  type="button"
                  className={`aui-tabtitle ${
                    tab.tabid === props.activeTab ? "auitab-active_cls" : ""
                  }`}
                  aria-controls={tab.tabid}
                  role="tab"
                  id={tab.urlTabName}
                  aria-selected={tab.tabid === props.activeTab}
                  tabIndex={tab.tabid === props.activeTab ? 0 : -1} // Ensure only the active tab is focusable
                  aria-setsize={props.tabs.length} // Total number of tabs
                  aria-posinset={index + 1} // Position in the tab list
                  ref={(el) => (tabRefs.current[index] = el)} // Store reference to the button
                  onClick={() => handleTabClick(tab)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                >
                  {tab.heading}
                  <aui-icon icon="arrowdown" className="pl-0 float-right" />
                </button>
              </div>
            ))}
            {/* Tab Content */}
            {props?.tabs?.map((tab: ITab) => (
              <div
                id={tab.tabid}
                key={tab.tabid}
                className="aui-tab-content aui-tab-panal-visibility"
                role="tabpanel" // Define the role as tabpanel
                aria-labelledby={tab.urlTabName} // Link the panel to the corresponding tab
              >
                {tab.contentComp}
              </div>
            ))}
          </div>
        </div>
      </aui-tabs>
    </TabsWrapperStyles>
  );
};

export default TabsComp;
