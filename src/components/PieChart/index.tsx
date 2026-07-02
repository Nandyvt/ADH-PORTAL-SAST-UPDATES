/* eslint-disable no-empty */

import { PieChart } from "echarts/charts";
import ReactEChartsCore from "echarts-for-react/lib/core";
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
import { CanvasRenderer } from "echarts/renderers";
import { LabelLayout, UniversalTransition } from "echarts/features";
import * as echarts from "echarts/core";
import React, { useEffect, useRef, useState } from "react";
import { intToString } from "common/utils";
import ChartFilter from "components/ChartFilter";
import { PieChartGraphWrapper } from "./styled";

export interface IPositionObject {
  orient: string;
  top: string;
  right: string;
  left: string;
}
export interface IPosition {
  top: IPositionObject;
  bottom: IPositionObject;
  left: IPositionObject;
  right: IPositionObject;
}

const position: IPosition = {
  top: {
    orient: "horizontal",
    top: "",
    left: "center",
    right: "",
  },
  right: {
    orient: "vertical",
    top: "center",
    right: "",
    left: "68%",
  },
  bottom: {
    orient: "horizontal",
    top: "90%",
    left: "center",
    right: "",
  },
  left: {
    orient: "vertical",
    top: "center",
    left: "",
    right: "",
  },
};

const getPosition = (key: keyof IPosition) => position[key];

const PieChartGraph = ({
  className = "",
  chartTitle = "Chart Title",
  legendsColor,
  legendsData,
  chartData,
  backgroundColor = "white",
  legendValue,
  chartUniqueId,
  setDaysSelected = () => 0,
  loading,
  legendsPosition = "bottom",
  hideTitle = false,
  hideDropDown = false,
  style,
}: any) => {
  const [sum, setSum] = useState<number>(0);
  const [selectedDays, setSelectedDays] = useState<number>(2);
  const [lPosition, setLPosition] = useState<any>({
    orient: "horizontal",
    x: "center",
    y: "bottom",
  });
  const [chartCenter, setChartCenter] = useState<any>(["50%", "50%"]);
  useEffect(() => {
    setLPosition(getPosition(legendsPosition));
    if (legendsPosition === "right") {
      setChartCenter(["38%", "50%"]);
    }
  }, [legendsPosition]);

  let chartInstance: any = null;

  // find the sum of all data values
  useEffect(() => {
    if (chartData) {
      setSum(
        chartData.reduce((prev: any, current: any) => prev + current.value, 0)
      );
    }
  }, [chartData]);

  const getOption = () => {
    return {
      aria: {
        enabled: true,
        label: {
          enabled: true,
        },
      },
      tooltip: {
        trigger: "item", // On hover of data item the tooltip presents itself
        formatter: "{b}: {c}",
        position: (point: any, params: any, dom: any, rect: any, size: any) => {
          const obj: any = { top: point[1] };
          obj[["left", "right"][+(point[0] > size.viewSize[0] / 2)]] = "15%";
          return obj;
        },
      },
      legend: {
        ...lPosition,
        textStyle: {
          fontFamily: "Montserrat",
          fontWeight: 600,
          color: "rgba(34, 35, 40, 1)",
          fontSize: 14,
        },
        itemGap: legendsPosition === "right" ? 20 : 15,
        lineHeight: 18,
        itemHeight: 9,
        itemWidth: 9,
        data: legendsData,
        formatter: legendValue
          ? (name: any) => {
              const itemValue = chartData.filter(
                (item: any) => item.name === name
              );
              return `${name} : ${intToString(itemValue[0].value)}`;
            }
          : "{name}",
      },
      series: [
        {
          type: "pie",
          name: chartTitle,
          radius: ["45%", "75%"],
          center: chartCenter,
          selectedMode: "single",
          selectedOffset: 10, // Option decides how far selected element should be from the center
          data: chartData ?? [],
          label: {
            show: true,
            position: "center",
            fontSize: 26,
            fontWeight: 600,
            fontFamily: "Montserrat",
            padding: 18,
            borderCenter: 10,
            borderRadius: 30,
            silent: true,
          },
          avoidLabelOverlap: false,
          stillShowZeroSum: false,
          showEmptyCircle: false,
          emphasis: {
            label: {
              show: true,
              formatter: (c: any) => {
                return intToString(c.value);
              },
              fontSize: 26,
              fontWeight: 600,
              backgroundColor,
              fontFamily: "Montserrat",
              padding: 25,
              borderRadius: 30,
              silent: true,
            },
          },
          select: {
            label: {
              show: true,
              formatter: (c: any) => {
                return intToString(c.value);
              },
              fontSize: 26,
              fontWeight: 600,
              fontFamily: "Montserrat",
              backgroundColor,
              padding: 18,
              borderRadius: 30,
              silent: true,
            },
          },
          labelLayout: {
            hideOverlap: false,
            align: "center",
            verticalAlign: "center",
          },
        },
      ],
      color: legendsColor,
    };
  };

  const pieChartDom = useRef(null);

  async function renderChart(chart: any) {
    const renderInstance = chart.getEchartsInstance();
    if (renderInstance) {
      chartInstance = renderInstance;
    } else {
      chartInstance = echarts.init(chart, { renderer: "svg" });
    }
    const options = {
      title: {
        text: "",
      },
      legend: {
        selectedMode: true,
        data: legendsData,
      },
      series: [
        {
          type: "pie",
          data: chartData,
          label: {
            formatter: () => {
              return sum ? intToString(sum) : "";
            },
          },
        },
      ],
    };
    await chartInstance.setOption(options);
    if (!sum) {
      chartInstance.setOption({
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
        legend: {
          selectedMode: false,
          data: legendsData,
        },
      });
    }
    const el = document.querySelector<any>(`.${chartTitle.replace(/ /g, "")}`);
    el?.setAttribute("role", "img");
  }
  const getChartInstance = (myChart: any) => myChart.getEchartsInstance();
  useEffect(() => {
    if (pieChartDom.current !== null) {
      const pieChart = pieChartDom.current;
      renderChart(pieChart);
    }
  }, [sum]);

  useEffect(() => {
    setDaysSelected(selectedDays);
  }, [selectedDays]);

  useEffect(() => {
    if (pieChartDom.current !== null) {
      const pieChart = pieChartDom.current;

      if (loading) {
        getChartInstance(pieChart).showLoading();
      } else {
        getChartInstance(pieChart).hideLoading();
      }
    }
  }, [loading]);

  useEffect(() => {
    return () => {
      chartInstance?.dispose();
    };
  }, []);

  const setChartOption = async (chart: any, value: number, myData: any) => {
    try {
      await chart.setOption({
        series: [
          {
            type: "pie",
            name: chartTitle,
            data: myData,
            label: {
              formatter: () => {
                return intToString(value);
              },
            },
          },
        ],
      });
    } catch (error) {}
  };
  function allAreEqual(obj: any) {
    return new Set(Object.values(obj)).size === 1;
  }
  const getSum = (arr: any) => {
    let count = 0;
    arr.forEach((item: any) => {
      count += item.value;
    });
    return count;
  };
  const getLegendData = (mydataArr: any, name: string, selected: any) => {
    let itemsSum = 0;
    mydataArr.forEach((item: any) => {
      if (item.name !== name) {
        itemsSum += item.value;
      }
    });
    return itemsSum;
  };

  async function handleLegendSelection(event: any) {
    if (pieChartDom.current !== null) {
      const pieChart = pieChartDom.current;
      chartInstance = getChartInstance(pieChart);
      const pieChartData = chartInstance.getOption().series[0].data;
      chartData = pieChartData;
      const { name, selected } = event;
      const selectedLegendName = selected[name];
      const allLegendsSelected = allAreEqual(selected);
      if (!selectedLegendName) {
        try {
          await setChartOption(
            chartInstance,
            getLegendData(pieChartData, name, selected),
            chartData
          );
        } catch (error) {}
      }
      if (allLegendsSelected) {
        try {
          await setChartOption(chartInstance, getSum(pieChartData), chartData);
        } catch (error) {}
      }
    }
  }

  const highlightUnselectedLegendData = (id: any, unselect: boolean) => {
    if (legendsData.length > 2) {
      if (id === legendsData.length - 1) {
        id -= 1;
      } else if (id !== 0) {
        id += 1;
      }
    }

    return legendsData.map((item: any, index: any) => {
      let arrItem = {};
      if (!unselect) {
        if (index !== id) {
          arrItem = {
            ...item,
            itemStyle: {
              opacity: "0.2",
            },
            textStyle: {
              color: "rgba(34, 35, 40, 0.2)",
            },
          };
        } else {
          arrItem = {
            ...item,
            itemStyle: {
              opacity: "1",
              textStyle: {
                color: "rgba(34, 35, 40, 1)",
              },
            },
          };
        }
      }
      if (unselect) {
        if (index !== id) {
          arrItem = {
            ...item,
            itemStyle: {
              opacity: "1",
            },
            textStyle: {
              color: "rgba(34, 35, 40, 1)",
            },
          };
        } else {
          arrItem = item;
        }
      }
      return arrItem;
    });
  };

  async function handleSelect(event: any) {
    const { fromAction, selected } = event;
    if (fromAction === "select") {
      const selectionId = selected[0].dataIndex[0];
      if (pieChartDom.current !== null) {
        const pieChart = pieChartDom.current;
        chartInstance = getChartInstance(pieChart);
        chartInstance.setOption({
          legend: {
            data: highlightUnselectedLegendData(selectionId, false),
          },
        });
      }
    }
    if (fromAction === "unselect") {
      const { dataIndexInside } = event.fromActionPayload;
      if (pieChartDom.current !== null) {
        const pieChart = pieChartDom.current;
        chartInstance = getChartInstance(pieChart);
        chartInstance.setOption({
          legend: {
            data: highlightUnselectedLegendData(dataIndexInside, true),
          },
        });
      }
    }
  }
  useEffect(() => {
    if (chartInstance) {
      chartInstance.on(
        "legendselectchanged",
        "series.pie",
        handleLegendSelection
      );
      chartInstance.on("selectchanged", "series.pie", handleSelect);
    }
  }, []);
  // Register the required components
  echarts.use([
    CanvasRenderer,
    GridComponent,
    TooltipComponent,
    TitleComponent,
    DatasetComponent,
    PieChart,
    LegendComponent,
    UniversalTransition,
    DataZoomComponent,
    AriaComponent,
    LabelLayout,
    TimelineComponent,
  ]);
  return (
    <PieChartGraphWrapper
      className={`echart-wrapper ${hideTitle && hideDropDown ? "" : className}`}
      style={{ backgroundColor, display: "flow-root" }}
    >
      {!hideTitle || !hideDropDown ? (
        <div className="row mt-4 p-lg-1 p-0 m-0 align-items-center">
          <div
            className={`p-lg-1-bkp p-lg-2-bkp p-lg-0 ${
              hideDropDown ? "col-sm-12" : "col-sm-7 p-0 chart-heading "
            }`}
          >
            {hideTitle ? (
              ""
            ) : (
              <p
                className={`font-change p-0 word-nowrap m-0 ${
                  hideDropDown ? "left-float " : ""
                }`}
              >
                {chartTitle}
              </p>
            )}
          </div>
          {!hideDropDown ? (
            <div className="col-sm-5 chart-dropdown">
              <ChartFilter
                defaultSelection="2 Days"
                uniqueId={chartUniqueId}
                setSelectedDays={setSelectedDays}
                backgroundColor={backgroundColor}
              />
            </div>
          ) : undefined}
        </div>
      ) : (
        ""
      )}

      {/* PIE CHART */}
      <ReactEChartsCore
        echarts={echarts}
        ref={pieChartDom}
        option={getOption()}
        className={`echarts-wrapper ${chartTitle.replace(/ /g, "")}`}
        opts={{ renderer: "svg" }}
        style={style}
      />
    </PieChartGraphWrapper>
  );
};

export default PieChartGraph;
