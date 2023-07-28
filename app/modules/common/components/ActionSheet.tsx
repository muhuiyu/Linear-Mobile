import classNames from 'classnames'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'

import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutDown, runOnJS } from 'react-native-reanimated'

type ActionSheetOptionType = 'destructive' | 'default'

export interface ActionSheetOption {
  title: string
  type: ActionSheetOptionType
  action(): void
}

interface Props {
  title: string
  visible: boolean
  options: ActionSheetOption[]
  onRequestClose(): void
}

export default function ActionSheet({ title, visible, options, onRequestClose }: Props) {
  const [isModalVisible, setIsModalVisible] = useState(visible)
  const [isPressingIndex, setPressingIndex] = useState(-1)

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
            {!_.isEmpty(title) && <Text className="text-sm mb-4 font-bold px-5">{title}</Text>}
            {options.map((option, index) => {
              return (
                <Pressable
                  className={classNames(
                    'flex flex-row items-center py-3 px-5',
                    isPressingIndex === index ? 'bg-slate-200' : 'bg-white',
                  )}
                  key={option.title}
                  onPress={() => {
                    setPressingIndex(index)
                    option.action()
                  }}
                  onPressOut={() => {
                    setPressingIndex(-1)
                  }}
                >
                  <Text className="text-base pl-2">{option.title}</Text>
                </Pressable>
              )
            })}
          </Animated.View>
        )}
      </View>
    </Modal>
  )
}
