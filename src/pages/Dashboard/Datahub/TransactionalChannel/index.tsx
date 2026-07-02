import { LineChart } from "echarts/charts";
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  DatasetComponent,
  LegendComponent,
  DataZoomComponent,
  AriaComponent,
  TimelineComponent,
} from "echarts/components";
import { SVGRenderer } from "echarts/renderers";
import { UniversalTransition, LabelLayout } from "echarts/features";
import * as echarts from "echarts/core";
import ReactEChartsCore from "echarts-for-react/lib/core";
import React, { useEffect, useRef, useState } from "react";
import { showToast } from "components/Toast/toast.slice";
import store from "app/store";
import { TransactionalLogSummary } from "services/api/transactionalLog.api";
import ChartFilter from "components/ChartFilter";
import { getErrorMessage } from "common/utils";
import { LineGraphWrapper } from "./styled";

interface GraphData {
  xAxis: string[];
  yAxisNats: number[];
  yAxisApi: number[];
  yAxisSqs: number[];
}
interface GraphValue {
  date: string[];
  nats: number[];
  api: number[];
  sqs: number[];
}
const TransactionalChannel = () => {
  // Graph Related
  const [graphData, setGraphData] = useState<GraphData>({
    xAxis: [],
    yAxisNats: [],
    yAxisApi: [],
    yAxisSqs: [],
  });
  const [loading, setLoading] = useState(true);
  const [selectedDays, setSelectedDays] = useState<number>(2);

  const getOptionLine = () => {
    return {
      baseOption: {
        aria: {
          enabled: true,
          label: {
            enabled: true,
          },
        },
        tooltip: {
          trigger: "item",
          position: "top",
          backgroundColor: "#000000",
          textStyle: {
            color: "#FFFFFF",
            fontSize: 10,
          },
          axisPointer: {
            type: "cross",
          },
          extraCssText: "z-index: 1991 !important;",
        },
        legend: {
          orient: "horizontal",
          x: "center",
          y: "bottom",
          icon: "circle",
          textStyle: {
            fontFamily: "Montserrat",
            fontWeight: 500,
            color: "#222328",
            fontSize: 14,
          },
          itemGap: 20,
          lineHeight: 18,
          itemHeight: 9,
          itemWidth: 9,
          padding: 10,
        },
        grid: {
          top: "5%",
          left: "0%",
          right: "9%",
          bottom: "20%",
          containLabel: true,
        },
        xAxis: {
          data: graphData.xAxis,
          type: "category",
          splitLine: {
            lineStyle: {
              width: 1,
              opacity: 0.5,
              color: "rgba(223, 223, 230, 1)",
            },
            show: true,
          },
          nameTextStyle: {
            fontFamily: " Montserrat",
            fontSize: 18,
            fontWeight: 600,
            lineHeight: 27,
            color: "#222328",
            align: "center",
            verticalAlign: "middle",
            overflow: "truncate",
            ellipsis: "...",
          },
          axisLabel: {
            formatter: (value: any) => {
              const newDates: any = new Date(`${value}`).toLocaleDateString(
                "en-GB",
                {
                  day: "2-digit",
                  month: "short",
                }
              );
              return newDates;
            },
          },
          boundaryGap: false,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter(a: any) {
              a = +a;
              return Number.isFinite(a) ? echarts.format.addCommas(+a * 1) : "";
            },
          },
        },
        dataZoom: [
          {
            type: "inside",
            start: 0,
            end: 100,
          },
        ],
        textStyle: {
          fontFamily: " Montserrat",
          fontSize: 14,
          fontWeight: 600,
          lineHeight: 17,
          color: "#222328",
          align: "center",
          verticalAlign: "middle",
        },
        series: [
          {
            name: "NATS",
            type: "line",
            smooth: true,
            data: graphData.yAxisNats,
            itemStyle: {
              color: "#009D92",
            },
            emphasis: {
              focus: "self",
              // blurScope: "coordinateSystem",
            },
            lineStyle: {
              width: 2,
              type: "solid",
              cap: "round",
            },
            symbol: "circle",
            symbolSize: 8,
          },
          {
            name: "API",
            type: "line",
            smooth: true,
            data: graphData.yAxisApi,
            emphasis: {
              focus: "self",
              // blurScope: "coordinateSystem",
            },
            itemStyle: {
              color: "#0081B2",
            },
            lineStyle: {
              width: 2,
              type: "solid",
              cap: "round",
            },
            symbol: "circle",
            symbolSize: 8,
          },
          {
            name: "SQS",
            type: "line",
            smooth: true,
            data: graphData.yAxisSqs,
            emphasis: {
              disabled: false,
              focus: "self",
              // blurScope: "coordinateSystem",
            },
            itemStyle: {
              color: "#D85C0F",
            },
            lineStyle: {
              width: 2,
              type: "solid",
              cap: "round",
            },
            symbol: "circle",
            symbolSize: 8,
          },
        ],
      },
    };
  };

  const getCurrentEchartInstance = (chart: any) => {
    return chart.getEchartsInstance();
  };

  // Track and update chart options
  const chartDom = useRef(null);
  let chartInstance: any = null;
  async function renderChart(chart: any) {
    const renderInstance = getCurrentEchartInstance(chart);
    if (renderInstance) {
      chartInstance = renderInstance;
    } else {
      chartInstance = echarts.init(chart);
    }
    if (
      graphData.yAxisApi.reduce((a, b) => a + b, 0) === 0 &&
      graphData.yAxisNats.reduce((a, b) => a + b, 0) === 0 &&
      graphData.yAxisSqs.reduce((a, b) => a + b, 0) === 0
    ) {
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
    } else {
      await chartInstance.setOption({
        baseOption: {
          title: {
            show: false,
          },
          xAxis: {
            data: graphData.xAxis,
          },
          series: [
            {
              name: "NATS",
              data: graphData.yAxisNats,
            },
            {
              name: "API",
              data: graphData.yAxisApi,
            },
            {
              name: "SQS",
              data: graphData.yAxisSqs,
            },
          ],
        },
        // All EChart Supported Media Queries are relative to the size of the charts and not the current window size
        media: [
          {
            option: {
              series: [
                {
                  name: "NATS",
                  emphasis: {
                    disabled: false,
                    focus: "self",
                  },
                },
                {
                  name: "API",
                  emphasis: {
                    disabled: false,
                    focus: "self",
                  },
                },
                {
                  name: "SQS",
                  emphasis: {
                    disabled: false,
                    focus: "self",
                  },
                },
              ],
            },
          },
          {
            query: {
              maxWidth: 767,
            },
            option: {
              series: [
                {
                  name: "NATS",
                  emphasis: {
                    disabled: true,
                  },
                },
                {
                  name: "API",
                  emphasis: {
                    disabled: true,
                  },
                },
                {
                  name: "SQS",
                  emphasis: {
                    disabled: true,
                  },
                },
              ],
            },
          },
        ],
      });

      await chartInstance.setOption({
        xAxis: {
          axisLabel: {
            formatter: (value: any) => {
              const newDates: any = new Date(`${value}`).toLocaleDateString(
                "en-US",
                {
                  day: "2-digit",
                  month: "short",
                }
              );
              return newDates;
            },
          },
        },
      });
    }
    setLoading(false);
  }

  // Call API to Update Chart
  const getTransactionalLog = async () => {
    TransactionalLogSummary(selectedDays)
      .then(async (response) => {
        const TransactionalLogSummaryArr =
          response.data.transactionLogChannelSummary;
        let xaxis: any[] = [];
        let yaxisapi: any[] = [];
        let yaxisnats: any[] = [];
        let yaxissqs: any[] = [];
        TransactionalLogSummaryArr.forEach((val: GraphValue) => {
          const newDates: any = new Date(`${val.date}`).toLocaleDateString(
            "en-GB",
            {
              day: "2-digit",
              month: "short",
            }
          );
          xaxis = [...xaxis, newDates];
          yaxisapi = [...yaxisapi, val.api];
          yaxissqs = [...yaxissqs, val.sqs];
          yaxisnats = [...yaxisnats, val.nats];
        });
        setGraphData({
          ...graphData,
          xAxis: xaxis,
          yAxisApi: yaxisapi,
          yAxisNats: yaxisnats,
          yAxisSqs: yaxissqs,
        });
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        store.dispatch(
          showToast({
            type: "danger",
            title: "Error Occurred",
            message: getErrorMessage(error),
          })
        );
      });
  };

  // Use Effect to monitor and update the graph on change in dropdown
  useEffect(() => {
    // Axios request to hit endpoint
    setLoading(true);
    getTransactionalLog();
  }, [selectedDays]);

  useEffect(() => {
    // Update chart values

    if (chartDom.current !== null) {
      const lineChart = chartDom.current;
      renderChart(lineChart);
    }
    document
      .querySelector<any>(".echarts-for-react")
      ?.setAttribute("role", "img");
  }, [graphData]);

  useEffect(() => {
    return () => {
      if (chartDom.current !== null) {
        chartInstance = getCurrentEchartInstance(chartDom.current);
      }
      chartInstance && chartInstance.dispose();
    };
  }, []);

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
  useEffect(() => {
    // Update chart
    if (chartDom.current !== null) {
      const chart = getCurrentEchartInstance(chartDom.current);
      loading === true ? chart.showLoading(loadingOption) : chart.hideLoading();
    }
  }, [loading]);

  // Register the required components
  echarts.use([
    // CanvasRenderer,
    SVGRenderer,
    GridComponent,
    TooltipComponent,
    TitleComponent,
    DatasetComponent,
    LegendComponent,
    LineChart,
    UniversalTransition,
    DataZoomComponent,
    LabelLayout,
    AriaComponent,
    TimelineComponent,
  ]);
  return (
    <LineGraphWrapper className="echart-wrapper pl-lg-0 ">
      <div className="row mt-4 m-sm-0 mt-sm-4 align-items-center">
        <div className="col-sm-7 p-sm-0 pr-lg-2 chart-heading">
          <p className="font-change p-0 word-nowrap">Transactional Channel</p>
        </div>

        <div className="col-sm-5 chart-dropdown">
          <ChartFilter
            defaultSelection="2 Days"
            uniqueId="lineChartTransactionalChannel"
            setSelectedDays={setSelectedDays}
            backgroundColor="#fff"
          />
        </div>
      </div>
      <ReactEChartsCore
        echarts={echarts}
        ref={chartDom}
        option={getOptionLine()}
        className="echart-wrapper transaction-log px-3 mx-2"
        loadingOption={loadingOption}
        showLoading={loading}
        opts={{ renderer: "svg" }}
        lazyUpdate
      />
    </LineGraphWrapper>
  );
};

export default TransactionalChannel;
