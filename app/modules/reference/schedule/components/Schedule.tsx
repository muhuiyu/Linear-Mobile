import { DateTime } from 'luxon'
import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { scheduleData } from '../data/ScheduleData'
import { Session, getDateString, getSessionTimeString } from '../models/Session'

interface Props {
  onPressSession(sessionId: Session['id']): void
}

const isPastDay = (day: DateTime): boolean => {
  const now = DateTime.now()
  return day.startOf('day') < now.startOf('day')
}

export default function Schedule({ onPressSession }: Props) {
  return (
    <View>
      {scheduleData.map((dailySchedule, i) => {
        const dayIsPast = isPastDay(dailySchedule.date)
        return (
          <View key={i} className={dayIsPast ? 'opacity-20' : ''}>
            <View className="p-3 bg-sky-200">
              <Text className="font-semibold">{getDateString(dailySchedule)}</Text>
            </View>
            {dailySchedule.sessions.map((session) => (
              <View className="flex flex-row">
                <View className="w-[110px] items-center p-3">
                  <Text>{getSessionTimeString(session)}</Text>
                </View>
                <Pressable
                  className="p-3 bg-green-300 flex-1"
                  onPress={() => {
                    onPressSession(session.id)
                  }}
                >
                  <Text>{session.name}</Text>
                </Pressable>
              </View>
            ))}
          </View>
        )
      })}
    </View>
  )
}
