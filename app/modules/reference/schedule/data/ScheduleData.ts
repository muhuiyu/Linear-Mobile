import { DateTime } from 'luxon'
import { DailySchedule, Session } from '../models/Session'

export const scheduleData: DailySchedule[] = [
  {
    id: 'class',
    date: DateTime.fromObject({ year: 2023, month: 7, day: 4 }),
    sessions: [
      {
        id: 'class-1',
        name: 'IT check',
        startTime: DateTime.fromObject({ hour: 8 }),
        intervalInMinutes: 120,
        location: 'IT room',
        note: 'Please bring your laptop there',
      },
      {
        id: 'class-1',
        name: 'Session 2',
        startTime: DateTime.fromObject({ hour: 10 }),
        intervalInMinutes: 60,
        location: 'IT room',
        note: '',
      },
      {
        id: 'class-1',
        name: 'Session 3',
        startTime: DateTime.fromObject({ hour: 12 }),
        intervalInMinutes: 60,
        location: 'IT room',
        note: '',
      },
    ],
  },
  {
    id: 'class',
    date: DateTime.fromObject({ year: 2023, month: 7, day: 10 }),
    sessions: [
      {
        id: 'class-1',
        name: 'Session 1',
        startTime: DateTime.fromObject({ year: 2023, month: 7, day: 10, hour: 8 }),
        intervalInMinutes: 120,
        location: 'IT room',
        note: '',
      },
      {
        id: 'class-1',
        name: 'Session 2',
        startTime: DateTime.fromObject({ year: 2023, month: 7, day: 10, hour: 10 }),
        intervalInMinutes: 60,
        location: 'IT room',
        note: '',
      },
      {
        id: 'class-1',
        name: 'Session 3',
        startTime: DateTime.fromObject({ year: 2023, month: 7, day: 10, hour: 12 }),
        intervalInMinutes: 60,
        location: 'IT room',
        note: '',
      },
      {
        id: 'class-1',
        name: 'Session 8',
        startTime: DateTime.fromObject({ year: 2023, month: 7, day: 10, hour: 19 }),
        intervalInMinutes: 60,
        location: 'IT room',
        note: '',
      },
    ],
  },
  {
    id: 'class',
    date: DateTime.fromObject({ year: 2023, month: 7, day: 11 }),
    sessions: [
      {
        id: 'class-1',
        name: 'Session 1',
        startTime: DateTime.fromObject({ year: 2023, month: 7, day: 11, hour: 8 }),
        intervalInMinutes: 120,
        location: 'IT room',
        note: '',
      },
      {
        id: 'class-1',
        name: 'Session 2',
        startTime: DateTime.fromObject({ year: 2023, month: 7, day: 11, hour: 10 }),
        intervalInMinutes: 60,
        location: 'IT room',
        note: '',
      },
      {
        id: 'class-1',
        name: 'Session 3',
        startTime: DateTime.fromObject({ year: 2023, month: 7, day: 11, hour: 12 }),
        intervalInMinutes: 60,
        location: 'IT room',
        note: '',
      },
      {
        id: 'class-1',
        name: 'Session 8',
        startTime: DateTime.fromObject({ year: 2023, month: 7, day: 11, hour: 19 }),
        intervalInMinutes: 60,
        location: 'IT room',
        note: '',
      },
    ],
  },
]

export const getSessionById = (sessionId: string): Session | undefined => {
  for (const dailySchedule of scheduleData) {
    for (const session of dailySchedule.sessions) {
      if (session.id === sessionId) {
        return session
      }
    }
  }
  return undefined // return undefined if no session is found with the provided id
}
