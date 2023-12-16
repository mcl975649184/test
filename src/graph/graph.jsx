import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Input } from "antd";
import "./graph.css";
import * as echarts from "echarts";
import { transformData } from "../util";
const Graph = () => {
  const [params, setParams] = useState({ code: 1 });
  const [form] = Form.useForm();
  const onFinish = ({ code }) => {
    setParams({ code: code || 1 });
  };
  useEffect(() => {
    getData();
  }, [params]);
  const getData = () => {
    fetch(`http://localhost:3000/api/policyholders?code=${params.code}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        getTree([data]);
      });
  };
  const getTree = (transformedData) => {
    var chartDom = document.getElementById("graph");
    var myChart = echarts.init(chartDom);
    var option;
    const data = transformData(transformedData, params.code);
    console.log(data);
    data[0].itemStyle = {
      color: "#eed10f",
    };
    myChart.clear();
    option = {
      series: [
        {
          type: "tree",
          initialTreeDepth: 3, //初始默认展开全部层级
          data: [data[0]],
          top: "12%",
          left: "8%",
          bottom: "3%",
          right: "8%",
          symbol: "rect",
          symbolKeepAspect: true,
          edgeShape: "polyline",
          orient: "vertical",
          symbolSize: function () {
            var value = arguments[0];
            // console.log("arguments", arguments);
            var params = arguments[1];
            return [70, 30];
          },
          edgeForkPosition: "63%",
          lineStyle: {
            width: 2,
          },
          label: {
            position: "inside", //标签文本位置设置
            align: "center",
            color: "#000",
            formatter: (params) => {
              return `${params.data.code}\n${params.name}`;
            },
          },
          leaves: {
            label: {
              position: "inside",
              verticalAlign: "middle",
              align: "center",
            },
          }, //设置叶子节点文本标签位置
          expandAndCollapse: "false", //禁止折叠交互

          animationDuration: 550,
          maxDepth: 2,
        },
      ],
    };

    myChart.on("click", (params) => {
      console.log();
      setParams({ code: params.data.code });
    });
    option && myChart.setOption(option, true);
  };
  return (
    <div className="layout">
      <div>保户关系查询</div>
      <hr />
      <div className="search">
        <Form
          form={form}
          name="horizontal_login"
          layout="inline"
          onFinish={onFinish}
        >
          <Form.Item name="code" label="保户编号">
            <Input placeholder="请输入编号" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="graph">
        <h2 className="graph_title">关系图</h2>
        <div id="graph"></div>
      </div>
    </div>
  );
};

export default Graph;
