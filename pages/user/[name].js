import { useRouter } from 'next/router';
import React, { useState } from 'react';
import ChartPage from './ChartPage';

const UserChart = () => {
  const router = useRouter();

  var { name } = router.query;

  return (
    <div className='chart-container'>
      {period.map((item, index) => (
        <ChartPage
          key={index}
          period={item}
          name={name}
          router={router}
          index={index}
          time={time[index]}
        />
      ))}
    </div>
  );
};
const period = ['daily', 'weekly', 'monthly', 'quarterly'];
const time = ['Month', 'Day', 'Month', 'Month'];
export default UserChart;
