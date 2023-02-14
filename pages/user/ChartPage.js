import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

import dayjs from "dayjs";
import { useRouter } from "next/router";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartPage = ({ period, name, router, index, time }) => {
  const [data, setData] = useState();
  const [username, setUsername] = useState(name);

  const [labels, setLabels] = useState();

  //
  //

  //
  const fetchDataFromJson = async (name) => {
    try {
      const resData = await axios
        .get(`/data/${period}/${name}.json`)
        .then((res) => res.data);

      setUsername(name);
      setData(Object.values(resData)[0]);
      setLabels(
        data.map((item) =>
          time !== "Day"
            ? dayjs(item.time).format("MMM-DD")
            : dayjs(item.time).format("ddd")
        )
      );

      console.log({ username, period, data });
    } catch (error) {
      console.error(error);
    }
  };

  const options = {
    responsive: true,
    aspectRatio: 3,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `${username} - ${period}`,
      },
      tooltip: { enabled: false },
    },
    scales: {
      y: {
        grid: {
          display: true,
        },
        title: {
          display: true,
          text: "MB",
          align: "end",
        },
      },
      x: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: time,
          align: "end",
        },
      },
    },
  };

  const miniOptions = {
    responsive: true,
    aspectRatio: 15,
    borderColor: "#555", // lineColor
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: { enabled: false },
    },

    elements: {
      point: {
        radius: 0,
      },
    },
    scales: {
      y: {
        ticks: { display: false },
        grid: {
          display: false,
        },
        title: {
          display: false,
          text: "MB",
          align: "end",
        },
      },
      x: {
        ticks: { display: false },
        grid: {
          display: false,
        },
        title: {
          display: false,
        },
      },
    },
  };
  const lineData = {
    labels,
    datasets: [
      {
        label: "Download",
        borderColor: "#F97879",
        backgroundColor: "#FEFEFF",
        data: data?.map((item) => item.download),
      },
      {
        label: "Upload",
        borderColor: "#137BC2",
        backgroundColor: "#FEFEFF",
        data: data?.map((item) => item.upload),
      },
    ],
  };
  const miniLineData = {
    labels,
    datasets: [
      {
        data: data?.map((item) => item.upload),
      },
    ],
  };

  useEffect(() => {
    // fetchDataFromJson(name);

    // router.query.lang is defined
    fetchDataFromJson(name);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username, name]);

  return (
    <div className="chart" style={{ margin: "5vh auto 0 auto" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ textTransform: "capitalize" }}>{period}</span>
      </div>
      <Line options={options} data={lineData} />
      <div style={{ backgroundColor: "#888" }}>
        <Line options={miniOptions} data={miniLineData} />
      </div>
    </div>
  );
};

export default ChartPage;
