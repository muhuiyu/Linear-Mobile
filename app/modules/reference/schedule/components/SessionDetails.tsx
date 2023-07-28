import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Session } from '../models/Session'

interface ScheduleDetailsProps {
  session: Session
}

const ScheduleDetails: React.FC<ScheduleDetailsProps> = ({ session }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{session.name}</Text>
      <View className="gap-2 placeholder-sky-400">
        <View className="">
          <Text>
            Time: {session.startTime.toFormat('HH:mm')} -{' '}
            {session.startTime.plus({ minutes: session.intervalInMinutes }).toFormat('HH:mm')}
          </Text>
        </View>
        <View className="">
          <Text>Location: {session.location}</Text>
        </View>
        <View className="">
          <Text>{session.note}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
})

export default ScheduleDetails
