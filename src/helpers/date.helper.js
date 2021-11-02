import moment from 'moment'

export default {

  nowShort: () => moment().format('MM.DD HH:mm:ss'),
  dateShort: (date) => moment(date).format('MM.DD HH:mm:ss'),

  timestamp: () => parseInt(moment().format('X'), 10),
  timestampMs: () => Date.now(),

  msOneSec: 1000,
  msOneMin: 1000 * 60,
  msOneHour: 1000 * 60 * 60,
  msOneDay: 1000 * 60 * 60 * 24,
  msOneWeek: 1000 * 60 * 60 * 24 * 7,
  msOneMonth: 1000 * 60 * 60 * 24 * 7 * 4,
  msOneYear: 1000 * 60 * 60 * 24 * 7 * 4 * 12,

}
