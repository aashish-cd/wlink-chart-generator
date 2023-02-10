const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export function getMonthlyAverages(data) {
  let monthlyAverages = [];
  let currentMonth = null;
  let monthData = {
    download: 0,
    upload: 0,
    count: 0,
  };

  for (let i = 0; i < data.length; i++) {
    let date = new Date(data[i].time);
    let time = monthNames[date.getMonth()];

    if (currentMonth === null) {
      currentMonth = time;
    }

    if (time !== currentMonth) {
      monthlyAverages.push({
        time: currentMonth,
        download: monthData.download / monthData.count,
        upload: monthData.upload / monthData.count,
      });

      currentMonth = time;
      monthData = {
        download: 0,
        upload: 0,
        count: 0,
      };
    }

    monthData.download += data[i].download;
    monthData.upload += data[i].upload;
    monthData.count++;
  }

  if (monthData.count > 0) {
    monthlyAverages.push({
      time: currentMonth,
      download: monthData.download / monthData.count,
      upload: monthData.upload / monthData.count,
    });
  }

  return monthlyAverages;
}
