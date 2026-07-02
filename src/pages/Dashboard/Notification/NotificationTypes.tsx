import PieChartGraph from "components/PieChart";
import React, { useCallback, useEffect } from "react";
import { getClientConfigsSummary } from "services/api/notification.api";
import { NotificationContainer } from "./styled";

const NotificationType = () => {
  const [data, setData] = React.useState<any>([
    { name: "Email", value: 0 },
    { name: "SMS", value: 0 },
    { name: "HTTP", value: 0 },
  ]);

  const [loading, setLoading] = React.useState<boolean>(false);

  const [chartHeight, setChartHeight] = React.useState("380px");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 320 && window.innerWidth < 991) {
        setChartHeight("280px");
      } else {
        setChartHeight("380px");
      }
    };

    // Add event listener to listen for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array means this effect runs once on component mount

  function formatAPIData(apiData: any) {
    return apiData.map((item: any) => ({
      name: item.type,
      value: item.total,
    }));
  }

  useEffect(() => {
    setLoading(true);
    getClientConfigsSummary()
      .then((res: any) => {
        const apiData: any = res.data.clientConfigsSummary;
        setData(formatAPIData(apiData));
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <NotificationContainer>
      <div className="text-left mt-4">
        <h2 className="title">Notification Type</h2>
      </div>
      <PieChartGraph
        chartTitle="Notification Type"
        backgroundColor="#ffffff"
        chartUniqueId="NotificationTypePieChart"
        chartData={data}
        legendsData={[
          { name: "Email", icon: "circle" },
          { name: "SMS", icon: "circle" },
          { name: "HTTP", icon: "circle" },
        ]}
        legendsPosition="bottom"
        legendsColor={["#4F7EC9", "#EF8022", "#30B793"]}
        setDaysSelected={useCallback(() => 2, [])}
        loading={loading}
        hideDropDown
        style={{ height: chartHeight }}
        hideTitle
      />
    </NotificationContainer>
  );
};

export default NotificationType;
