import { faCaretDown, faChevronDown, faCircleUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import classNames from 'classnames'
import _ from 'lodash'
import { useCallback, useState } from 'react'
import { ActivityIndicator, Alert, Image, Linking, Pressable, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import useAuth from '../../hooks/useAuth'
import useIssue from '../../hooks/useIssue'
import { Issue } from '../../models/Issue'
import { RootScreenProps, useRootNavigation } from '../../navigation/models/RootParamList'
import ActionSheet from '../common/components/ActionSheet'
import IssueListRow, { renderPriorityIcon } from './components/IssueListRow'
import StateListModal from './components/StateListModal'
import UserNameAvatarView from './components/UserNameAvatarView'

type Props = RootScreenProps<'IssueDetails'>

const issueDetailsCardStyle = 'bg-white p-4 mt-4 w-full rounded-md'
const issueDetailsCardTitleStyle = 'text-base font-medium'
const issueDetailsCardContentStyle = 'text-sm text-black'
const issueDetailsCardPlaceholderStyle = 'text-sm text-gray-400'
const issueDetailsCardSubtitleStyle = 'text-xs text-gray-600'

export default function IssueDetailsView(props: Props) {
  const { token } = useAuth()
  const { issue, isLoading } = useIssue(token, props.route.params.issueId, 'full')

  //   console.log(issue)

  const hasDescription = !_.isEmpty(issue?.description)
  const hasLabels = !_.isEmpty(issue?.labels)

  const navigation = useRootNavigation()
  const onPressIssue = (issueId: Issue['id']) => {
    navigation.push('IssueDetails', { issueId: issueId })
  }

  // StateList
  const [isShowingStateListModal, setShowingStateListModal] = useState(false)

  // Linear link
  const onPressLinkButton = useCallback(async () => {
    if (!issue?.url || _.isEmpty(issue?.url)) return
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(issue?.url)

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(issue?.url)
    } else {
      Alert.alert(`Don't know how to open this URL: ${issue?.url}`)
    }
  }, [issue])

  // Activity bottom sheet
  const [isShowingActivitySelector, setIsShowingActivitySelector] = useState(false)

  if (!issue) {
    return null
  }
  return (
    <SafeAreaView className="flex-1 bg-gray-100" edges={['left', 'right', 'bottom']}>
      <View className="p-4 h-full">
        {isLoading ? (
          <View className="justify-center h-full">
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View className="flex flex-col items-start">
                <Text className="text-xs text-gray-500">{issue.identifier}</Text>
                <View className="flex flex-row justify-between mt-2 w-full">
                  <Text className="text-xl font-semibold leading-6 w-5/6">{issue.title}</Text>
                  {issue?.assignee?.avatarUrl ? (
                    <Image className="h-9 w-9 rounded-full" source={{ uri: issue?.assignee?.avatarUrl }} />
                  ) : (
                    <FontAwesomeIcon icon={faCircleUser} color="#899499" size={36} />
                  )}
                </View>
                <Pressable
                  className="bg-blue-600 px-3 py-1.5 rounded-sm mt-4 flex-row flex items-center"
                  onPress={() => {
                    setShowingStateListModal(true)
                  }}
                >
                  <Text className="text-white font-semibold mr-4">{issue.state.name}</Text>
                  <FontAwesomeIcon icon={faChevronDown} color="#fff" size={10} />
                </Pressable>
                <View className={issueDetailsCardStyle}>
                  <Text className={issueDetailsCardTitleStyle}>Description</Text>
                  <Text
                    className={classNames(
                      hasDescription ? issueDetailsCardContentStyle : issueDetailsCardPlaceholderStyle,
                      'mt-2',
                    )}
                  >
                    {hasDescription ? issue.description : 'Add description...'}
                  </Text>
                </View>
                {/* parent */}
                {issue?.parent && (
                  <View className={issueDetailsCardStyle}>
                    <Text className={issueDetailsCardTitleStyle}>Parent</Text>
                    <IssueListRow {...{ issue: issue?.parent, onPressIssue }} />
                  </View>
                )}
                {/* children */}
                {!_.isEmpty(issue?.children) && (
                  <View className={issueDetailsCardStyle}>
                    <Text className={issueDetailsCardTitleStyle}>Sub-issues</Text>
                    {issue.children?.map((issue) => (
                      <IssueListRow key={issue.id} {...{ issue: issue, onPressIssue }} />
                    ))}
                  </View>
                )}
                <View className={issueDetailsCardStyle}>
                  <Text className={issueDetailsCardTitleStyle}>Details</Text>
                  {/* assignee */}
                  <View className="my-1">
                    <Text className={classNames(issueDetailsCardSubtitleStyle, 'my-2')}>Assignee</Text>
                    {issue.assignee ? (
                      <UserNameAvatarView user={issue.assignee} />
                    ) : (
                      <Text className={issueDetailsCardContentStyle}>None</Text>
                    )}
                  </View>
                  {/* creator */}
                  {issue.creator && (
                    <View className="my-1">
                      <Text className={classNames(issueDetailsCardSubtitleStyle, 'my-2')}>Creator</Text>
                      <UserNameAvatarView user={issue.creator} />
                    </View>
                  )}
                  {/* labels */}
                  <View className="my-1">
                    <Text className={classNames(issueDetailsCardSubtitleStyle, 'my-2')}>Labels</Text>
                    {hasLabels ? (
                      <View className="flex flex-row flex-wrap gap-2">
                        {issue?.labels?.map?.((label) => (
                          <View
                            key={label.id}
                            className="px-2 py-1 rounded-sm"
                            style={{ backgroundColor: label.color }}
                          >
                            <Text className="text-white">{label.name}</Text>
                          </View>
                        ))}
                      </View>
                    ) : (
                      <View>
                        <Text className={issueDetailsCardContentStyle}>None</Text>
                      </View>
                    )}
                  </View>
                  {/* priority */}
                  <View className="my-1">
                    <Text className={classNames(issueDetailsCardSubtitleStyle, 'my-2')}>Priority</Text>
                    <View className="flex flex-row items-center">
                      {renderPriorityIcon(issue.priority, 16)}
                      <Text className="ml-2">{issue.priorityLabel}</Text>
                    </View>
                  </View>
                  {/* url */}
                  <View className="my-1">
                    <Text className={classNames(issueDetailsCardSubtitleStyle, 'my-2')}>URL</Text>
                    <Pressable onPress={onPressLinkButton}>
                      <Text className={classNames(issueDetailsCardContentStyle, 'text-blue-600')}>Open in Linear</Text>
                    </Pressable>
                  </View>
                </View>
                {/* activity */}
                <View className={issueDetailsCardStyle}>
                  {/* activity header */}
                  <View className="flex flex-row justify-between w-full items-center mb-4">
                    <Text className={issueDetailsCardTitleStyle}>Activity</Text>
                    <Pressable
                      className="flex flex-row gap-1 items-center"
                      onPress={() => {
                        setIsShowingActivitySelector(true)
                      }}
                    >
                      <Text className="text-blue-600 font-medium">Show comment</Text>
                      <FontAwesomeIcon icon={faCaretDown} color="#3182ce" size={12} />
                    </Pressable>
                  </View>
                  {/* body */}
                  {/* todo: change to activities */}
                  {!_.isEmpty(issue?.comments) &&
                    issue?.comments?.map((comment) => {
                      return (
                        <View key={comment.id} className="flex flex-row items-start gap-3 pb-3">
                          <Image className="h-8 w-8 rounded-full" source={{ uri: comment.user.avatarUrl }} />
                          <View>
                            <View className="flex flex-row items-center gap-2 pb-1">
                              <Text className="text-sm font-medium">{comment.user.name}</Text>
                              <Text className="text-xs text-gray-500">{comment.createdAt.toLocaleString()}</Text>
                            </View>
                            <Text>{comment.bodyData}</Text>
                          </View>
                        </View>
                      )
                    })}
                </View>
              </View>
            </ScrollView>
            <StateListModal
              visible={isShowingStateListModal}
              onRequestClose={() => {
                setShowingStateListModal(false)
              }}
              onChange={() => {
                // todo
                setShowingStateListModal(false)
              }}
            ></StateListModal>
            {/* Bottom sheet */}
            {isShowingActivitySelector && (
              <ActionSheet
                title=""
                visible={isShowingActivitySelector}
                options={[
                  {
                    title: 'Show comments',
                    type: 'default',
                    action: () => {
                      // TODO:
                    },
                  },
                  {
                    title: 'Show history',
                    type: 'default',
                    action: () => {
                      // TODO:
                    },
                  },
                  {
                    title: 'Cancel',
                    type: 'default',
                    action: () => {
                      setIsShowingActivitySelector(false)
                    },
                  },
                ]}
                onRequestClose={() => {
                  setIsShowingActivitySelector(false)
                }}
              />
            )}
          </>
        )}
      </View>
    </SafeAreaView>
  )
}
