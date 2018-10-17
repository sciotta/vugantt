<template>
  <div class="vugantt">
    <div class="vugantt-header">
        <div class="vugantt-header--years">
            <div class="vugantt-header--years--column" v-for="(item) in headers" :key="item.id" :style="{ width: (item.weeks.length * 25) + 'px' }">
                {{item.year}}
            </div>
        </div>
       <div class="vugantt-header--weeks">
           <template v-for="(item) in headers">
               <div class="vugantt-header--weeks--column" v-for="(week) in item.weeks" :key="week">
                   {{week}}
               </div>
           </template>
       </div>
    </div>
    <div class="vugantt-body">
        <div class="vugantt-body--row" v-for="(row) in allData" :key="row.task" :style="{ width: totalWeeks * 25 + 'px' }">
            {{row.task}}
            <div class="vugantt-interval" v-for="(interval) in row.intervals" :key="interval.start" :style="{ width: (calculateIntervalWeeks(interval)* 25) + 'px', left: (calculateIntervalStart(interval) * 25) + 'px' }"></div>
        </div>
    </div>
  </div>
</template>

<script>
import dateUtils from '../utils/date-utils';
import allData from '../../test/test.json';

export default {
  name: 'Vugantt',
  props: {
    msg: String
  },
  methods: {
    calculateIntervalWeeks(interval) {
      return this.calculateTotalWeeks(interval.start, interval.end);
    },
    calculateTotalWeeks(startDate, endDate) {
        let years = dateUtils.yearsBetween(startDate, endDate);
        return years.map(item => item.weeks.length).reduce((prev, next) => prev + next);
    },
    calculateIntervalStart(interval) {
      return this.calculateTotalWeeks(this.startDate, interval.start);
    }
  },
  beforeMount(){
    let allStartDates = allData.map(item => item.intervals).reduce((prev, next) => prev.concat(next) , []).map(item => item.start);
    let allEndDates = allData.map(item => item.intervals).reduce((prev, next) => prev.concat(next) , []).map(item => item.end);

    this.startDate = dateUtils.getFirstDateFromArray(allStartDates, 'asc');
    let end = dateUtils.getFirstDateFromArray(allEndDates, 'desc');

    this.headers = dateUtils.yearsBetween(this.startDate, end);
    this.totalWeeks = this.calculateTotalWeeks(this.startDate, end);
  },
  data(){
    return {
      headers: null,
      allData: allData,
      totalWeeks: 0,
      startDate: null
    }
  }
}
</script>

<style lang="stylus" scoped>
h3
  margin: 40px 0 0

ul
  list-style-type: none
  padding: 0

li
  display: inline-block
  margin: 0 10px

a
  color: #42b983
.vugantt-header
    box-sizing: border-box
    border: 1px solid black

.vugantt-header--years
    display: -webkit-box;
    .vugantt-header--years--column
        box-sizing: border-box
        border-right: 1px solid black
        height 25px
        line-height 25px

.vugantt-header--weeks
    display: -webkit-box;
    .vugantt-header--weeks--column
        flex: 0 0 25px
        box-sizing: border-box
        border-right: 1px solid black
        border-top: 1px solid black;
        width 25px
        line-height 25px

.vugantt-body--row
    position relative
    box-sizing border-box
    line-height 25px
    height 25px
    border-left: 1px solid black
    border-right: 1px solid black
    border-bottom: 1px solid #cccbcc
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkJCRjNCRDExRDIyMTExRThBREExRTgxNjhFN0Y5NEI5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkJCRjNCRDEyRDIyMTExRThBREExRTgxNjhFN0Y5NEI5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QkJGM0JEMEZEMjIxMTFFOEFEQTFFODE2OEU3Rjk0QjkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QkJGM0JEMTBEMjIxMTFFOEFEQTFFODE2OEU3Rjk0QjkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7MTpHuAAAALElEQVR42uzNQQEAEAAEsKN/NUQ6KXhtBTba5qWzdmc+kEgkEolEIpHkCjAAyfkGmAB1GfYAAAAASUVORK5CYII=')

    &:last-child
        border-bottom-color: black

.vugantt-interval
    height: 4px
    background: #000051
    position: absolute
    top: 10px
    border-radius: 10px

</style>
