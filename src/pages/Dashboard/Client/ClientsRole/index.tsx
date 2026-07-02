/* eslint-disable @typescript-eslint/no-shadow */
import { BarChart } from "echarts/charts";
import {
  AriaComponent,
  GridComponent,
  TooltipComponent,
  TitleComponent,
  DatasetComponent,
  LegendComponent,
  MarkPointComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import { UniversalTransition } from "echarts/features";
import * as echarts from "echarts/core";
import ReactEChartsCore from "echarts-for-react/lib/core";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { clientRolesSummary } from "services/api/clientRole.api";
import ChartPagination from "components/ChartPagination";
import { generateEllipsesForYAxisValues, YaxisStyling } from "common/utils";
import { BarGraphWrapper } from "./styled";

interface GraphData {
  xAxis: number[];
  yAxisAdmin: number[];
  yAxisEndUser: number[];
  yAxisTotal: number[];
}
interface GraphValue {
  name: string;
  total: number;
  admin: number;
  clientUser: number;
}

const ClientsGraph = () => {
  // Graph Related
  const [graphData, setGraphData] = useState<GraphData>({
    xAxis: [],
    yAxisAdmin: [],
    yAxisEndUser: [],
    yAxisTotal: [],
  });
  const [loading, setLoading] = useState(true);
  const AriaStyling = (
    xaxisval: any[],
    yaxisAdminval: any[],
    yaxisEnduserval: any[],
    yaxisTotalval: any[]
  ) => {
    let DataObject: string = "";
    for (let element = xaxisval.length - 1; element >= 0; element -= 1) {
      DataObject = DataObject.concat(
        `The Graph Values for ${xaxisval[element]} is:\n Admin: ${yaxisAdminval[element]}. End-User: ${yaxisEnduserval[element]}. The Total Users are  ${yaxisTotalval[element]}\n`
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
              withTitle: "This is a chart about Roles of each Client",
            },
            series: {
              maxCount: 1,
              multiple: {
                withName: `The bar graph values for Client Role Graph are as follows: \n`,
              },
            },
            data: {
              maxCount: 1,
              withName: AriaStyling(
                graphData.xAxis,
                graphData.yAxisAdmin,
                graphData.yAxisEndUser,
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
            fontFamily: " Montserrat",
            fontSize: 14,
            fontWeight: 600,
            lineHeight: 27,
            color: "#222328",
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
          fontSize: 14,
          fontWeight: 600,
        },
        series: [
          {
            id: 1,
            name: "Admin",
            type: "bar",
            stack: "total",
            color: "#1978B2",
            barGap: "20%",
            barCategoryGap: "40%",
            barWidth: 24,
            label: {
              show: true,
              fontSize: 14,
              fontWeight: "bold",
            },
            emphasis: {
              disabled: false,
              focus: "series",
            },
            legendHoverLink: true,
            data: graphData.yAxisAdmin,
            textStyle: {
              fontSize: 14,
              fontWeight: "bold",
            },
          },
          {
            id: 2,
            name: "Client-User",
            type: "bar",
            stack: "total",
            color: "#343A40",
            barGap: "20%",
            barCategoryGap: "40%",
            barWidth: 24,
            label: {
              show: true,
              fontSize: 14,
              fontWeight: "bold",
            },
            emphasis: {
              disabled: false,
              focus: "series",
            },
            legendHoverLink: true,
            data: graphData.yAxisEndUser,
          },
          {
            id: 3,
            type: "bar",
            stack: "total",
            color: "transparent",
            barGap: "20%",
            barCategoryGap: "40%",
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
            legendHoverLink: true,
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
    if (
      graphData.yAxisAdmin.reduce((a, b) => a + b, 0) === 0 &&
      graphData.yAxisEndUser.reduce((a, b) => a + b, 0) === 0
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
      await chartInstance.setOption({
        baseOption: {
          title: {
            show: false,
          },
          series: [
            {
              id: 1,
              data: graphData.yAxisAdmin,
              legendHoverLink: true,
            },
            {
              id: 2,
              data: graphData.yAxisEndUser,
              legendHoverLink: true,
            },
            {
              id: 3,
              data: graphData.yAxisTotal,
              legendHoverLink: false,
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
                  id: 1,
                  emphasis: {
                    disabled: false,
                    focus: "series",
                  },
                  legendHoverLink: true,
                },
                {
                  id: 2,
                  emphasis: {
                    disabled: false,
                    focus: "series",
                  },
                  legendHoverLink: true,
                },
                {
                  id: 3,
                  emphasis: {
                    disabled: true,
                    focus: "series",
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
                  id: 1,
                  emphasis: {
                    disabled: true,
                    focus: "none",
                  },
                  legendHoverLink: false,
                },
                {
                  id: 2,
                  emphasis: {
                    disabled: true,
                    focus: "none",
                  },
                  legendHoverLink: false,
                },
                {
                  id: 3,
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
    setLoading(false);
  }
  const unselectGrap = (selected: any, chart: any) => {
    if (!selected.Admin && !selected["End-User"]) {
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
    if (selected.Admin || selected["End-User"]) {
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

  const updateChartClientRole = useCallback((apiResponse: any) => {
    const { clientRolesSummary } = apiResponse.data;
    let xaxis: any[] = [];
    let yaxisadmin: any = [];
    let yaxisenduser: any = [];
    let yaxistotal: any[] = [];
    clientRolesSummary.forEach((val: GraphValue) => {
      xaxis = [...xaxis, val.name];
      if (val.admin === 0) {
        yaxisadmin = [...yaxisadmin, "-"];
      } else {
        yaxisadmin = [...yaxisadmin, val.admin];
      }
      if (val.clientUser === 0) {
        yaxisenduser = [...yaxisenduser, "-"];
      } else {
        yaxisenduser = [...yaxisenduser, val.clientUser];
      }
      if (val.total === 0) {
        yaxistotal = [...yaxistotal, "-"];
      } else {
        yaxistotal = [...yaxistotal, val.total];
      }
    });
    setGraphData({
      xAxis: [...xaxis].reverse(), // Vineeth to check
      yAxisAdmin: yaxisadmin.reverse(),
      yAxisEndUser: yaxisenduser.reverse(),
      yAxisTotal: [...yaxistotal].reverse(),
    });
  }, []);
  // Use Effect to monitor and update the graph on change in dropdown

  useEffect(() => {
    // Update chart values

    if (chartDom.current !== null) {
      const barChart = chartDom.current;
      renderChart(barChart);
    }

    document.querySelector<any>(".role-bar")?.setAttribute("role", "img");
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
    AriaComponent,
    CanvasRenderer,
    GridComponent,
    TooltipComponent,
    TitleComponent,
    DatasetComponent,
    BarChart,
    MarkPointComponent,
    LegendComponent,
    UniversalTransition,
  ]);

  return (
    <BarGraphWrapper className="echart-wrapper">
      <div className="d-flex flex-wrap justify-content-between align-items-center mt-4">
        <p className="font-change p-0">Roles from each client</p>

        {/* Chart Pagination Start */}
        <div className="pagination marginAlign">
          <ChartPagination
            apiCaller={clientRolesSummary}
            updateChart={updateChartClientRole}
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
        className="echart-wrapper clientsbar role-bar"
        lazyUpdate
      />
    </BarGraphWrapper>
  );
};

export default ClientsGraph;
