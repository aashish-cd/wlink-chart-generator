import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import dayjs from 'dayjs';
import axios from 'axios';

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
          time !== 'Day'
            ? dayjs(item.time).format('MMM-DD')
            : dayjs(item.time).format('ddd')
        )
      );

      console.log({ username, period, data });
    } catch (error) {
      console.error(error);
    }
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `${username} - ${period}`,
      },
    },
    scales: {
      y: {
        grid: {
          display: true,
        },
        title: {
          display: true,
          labelString: 'MB',
        },
        ticks: {
          beginAtZero: true,
        },
      },
      // ...
    },
    scales: {
      y: {
        grid: {
          display: true,
        },
        scaleLabel: {
          display: true,
          labelString: 'MB',
        },

        ticks: {
          beginAtZero: true,
        },
      },
      x: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: time,
          align: 'end',
        },
      },
    },
  };
  const lineData = {
    labels,
    datasets: [
      {
        label: 'Download',
        borderColor: '#F97879',
        backgroundColor: '#FEFEFF',
        data: data?.map((item) => item.download),
      },
      {
        label: 'Upload',
        borderColor: '#137BC2',
        backgroundColor: '#FEFEFF',
        data: data?.map((item) => item.upload),
      },
    ],
  };

  useEffect(() => {
    // fetchDataFromJson(name);

    // router.query.lang is defined
    fetchDataFromJson(name);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, username]);

  return (
    <div className='chart' style={{ margin: '5rem auto' }}>
      <Line options={options} data={lineData} />
      {/* <button
        onClick={() => fetchDataFromJson(name)}
        style={{
          position: 'fixed',
          top: 0,
          left: index * 90,
          border: 'none',
          padding: '0.8rem',
          fontSize: '0.8rem',
          cursor: 'pointer',
          borderRadius: '0.5rem',
          width: '75px',
        }}
      >
        load {period}
      </button> */}
    </div>
  );
};

export default ChartPage;
