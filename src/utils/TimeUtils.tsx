const getCurrentTimeInMillis = (): number => (new Date()).getTime()

const minutesToMillis = (minuteValue: number): number => minuteValue * 60 * 1000;

export const TimeUtils = {
  getCurrentTimeInMillis,
  minutesToMillis,
}