const daysPerMonth = {
  'jan': 31,
  'feb': 28,
  'mar': 31,
  'apr': 30,
  'may': 31,
  'jun': 30,
  'jul': 31,
  'aug': 31,
  'sept': 30,
  'oct': 31,
  'nov': 30,
  'dec': 31
};

class IntervalExpansion{
  constructor(){
    this.months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sept", "oct", "nov", "dec"];
  }

  unwindIntervals(dateIntervals, strategy) {
    if (strategy === 1) {
        return this.strategy1(dateIntervals);
    } else {
        return this.strategy2(dateIntervals);
    }
  }

  strategy1(intervals){
    let intervalBoundaries = [];
    intervals.map(interval => intervalBoundaries.push(...interval));
    
    intervalBoundaries = this.sortIntervals(intervalBoundaries);
    return this.createIntervalsFromBoundaries(intervalBoundaries);
  }

  strategy2(intervals){
    let intervalBoundaries = [];
    intervals.forEach(interval => intervalBoundaries.push(interval[0]));
    intervalBoundaries.push(intervals[intervals.length -1][1]);
    intervalBoundaries = this.sortIntervals(intervalBoundaries);
    return this.createIntervalsFromBoundaries(intervalBoundaries);
  }

  createIntervalsFromBoundaries(intervalBoundaries){
    const boundaryCount = intervalBoundaries.length;
    const totalIntervals = [];
    let interval = [];

    for(let i=0, j=1; i < boundaryCount - 1, j < boundaryCount; i++, j++) {
      interval.push(intervalBoundaries[i]);
      if(j < boundaryCount - 1){
        let splittedDate = intervalBoundaries[j].split('-');
        let date = parseInt(splittedDate[0], 10);
        if(date === 1){
          const monthIndex = this.months.indexOf(splittedDate[1].toLowerCase());
          let previousMonth = this.months[monthIndex - 1];
          let newDate = daysPerMonth[previousMonth];
          console.log(newDate, date);
          splittedDate[0] = newDate;
          splittedDate[1] = previousMonth;
        } else {
          splittedDate[0] = date - 1;
        }
        interval.push(splittedDate.join('-'));
      } else {
        interval.push(intervalBoundaries[j]);
      }
      totalIntervals.push(interval);
      interval = [];
    }
    return totalIntervals;
  }

  sortIntervals(intervals){
    intervals.sort((a, b) => {
      const month1 = a.split('-')[1];
      const month2 = b.split('-')[1];
      
      return this.months.indexOf(month1.toLowerCase()) - this.months.indexOf(month2.toLowerCase());
    })
    return intervals;
  }

}

const intervalSimplifier = new IntervalExpansion();
const dateIntervals = [["1-jan", "2-may"], ["2-feb", "30-jun"], ["3-mar", "8-jul"]];

console.log("Intervals with strategy 1: ", intervalSimplifier.unwindIntervals(dateIntervals, 1));
console.log("\n");
console.log("Intervals with strategy 2: ", intervalSimplifier.unwindIntervals(dateIntervals, 2));