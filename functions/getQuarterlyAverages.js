const quarterlyMonthNames = [
  'January - March',
  'April - June',
  'July - September',
  'October - December',
];
export function getQuarterlyAverages(data) {
  let quarterlyAverages = [];
  let currentQuarter = null;
  let quarterData = {
    download: 0,
    upload: 0,
    count: 0,
  };

  for (let i = 0; i < data.length; i++) {
    let date = new Date(data[i].time);
    let time = quarterlyMonthNames[Math.floor((date.getMonth() + 3) / 3 - 1)];

    if (currentQuarter === null) {
      currentQuarter = time;
    }

    if (time !== currentQuarter) {
      quarterlyAverages.push({
        time: currentQuarter,
        download: quarterData.download / quarterData.count,
        upload: quarterData.upload / quarterData.count,
      });

      currentQuarter = time;
      quarterData = {
        download: 0,
        upload: 0,
        count: 0,
      };
    }

    quarterData.download += data[i].download;
    quarterData.upload += data[i].upload;
    quarterData.count++;
  }

  if (quarterData.count > 0) {
    quarterlyAverages.push({
      time: currentQuarter,
      download: quarterData.download / quarterData.count,
      upload: quarterData.upload / quarterData.count,
    });
  }

  return quarterlyAverages;
}
