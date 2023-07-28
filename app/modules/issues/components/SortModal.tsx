import { useEffect, useState } from 'react'
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'

import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutDown, runOnJS } from 'react-native-reanimated'
import { capitalizeFirst } from '../../common/helpers/stringHelpers'
import FilterModalOptionRow from './FilterModalOptionRow'

interface Props {
  visible: boolean
  onRequestClose(): void
  layout: IssueListLayout
  onChangeLayout(layout: IssueListLayout): void
  sortedBy: IssueSortedBy
  onChangeSortedBy(sortedBy: IssueSortedBy): void
}

export default function SortModal({
  visible,
  layout,
  onChangeLayout,
  onRequestClose,
  sortedBy,
  onChangeSortedBy,
}: Props) {
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
            <Text className="text-base mb-4 font-semibold px-5">Display</Text>
            <View className="px-5 py-2 border-t border-b border-gray-300">
              <Text className="text-slate-500 py-2">Layout</Text>
              {allLayouts.map((value) => (
                <FilterModalOptionRow
                  key={value}
                  title={capitalizeFirst(value)}
                  onPress={() => {
                    onChangeLayout(value)
                  }}
                  isChecked={layout === value}
                />
              ))}
            </View>
            <View className="px-5 py-2 border-b border-gray-300">
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

export type IssueListLayout = 'board' | 'list'
const allLayouts: IssueListLayout[] = ['board', 'list']
export type IssueSortedBy = 'status' | 'priority' | 'identifier' | 'name' | 'manual' | 'dueDate'
const allSortedBy: IssueSortedBy[] = ['status', 'priority', 'identifier', 'name', 'manual', 'dueDate']
