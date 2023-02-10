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
import { useRouter } from 'next/router';
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

const ChartPage = ({ period, name, router, index }) => {
  const [data, setData] = useState();
  const [username, setUsername] = useState(name);
  const [time, setTime] = useState();
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
      setLabels(data.map((item) => dayjs(item.time).format('MMM-DD')));

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
  }, [name]);

  return (
    <div className='chart' style={{ margin: '5rem auto' }}>
      <Line options={options} data={lineData} />
      <button
        onClick={() => fetchDataFromJson(name)}
        style={{
          position: 'fixed',
          top: 0,
          left: index * 250,
          border: 'none',
          padding: '1rem',
          fontSize: '1rem',
          cursor: 'pointer',
          borderRadius: '0.5rem',
          // hover
          '&:hover': {
            background: '#f5f5f5',
          },
        }}
      >
        reload {period}
      </button>
    </div>
  );
};

export default ChartPage;
