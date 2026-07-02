import store from "app/store";
import { showToast } from "components/Toast/toast.slice";
import React, { useEffect, useState } from "react";
import PieChartGraph from "components/PieChart";
import { CredentialsChannelSummaryService } from "services/api/credentialsChannelSummary.api";
import { getErrorMessage } from "common/utils";

const ChannelCredentials = () => {
  const [data, setData] = useState<any>([
    { name: "API", value: 0 },
    { name: "NATS", value: 0 },
  ]);
  const [selectedDays, setSelectedDays] = useState<number>(2);
  const [loading, setLoading] = useState<boolean>(false);

  const formatData = (dataObj: any) => {
    return [
      {
        name: "API",
        value: dataObj.api,
      },
      { name: "NATS", value: dataObj.nats },
    ];
  };

  useEffect(() => {
    setLoading(true);
    CredentialsChannelSummaryService(selectedDays)
      .then((res) => {
        setData(formatData(res.data.credentialsChannelSummary));
        setLoading(false);
      })
      .catch((error) => {
        store.dispatch(
          showToast({
            type: "danger",
            title: "Error Occurred",
            message: getErrorMessage(error),
          })
        );
        setLoading(false);
      });
  }, [selectedDays]);

  return (
    <PieChartGraph
      chartTitle="Credentials Channel"
      backgroundColor="#feeeee"
      chartUniqueId="ChannelCredentialsChart"
      chartData={data}
      legendsData={[
        { name: "API", icon: "circle" },
        { name: "NATS", icon: "circle" },
      ]}
      legendsColor={["#C10E21", "#3a9b94"]}
      legendsPosition="bottom"
      setDaysSelected={setSelectedDays}
      loading={loading}
    />
  );
};

export default ChannelCredentials;
