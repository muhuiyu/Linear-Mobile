import { useEffect, useState } from 'react'
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'

import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutDown, runOnJS } from 'react-native-reanimated'
import { capitalizeFirst } from '../../../../helpers/stringHelpers'
import FilterModalOptionRow from '../FilterModalOptionRow'
import { IssueSortedBy } from '../SortModal'

interface Props {
  visible: boolean
  onRequestClose(): void
  sortedBy: IssueSortedBy
  onChangeSortedBy(sortedBy: IssueSortedBy): void
}

export default function BacklogSortModal({ visible, onRequestClose, sortedBy, onChangeSortedBy }: Props) {
  const [isModalVisible, setIsModalVisible] = useState(visible)

  useEffect(() => {
    if (visible) {
      setIsModalVisible(true)
    }
  }, [visible])

  return (
    <Modal animationType="none" visible={isModalVisible} onRequestClose={onRequestClose} transparent>
      <View className="flex flex-1 items-center justify-end">
        {/* mask */}
        {visible && (
          <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
            style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}
          >
            <Pressable onPress={onRequestClose} style={StyleSheet.absoluteFill} />
          </Animated.View>
        )}

        {visible && (
          <Animated.View
            className="bg-white w-full pt-5 pb-12"
            entering={SlideInDown}
            exiting={SlideOutDown.withCallback((finished) => {
              'worklet'
              if (finished) {
                runOnJS(setIsModalVisible)(false)
              }
            })}
          >
            <View className="px-5 pb-2">
              <Text className="text-slate-500 py-2">Sorted by</Text>
              {allSortedBy.map((value) => (
                <FilterModalOptionRow
                  key={value}
                  title={capitalizeFirst(value)}
                  onPress={() => {
                    onChangeSortedBy(value)
                  }}
                  isChecked={sortedBy === value}
                />
              ))}
            </View>
          </Animated.View>
        )}
      </View>
    </Modal>
  )
}

const allSortedBy: IssueSortedBy[] = ['status', 'priority', 'identifier', 'title', 'manual']
