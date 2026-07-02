/* eslint-disable @typescript-eslint/no-shadow */
import { BarChart } from "echarts/charts";
import {
  AriaComponent,
  GridComponent,
  TooltipComponent,
  TitleComponent,
  DatasetComponent,
  LegendComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import { UniversalTransition } from "echarts/features";
import * as echarts from "echarts/core";
import ReactEChartsCore from "echarts-for-react/lib/core";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ChartPagination from "components/ChartPagination";
import { generateEllipsesForYAxisValues, YaxisStyling } from "common/utils";
import { credentialStatusSummary } from "services/api/credentials.api";
import { BarGraphWrapper } from "./styled";

interface GraphData {
  xAxis: number[];
  yAxisActive: number[];
  yAxisInactive: number[];
  yAxisTotal: number[];
}
interface GraphValue {
  name: string;
  total: number;
  active: number;
  inactive: number;
}

const CredentialsGraph = () => {
  // Graph Related
  const [graphData, setGraphData] = useState<GraphData>({
    xAxis: [],
    yAxisActive: [],
    yAxisInactive: [],
    yAxisTotal: [],
  });
  const [loading, setLoading] = useState(true);
  const AriaStyling = (
    xaxisval: any[],
    yaxisActive: any[],
    yaxisInactive: any[],
    yaxisTotalval: any[]
  ) => {
    let DataObject: string = "";
    for (let element = xaxisval.length - 1; element >= 0; element -= 1) {
      DataObject = DataObject.concat(
        `The Graph Values for ${xaxisval[element]} is:\n Active: ${yaxisActive[element]}. Inactive: ${yaxisInactive[element]}. The Total Credentials are  ${yaxisTotalval[element]}\n`
      );
    }
    return DataObject;
  };

  const getOption = () => {
    return {
      baseOption: {
        aria: {
          enabled: true,
          label: {
            general: {
              withTitle: "This is a chart about Credential of each Client",
            },
            series: {
              maxCount: 1,
              multiple: {
                withName: `The bar graph values for Credential Graph are as follows: \n`,
              },
            },
            data: {
              maxCount: 1,
              withName: AriaStyling(
                graphData.xAxis,
                graphData.yAxisActive,
                graphData.yAxisInactive,
                graphData.yAxisTotal
              ),
            },
          },
        },
        tooltip: {
          trigger: "item",
          axisPointer: {
            // Use axis to trigger tooltip
            type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
          },
        },
        legend: {
          orient: "horizontal",
          x: "center",
          y: "bottom",
          icon: "circle",
          textStyle: {
            fontFamily: "Montserrat",
            fontWeight: 600,
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
          show: true,
          borderColor: "#ccc",
        },
        xAxis: {
          type: "value",
          boundaryGap: false,
          max(value: any) {
            const val = value.max / 2;
            if (val / 2 === 0) {
              if (value.max / 2 - value.min / 2 > 20) {
                return window.outerWidth < 576 ? val + 8 : val + 6;
              }
              return window.outerWidth < 576 ? val + 4 : val + 2;
            }
            if (value.max / 2 - value.min / 2 > 20) {
              return window.outerWidth < 576 ? val + 7 : val + 5;
            }
            return window.outerWidth < 576 ? val + 3 : val + 1;
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#555555",
            },
          },
        },
        yAxis: {
          type: "category",
          data: YaxisStyling(graphData.xAxis),
          axisTick: {
            show: false,
          },
          axisLine: {
            show: true,
          },
          nameTextStyle: {
            fontFamily: "Montserrat",
            fontSize: 18,
            fontWeight: 600,
            lineHeight: 27,
            color: "#555555",
          },
          axisLabel: {
            formatter(value: any) {
              return `${Array(6)
                .fill("\xa0")
                .join("")}${generateEllipsesForYAxisValues(value)}`;
            },
          },
        },
        textStyle: {
          fontFamily: "Montserrat",
          fontSize: 20,
          fontWeight: 600,
          lineHeight: 17,
          color: "#222328",
        },
        series: [
          {
            id: 1,
            name: "Active",
            type: "bar",
            stack: "total",
            color: "#499026",
            barCategoryGap: 24,
            barWidth: 24,
            label: {
              show: true,
              fontSize: 14,
              fontWeight: "bold",
            },
            emphasis: {
              focus: "series",
            },
            data: graphData.yAxisActive,
            textStyle: {
              fontSize: 14,
              fontWeight: "bold",
            },
          },
          {
            id: 2,
            name: "Inactive",
            type: "bar",
            stack: "total",
            color: "#C10E21",
            barCategoryGap: 24,
            barWidth: 24,
            label: {
              show: true,
              fontSize: 14,
              fontWeight: "bold",
            },
            emphasis: {
              focus: "series",
            },
            data: graphData.yAxisInactive,
            textStyle: {
              fontSize: 14,
              fontWeight: "bold",
            },
          },
          {
            id: 3,
            type: "bar",
            stack: "total",
            color: "transparent",
            barCategoryGap: 24,
            barWidth: 24,
            label: {
              show: true,
              fontSize: 14,
              fontWeight: "bold",
              position: ["10%", "25%"],
              align: "left",
            },
            tooltip: {
              textStyle: {
                color: "#fff",
              },
              position: [-1590, -400],
            },
            emphasis: {
              disabled: true,
            },
            data: graphData.yAxisTotal,
          },
        ],
      },
    };
  };
  const getCurrentEchartInstance = (chart: any) => {
    return chart.getEchartsInstance();
  };
  const chartDom = useRef(null);
  let chartInstance: any = null;
  async function renderChart(chart: any) {
    const renderInstance = getCurrentEchartInstance(chart);
    if (renderInstance) {
      chartInstance = renderInstance;
    } else {
      chartInstance = echarts.init(chart);
    }
    await chartInstance.setOption({
      baseOption: {
        title: {
          show: false,
        },
        yAxis: {
          type: "category",
          data: YaxisStyling(graphData.xAxis),
          axisTick: {
            show: false,
          },
          axisLine: {
            show: true,
          },
        },
        series: [
          {
            name: "Active",
            data: graphData.yAxisActive,
          },
          {
            name: "Inactive",
            data: graphData.yAxisInactive,
          },
          {
            data: graphData.yAxisTotal,
          },
        ],
      },
      // Media Queries
      media: [
        {
          option: {
            legend: {
              emphasis: {
                selectorLabel: {
                  show: false,
                },
              },
            },
            series: [
              {
                name: "Active",
                emphasis: {
                  disabled: false,
                  focus: "series",
                },
                legendHoverLink: true,
              },
              {
                name: "Inactive",
                emphasis: {
                  disabled: false,
                  focus: "series",
                },
                legendHoverLink: true,
              },
              {
                emphasis: {
                  disabled: true,
                },
                legendHoverLink: false,
              },
            ],
          },
        },
        {
          query: {
            maxWidth: 767,
          },
          option: {
            legend: {
              emphasis: {
                selectorLabel: {
                  show: false,
                },
              },
            },
            series: [
              {
                name: "Active",
                emphasis: {
                  disabled: true,
                  focus: "none",
                },
                legendHoverLink: false,
              },
              {
                name: "Inactive",
                emphasis: {
                  disabled: true,
                  focus: "none",
                },
                legendHoverLink: false,
              },
              {
                emphasis: {
                  disabled: true,
                  focus: "none",
                },
                legendHoverLink: false,
              },
            ],
          },
        },
      ],
    });
  }

  const unselectGrap = (selected: any, chart: any) => {
    if (!selected.Active && !selected.Inactive) {
      chart.setOption({
        series: [
          {
            id: 3,
            label: {
              show: false,
              color: "transparent",
            },
          },
        ],
      });
    }
  };

  const selectGraph = (selected: any, chart: any) => {
    if (selected.Active || selected.Inactive) {
      chart.setOption({
        series: [
          {
            id: 3,
            label: {
              show: true,
              color: "#343A40",
            },
          },
        ],
      });
    }
  };

  useEffect(() => {
    if (chartDom.current !== null) {
      const chart: any = chartDom.current;
      const renderInstance = getCurrentEchartInstance(chart);
      if (renderInstance) {
        chartInstance = renderInstance;
      } else {
        chartInstance = echarts.init(chart);
      }
      chartInstance.on("legendselectchanged", "series.bar", (params: any) => {
        unselectGrap(params.selected, chartInstance);
        selectGraph(params.selected, chartInstance);
      });
    }
  }, []);

  const updateChart = useCallback((apiResponse: any) => {
    const { credentialStatusSummary } = apiResponse.data;
    let xaxis: any[] = [];
    let yaxisactive: any = [];
    let yaxisinactive: any = [];
    let yaxistotal: any[] = [];
    credentialStatusSummary.forEach((val: GraphValue) => {
      xaxis = [...xaxis, val.name];
      if (val.active === 0) {
        yaxisactive = [...yaxisactive, "-"];
      } else {
        yaxisactive = [...yaxisactive, val.active];
      }
      if (val.inactive === 0) {
        yaxisinactive = [...yaxisinactive, "-"];
      } else {
        yaxisinactive = [...yaxisinactive, val.inactive];
      }
      if (val.total === 0) {
        yaxistotal = [...yaxistotal, "-"];
      } else {
        yaxistotal = [...yaxistotal, val.total];
      }
    });
    setGraphData({
      xAxis: [...xaxis].reverse(),
      yAxisActive: yaxisactive.reverse(),
      yAxisInactive: yaxisinactive.reverse(),
      yAxisTotal: [...yaxistotal].reverse(),
    });
  }, []);
  // Use Effect to monitor and update the graph on change in dropdown

  useEffect(() => {
    // Update chart values
    if (
      graphData.yAxisActive.reduce((a, b) => a + b, 0) === 0 &&
      graphData.yAxisInactive.reduce((a, b) => a + b, 0) === 0
    ) {
      if (chartDom.current !== null) {
        const renderInstance = getCurrentEchartInstance(chartDom.current);
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
        setLoading(false);
      }
    } else {
      if (chartDom.current !== null) {
        const barChart = chartDom.current;
        renderChart(barChart);
      }
      setLoading(false);
    }
    document.querySelector<any>(".credential-bar")?.setAttribute("role", "img");
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
      loading === true ? chart.showLoading() : chart.hideLoading();
    }
  }, [loading]);

  // Register the required components
  echarts.use([
    CanvasRenderer,
    GridComponent,
    TooltipComponent,
    TitleComponent,
    DatasetComponent,
    BarChart,
    LegendComponent,
    UniversalTransition,
    AriaComponent,
  ]);
  return (
    <BarGraphWrapper className="echart-wrapper">
      <div className="d-flex flex-wrap justify-content-between align-items-center mt-4 pr-lg-1">
        <p className="font-change p-0">Credentials for each client</p>

        {/* Chart Pagination Start */}
        <div className="pagination marginAlign">
          <ChartPagination
            apiCaller={credentialStatusSummary}
            updateChart={updateChart}
          />
        </div>
        {/* Chart Pagination End */}
      </div>
      {/* BAR CHART */}
      <ReactEChartsCore
        echarts={echarts}
        ref={chartDom}
        option={getOption()}
        loadingOption={loadingOption}
        className="echart-wrapper credential-bar pl-md-2"
        lazyUpdate
      />
    </BarGraphWrapper>
  );
};

export default CredentialsGraph;
