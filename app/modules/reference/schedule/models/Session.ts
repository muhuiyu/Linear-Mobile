import { DateTime } from 'luxon'

export interface Session {
  id: string
  name: string
  startTime: DateTime
  intervalInMinutes: number
  location: string
  note: string
}

export interface DailySchedule {
  id: string
  date: DateTime
  sessions: Session[]
}

export function getDateString(dailySchedule: DailySchedule) {
  return dailySchedule.date.toFormat('cccc, LLLL dd')
}
export function getSessionTimeString(session: Session) {
  const sessionStartString = session.startTime.toFormat('HH:mm')
  const sessionEnd = session.startTime.plus({ minutes: session.intervalInMinutes })
  const sessionEndString = sessionEnd.toFormat('HH:mm')
  return `${sessionStartString} - ${sessionEndString}`
}
