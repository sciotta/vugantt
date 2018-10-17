let moment = require('moment');

function weeksInYear(year) {
  return moment(year, 'YYYY').isoWeeksInYear();
}

function yearsBetween(d1, d2) {
  d1 = moment(d1, 'YYYY-MM-DD');
  d2 = moment(d2, 'YYYY-MM-DD');

  const years = [];
  if(d1.year() === d2.year()) {
    years.push({
      year: d1.year(),
      weeks: range(d1.weeks(), d2.weeks())
    });
    return years;
  }

  for(let a = d1.year(); a <= d2.year(); a++){
    let year = {
      year: a,
      weeks: weeksInYear(a)
    };
    if(a === d1.year()) {
      year.weeks = (year.weeks - d1.week()) + 1;
    }
    const totalWeeks = weeksInYear(a);
    if(a === d2.year()) {
      year.weeks = (totalWeeks - (year.weeks - d2.week() + 1)) + 1;
    }
    if(a === d1.year()) {
      const allWeekArray = generateArrayFromNumber(totalWeeks);
      year.weeks = allWeekArray.slice(Math.max(allWeekArray.length - year.weeks, 1))
    } else {
      year.weeks = generateArrayFromNumber(year.weeks);
    }
    years.push(year);
  }
  return years;
}

function generateArrayFromNumber(number){
  return Array.apply(null, {length: number}).map(function(value, index){
    return index + 1;
  });
}

const range = (start, end) => {
  const length = end - start;
  return Array.from({ length }, (_, i) => start + i);
};

function getFirstDateFromArray(dates, order){
  const orderedDates = dates.sort(function(a,b){
    if (order === 'desc') {
      return Date.parse(a) < Date.parse(b);
    } else {
      return Date.parse(a) > Date.parse(b);
    }
  });
  return orderedDates[0];
}

export default {
  yearsBetween,
  getFirstDateFromArray,
  weeksInYear
};
