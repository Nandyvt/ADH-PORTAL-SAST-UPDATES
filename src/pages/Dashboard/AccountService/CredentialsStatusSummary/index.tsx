import React, { useEffect, useState } from "react";
import PieChartGraph from "components/PieChart";

const CredentialsStatusSummary = ({ credentialsSummary }: any) => {
  const [data, setData] = useState<any>([
    { name: "Active", value: 0 },
    { name: "Inactive", value: 0 },
  ]);
  const [, setSelectedDays] = useState<number>(2);
  const [loading, setLoading] = useState<boolean>(false);

  const formatData = (dataObj: any) => {
    return [
      {
        name: "Active",
        value: dataObj.active,
      },
      { name: "Inactive", value: dataObj.inactive },
    ];
  };

  useEffect(() => {
    setLoading(true);
    setData(formatData(credentialsSummary));
  }, [credentialsSummary]);

  return (
    <PieChartGraph
      chartTitle="Active and Inactive Credentials"
      backgroundColor="#FFFFFF"
      chartUniqueId="CredentialsStatusSummaryChart"
      chartData={data}
      legendsData={[
        { name: "Active", icon: "circle" },
        { name: "Inactive", icon: "circle" },
      ]}
      legendsColor={["#2E8104", "#C10E21"]}
      legendsPosition="bottom"
      setDaysSelected={setSelectedDays}
      loading={loading}
      legendValue
      hideDropDown
    />
  );
};

export default CredentialsStatusSummary;
