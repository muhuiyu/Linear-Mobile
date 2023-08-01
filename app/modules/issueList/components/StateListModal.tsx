import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import { WorkflowState, stateIconInfo } from '../../../models/WorkFlowState'

import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutDown, runOnJS } from 'react-native-reanimated'

interface Props {
  visible: boolean
  workflowStates: WorkflowState[]
  onChange(state: WorkflowState): void
  onRequestClose(): void
}

export default function StateListModal({ visible, workflowStates, onChange, onRequestClose }: Props) {
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
            {workflowStates.map((state, index) => {
              let { icon, color } = stateIconInfo(state)

              return (
                <Pressable
                  className={classNames('flex flex-row items-center py-3 px-5')}
                  key={state.id}
                  onPress={() => {
                    onChange(state)
                  }}
                >
                  <FontAwesomeIcon icon={faArrowRight} />
                  <Text className="text-base pl-2">Move to</Text>
                  <View className="px-2 py-1 flex flex-row items-center gap-2">
                    <FontAwesomeIcon icon={icon} color={color} />
                    <Text className="font-bold">{state.name}</Text>
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
