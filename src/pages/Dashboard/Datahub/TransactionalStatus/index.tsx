import { getTransactionStatusService } from "services/api/transactionStatus.api";
import store from "app/store";
import { showToast } from "components/Toast/toast.slice";
import React, { useEffect, useState } from "react";
import PieChartGraph from "components/PieChart";
import { getErrorMessage } from "common/utils";

const TransactionalStatus = () => {
  const [data, setData] = useState<any>([
    { name: "Failure", value: 0 },
    { name: "Success", value: 0 },
  ]);
  const [selectedDays, setSelectedDays] = useState<number>(2);
  const [loading, setLoading] = useState<boolean>(false);

  const formatData = (dataObj: any) => {
    return [
      {
        name: "Failure",
        value: dataObj.failure,
      },
      { name: "Success", value: dataObj.success },
    ];
  };

  useEffect(() => {
    setLoading(true);
    getTransactionStatusService(selectedDays)
      .then((res) => {
        setData(formatData(res.data.transactionStatusSummary));
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
      chartTitle="Transactional Status"
      backgroundColor="#F1F9F9"
      chartUniqueId="TransactionalStatusPieChart"
      chartData={data}
      legendsData={[
        { name: "Failure", icon: "circle" },
        { name: "Success", icon: "circle" },
      ]}
      legendsPosition="bottom"
      legendsColor={["#C10E21", "#009D92"]}
      setDaysSelected={setSelectedDays}
      loading={loading}
    />
  );
};

export default TransactionalStatus;
