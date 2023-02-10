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
//
//
//
//
//
//
//
const ChartPage = () => {
  const router = useRouter();
  const { name } = router.query;
  const [data, setData] = useState();
  const [username, setUsername] = useState();
  const [time, setTime] = useState();
  const [labels, setLabels] = useState();

  //
  //
  //
  const fetchDataFromJson = async (name) => {
    try {
      const response = await axios.get(`/data/${name}.json`);
      console.log({ response });
      const resData = await response.data;
      setTime(Object.keys(resData)[0]);
      setUsername(name);
      setData(Object.values(resData)[0]);
      setLabels(
        data.map((item) =>
          item % 3 === 0 ? dayjs(item.time).format('MMM-DD') : ''
        )
      );
      console.log({ username, time, data });
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
        text: `${username}`,
      },
    },
    // scales: {
    //   yAxes: {
    //     gridLines: {
    //       display: false,
    //     },
    //   },
    //   xAxes: {
    //     gridLines: {
    //       display: false,
    //     },
    //   },
    // },
  };
  //
  //
  //
  //
  //
  //
  //
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
    fetchDataFromJson(name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  console.log({ name });

  return (
    <div className='chart'>
      <h1>hello</h1>
      {data !== undefined && <Line options={options} data={lineData} />}
    </div>
  );
};
//
//
//
//
//
//
//

export default ChartPage;
