import React, { useEffect, useState } from "react";
import PieChartGraph from "components/PieChart";

const UsersSummaryPieChart = ({ usersSummary }: any) => {
  const [data, setData] = useState<any>([
    { name: "Active", value: 0 },
    { name: "Inactive", value: 0 },
    { name: "Pending", value: 0 },
  ]);
  const [loading, setLoading] = useState<boolean>(false);

  const formatData = (dataObj: any) => {
    return [
      {
        name: "Active",
        value: dataObj.active,
      },
      {
        name: "Inactive",
        value: dataObj.inactive,
      },
      { name: "Pending", value: dataObj.pending },
    ];
  };
  useEffect(() => {
    setLoading(true);
    setData(formatData(usersSummary));
  }, [usersSummary]);

  return (
    <PieChartGraph
      className="pt-5"
      backgroundColor="#F1F9F9"
      chartUniqueId="UsersSummaryPieChartChart"
      chartData={data}
      legendsData={[
        { name: "Active", icon: "circle" },
        { name: "Inactive", icon: "circle" },
        { name: "Pending", icon: "circle" },
      ]}
      legendsColor={["#329300", "#C10E21", "#0081B2"]}
      legendsPosition="bottom"
      loading={loading}
      legendValue
      hideTitle
      hideDropDown
    />
  );
};

export default UsersSummaryPieChart;
