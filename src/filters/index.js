import dayjs from 'dayjs'
export const formDate = (val) => {
  return dayjs(val).format('YYYY-MM-DD')
}
