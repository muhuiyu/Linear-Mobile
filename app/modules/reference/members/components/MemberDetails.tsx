import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Member } from '../data/MemberData'

interface Props {
  member: Member
}

export default function MemberDetails({ member }: Props) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: member.photoUrl }} style={styles.image} />
      <Text style={styles.title}>{member.name}</Text>
      <Text style={styles.jobTitle}>{member.jobTitle}</Text>
      <Text style={styles.note}>{member.note}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 5,
  },
  jobTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  note: {
    fontSize: 16,
  },
})
