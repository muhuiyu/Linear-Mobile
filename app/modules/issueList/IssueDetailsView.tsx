import _ from 'lodash'
import { useCallback, useState } from 'react'
import { Alert, Linking, ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import useAllWorkflowStates from '../../hooks/useAllWorkflowStates'
import useAuth from '../../hooks/useAuth'
import useIssue from '../../hooks/useIssue'
import useUpdateIssue from '../../hooks/useUpdateIssue'
import { Issue } from '../../models/Issue'
import { RootScreenProps, useRootNavigation } from '../../navigation/models/RootParamList'
import ActionSheet from '../common/components/ActionSheet'
import LoadingSpinner from '../common/components/LoadingSpinner'
import { safeAreaStyleGray } from '../common/styles/pageStyle'
import StateListModal from '../issueList/components/StateListModal'
import IssueDetailsActivityCard from './components/IssueDetails/IssueDetailsActivityCard'
import IssueDetailsDescriptionCard from './components/IssueDetails/IssueDetailsDescriptionCard'
import IssueDetailsDetailsCard from './components/IssueDetails/IssueDetailsDetailsCard'
import IssueDetailsHeaderView from './components/IssueDetails/IssueDetailsHeaderView'
import IssueDetailsParentCard from './components/IssueDetails/IssueDetailsParentCard'
import IssueDetailsSubissueList from './components/IssueDetails/IssueDetailsSubissueList'

type Props = RootScreenProps<'IssueDetails'>

export default function IssueDetailsView(props: Props) {
  const { token } = useAuth()
  const { issue, isLoading } = useIssue(token, props.route.params.issueId, 'full')
  const { states: workflowStates } = useAllWorkflowStates(token, props.route.params.teamId)
  const { updateIssueState } = useUpdateIssue(token)

  // TODO: fix description bug
  console.log('description', issue?.description)

  const hasDescription = !_.isEmpty(issue?.description)

  // Navigation
  const navigation = useRootNavigation()
  const onPressIssue = (issueId: Issue['id']) => {
    navigation.push('IssueDetails', { issueId: issueId, teamId: props.route.params.teamId })
  }

  // StateList
  const [isShowingStateListModal, setShowingStateListModal] = useState(false)
  // Activity bottom sheet (show comments or history)
  const [isShowingActivitySelector, setIsShowingActivitySelector] = useState(false)

  // Linear link
  const onPressLinkButton = useCallback(async () => {
    if (!issue?.url || _.isEmpty(issue?.url)) return
    const supported = await Linking.canOpenURL(issue?.url)

    if (supported) {
      await Linking.openURL(issue?.url)
    } else {
      Alert.alert(`Don't know how to open this URL: ${issue?.url}`)
    }
  }, [issue])

  if (!issue) {
    return null
  }
  return (
    <SafeAreaView className={safeAreaStyleGray} edges={['left', 'right', 'bottom']}>
      <View className="p-4 h-full">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View className="flex flex-col items-start">
                {/* header */}
                <IssueDetailsHeaderView
                  issue={issue}
                  onPress={() => {
                    setShowingStateListModal(true)
                  }}
                />
                <IssueDetailsDescriptionCard
                  isPlaceholder={!hasDescription}
                  description={hasDescription ? issue.description : 'Add description...'}
                />
                {issue?.parent && <IssueDetailsParentCard parentIssue={issue.parent} onPressIssue={onPressIssue} />}
                {!_.isEmpty(issue?.children) && <IssueDetailsSubissueList issue={issue} onPressIssue={onPressIssue} />}
                <IssueDetailsDetailsCard issue={issue} onPressLinkButton={onPressLinkButton} />
                <IssueDetailsActivityCard
                  issue={issue}
                  onPressShowButton={() => {
                    setIsShowingActivitySelector(true)
                  }}
                />
              </View>
            </ScrollView>
            {workflowStates && (
              <StateListModal
                workflowStates={workflowStates}
                visible={isShowingStateListModal}
                onRequestClose={() => {
                  setShowingStateListModal(false)
                }}
                onChange={(state) => {
                  updateIssueState(issue.id, state)
                  setShowingStateListModal(false)
                }}
              ></StateListModal>
            )}
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
