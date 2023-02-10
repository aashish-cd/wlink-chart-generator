import { graphData } from '../pages/api/data';

export function getWeeklyAverages(data) {
  let weeklyAverages = [];
  let currentWeek = null;
  let weekData = {
    download: 0,
    upload: 0,
    count: 0,
  };

  for (let i = 0; i < data.length; i++) {
    let date = new Date(data[i].time);
    let time = getWeekNumber(date);

    if (currentWeek === null) {
      currentWeek = time;
    }

    if (time !== currentWeek) {
      weeklyAverages.push({
        time: currentWeek,
        download: weekData.download / weekData.count,
        upload: weekData.upload / weekData.count,
      });

      currentWeek = time;
      weekData = {
        download: 0,
        upload: 0,
        count: 0,
      };
    }

    weekData.download += data[i].download;
    weekData.upload += data[i].upload;
    weekData.count++;
  }

  if (weekData.count > 0) {
    weeklyAverages.push({
      time: currentWeek,
      download: weekData.download / weekData.count,
      upload: weekData.upload / weekData.count,
    });
  }

  return weeklyAverages;
}

function getWeekNumber(date) {
  let d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  let yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  let weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);

  return weekNo;
}

getWeeklyAverages(graphData.quaterly);
