import { useEffect, useState } from 'react'
import { Modal, Pressable, StyleSheet, Switch, Text, View } from 'react-native'

import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutDown, runOnJS } from 'react-native-reanimated'
import { capitalizeFirst } from '../../../../helpers/stringHelpers'

import { IssueGroupedBy } from '../../ActiveIssuesView'
import FilterModalOptionRow from '../FilterModalOptionRow'

interface Props {
  visible: boolean
  onRequestClose(): void
  groupedBy: IssueGroupedBy
  onChangeGroupedBy(groupedBy: IssueGroupedBy): void
  isShowingSubIssue: boolean
  onChangeIsShowingSubIssue(value: boolean): void
  isShowingEmptyGroup: boolean
  onChangeIsShowingEmptyGroup(value: boolean): void
  isShowingMineOnly: boolean
  onChangeIsShowingMineOnly(value: boolean): void
}

export default function BacklogListFilterModal({
  visible,
  onRequestClose,
  groupedBy,
  onChangeGroupedBy,
  isShowingSubIssue,
  onChangeIsShowingSubIssue,
  isShowingEmptyGroup,
  onChangeIsShowingEmptyGroup,
  isShowingMineOnly,
  onChangeIsShowingMineOnly,
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
            <Text className="text-base mb-3 font-semibold px-5">Filters</Text>
            <View className="px-5 py-2 border-gray-300 flex flex-row justify-between items-center">
              <Text className="text-base">Show my issues only</Text>
              <Switch value={isShowingMineOnly} onValueChange={onChangeIsShowingMineOnly} />
            </View>
            <View className="px-5 py-2 border-gray-300 flex flex-row justify-between items-center">
              <Text className="text-base">Show sub-issues</Text>
              <Switch value={isShowingSubIssue} onValueChange={onChangeIsShowingSubIssue} />
            </View>
            <View className="px-5 pt-3 pb-4 border-b-2 border-slate-200 flex flex-row justify-between items-center">
              <Text className="text-base">Show empty groups</Text>
              <Switch value={isShowingEmptyGroup} onValueChange={onChangeIsShowingEmptyGroup} />
            </View>
            <View className="px-5 py-2 border-t-2 border-slate-200">
              <Text className="text-slate-500 py-2">Grouped by</Text>
              {allGroupedBy.map((type) => (
                <FilterModalOptionRow
                  key={type}
                  title={capitalizeFirst(type)}
                  onPress={() => {
                    onChangeGroupedBy(type)
                  }}
                  isChecked={groupedBy === type}
                />
              ))}
            </View>
          </Animated.View>
        )}
      </View>
    </Modal>
  )
}

const allGroupedBy: IssueGroupedBy[] = ['project', 'priority', 'label']
