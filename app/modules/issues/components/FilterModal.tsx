import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import {
  WorkflowStateType,
  allWorkflowStateTypes,
  stateIconInfo,
  workflowStateTypeToName,
} from '../../../models/WorkFlowState'

import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutDown, runOnJS } from 'react-native-reanimated'

interface Props {
  visible: boolean
  onChange(type: WorkflowStateType): void
  onRequestClose(): void
}

// layout: board, list
// grouping: project, status, assignee, priority, label, no grouping
// status order:
// ordering: due date, manual, title, status, priority, estimate, last updated, last created, due date, link count
// boolean show sub-issues
// show empty groups
// display properties: priority, status, assignee, pull requests

// separated by teams
// show completed issues: all, past day, past week, past month, none

export default function FilterModal({ visible, onChange, onRequestClose }: Props) {
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
            <Text className="text-sm mb-4 font-semibold px-5">Choose destination</Text>
            {allWorkflowStateTypes.map((type, index) => {
              let { icon, color } = stateIconInfo(type)

              return (
                <Pressable
                  className={classNames('flex flex-row items-center py-3 px-5')}
                  key={type}
                  onPress={() => {
                    onChange(type)
                  }}
                >
                  <FontAwesomeIcon icon={faArrowRight} />
                  <Text className="text-base pl-2">Move to</Text>
                  <View className="px-2 py-1 flex flex-row items-center gap-2">
                    <FontAwesomeIcon icon={icon} color={color} />
                    <Text className="font-bold">{workflowStateTypeToName[type]}</Text>
                  </View>
                </Pressable>
              )
            })}
          </Animated.View>
        )}
      </View>
    </Modal>
  )
}
