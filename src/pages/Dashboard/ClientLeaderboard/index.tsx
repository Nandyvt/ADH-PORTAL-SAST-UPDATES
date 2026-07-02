import { BarChart, PieChart, LineChart } from "echarts/charts";
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  DatasetComponent,
  LegendComponent,
  DataZoomComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import { UniversalTransition } from "echarts/features";
import * as echarts from "echarts/core";
import ReactEChartsCore from "echarts-for-react/lib/core";
import React, { useEffect, useRef, useState } from "react";
import { clientLeaderBoardSummary } from "services/api/summary.api";
import { showToast } from "components/Toast/toast.slice";
import store from "app/store";
import { getErrorMessage } from "common/utils";
import { LeaderBoardBarGraphWrapper } from "./styled";

interface ILeaderBoardInterface {
  xAxisData: Array<string>;
  yAxisData: Array<number>;
}

const defaultValues = {
  xAxisData: [],
  yAxisData: [],
};
const ClientLeaderboard: React.FunctionComponent = () => {
  const graphLabels = {
    heading: "Client Leaderboard",
    bgColor: "#0ABBB0",
    leaderBoardDataCount: 4,
  };

  const [leaderBoardData, setLeaderBoardData] =
    useState<ILeaderBoardInterface>(defaultValues);

  const getClientLeaderBoardData = async (
    count: number = graphLabels.leaderBoardDataCount
  ) => {
    clientLeaderBoardSummary(count)
      .then((response) => {
        const { leaderboard } = response.data;

        if (leaderboard === null) {
          setLeaderBoardData(defaultValues);
        } else {
          setLeaderBoardData({
            xAxisData: leaderboard.map((item: any) => item.name),
            yAxisData: leaderboard.map((item: any) => item.count),
          });
        }
      })
      .catch((error) => {
        store.dispatch(
          showToast({
            type: "danger",
            title: "Error Occurred",
            message: getErrorMessage(error),
          })
        );
      });
  };

  useEffect(() => {
    // api call
    getClientLeaderBoardData();
  }, []);

  const chartDom = useRef(null);

  const getCurrentEchartInstance = (chart: any) => {
    return chart.getEchartsInstance();
  };

  let chartInstance: any = null;
  async function renderChart(chart: any) {
    let renderInstance = getCurrentEchartInstance(chart);
    if (renderInstance) {
      chartInstance = renderInstance;
    } else {
      chartInstance = echarts.init(chart);
    }

    if (
      leaderBoardData.xAxisData.length === 0 &&
      leaderBoardData.yAxisData.length === 0
    ) {
      if (chartDom.current !== null) {
        renderInstance = getCurrentEchartInstance(chartDom.current);
        renderInstance.setOption({
          title: {
            show: true,
            textStyle: {
              color: "grey",
              fontSize: 20,
            },
            text: "No data",
            left: "center",
            top: "center",
          },
        });
      }
    } else {
      await chartInstance.setOption({
        title: {
          show: false,
        },
        series: [
          {
            type: "bar",
            data: leaderBoardData.yAxisData,
            barMaxWidth: 40,
            emphasis: {
              itemStyle: {
                color: graphLabels.bgColor,
                focus: "self",
              },
            },
            normal: {
              itemStyle: {
                color: graphLabels.bgColor,
              },
            },
          },
        ],
      });
    }
  }

  useEffect(() => {
    // Update chart values
    if (chartDom.current !== null) {
      const barChart = chartDom.current;
      renderChart(barChart);
    }
    document
      .querySelector<any>(".leaderBoardGraph")
      ?.setAttribute("role", "img");
  }, [leaderBoardData]);

  const getOptionBar = () => {
    return {
      aria: {
        enabled: true,
        label: {
          enabled: true,
        },
      },
      tooltip: {
        trigger: "item",
        axisPointer: {
          type: "shadow",
        },
      },

      xAxis: {
        data: leaderBoardData.xAxisData,
        boundaryGap: true,
        axisLine: {
          show: true,
          lineStyle: {
            color: "#222328",
          },
        },
        axisTick: {
          show: false,
        },
      },

      yAxis: {
        axisTick: {
          show: false,
        },
        axisLine: {
          show: true,
        },
      },

      series: [
        {
          type: "bar",
          data: leaderBoardData.yAxisData,
          barMaxWidth: 40,
          emphasis: {
            itemStyle: {
              color: graphLabels.bgColor,
              focus: "self",
            },
          },
          normal: {
            itemStyle: {
              color: graphLabels.bgColor,
            },
          },
        },
      ],
    };
  };
  // Register the required components
  echarts.use([
    CanvasRenderer,
    GridComponent,
    TooltipComponent,
    TitleComponent,
    DatasetComponent,
    PieChart,
    BarChart,
    LegendComponent,
    LineChart,
    UniversalTransition,
    DataZoomComponent,
  ]);

  // Loading elements
  const loadingOption = {
    text: "loading",
    color: "#c23531",
    textColor: "#000",
    maskColor: "rgba(255, 255, 255, 0.8)",
    zlevel: 0,
    fontSize: 12,
    showSpinner: true,
    spinnerRadius: 10,
    lineWidth: 5,
    fontWeight: "normal",
    fontStyle: "normal",
  };

  return (
    <LeaderBoardBarGraphWrapper className="echart-wrapper">
      <div className="d-flex flex-wrap justify-content-between align-items-center mt-4 p-1">
        <p className="font-change p-0">{graphLabels.heading}</p>
      </div>
      {/* BAR CHART */}
      <ReactEChartsCore
        echarts={echarts}
        option={getOptionBar()}
        ref={chartDom}
        className="echart-wrapper clientsbar leaderBoardGraph"
        loadingOption={loadingOption}
        lazyUpdate
      />
    </LeaderBoardBarGraphWrapper>
  );
};

export default ClientLeaderboard;
