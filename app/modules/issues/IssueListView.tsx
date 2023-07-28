import { faCaretDown, faSliders } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import _ from 'lodash'
import { useCallback, useMemo, useState } from 'react'
import { ActivityIndicator, Pressable, SectionList, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import useAllIssues from '../../hooks/useAllIssues'
import useAuth from '../../hooks/useAuth'
import useCurrentUser from '../../hooks/useCurrentUser'
import { Issue } from '../../models/Issue'
import { WorkflowState, WorkflowStateType, stateIconInfo } from '../../models/WorkFlowState'
import { useRootNavigation } from '../../navigation/models/RootParamList'
import ActionSheet from '../common/components/ActionSheet'
import SearchBar from '../common/components/SearchBar'
import FilterModal from './components/FilterModal'
import IssueListRow from './components/IssueListRow'

interface Props {}

export default function IssueListView({}: Props) {
  // Fetch issues
  const { token } = useAuth()
  const { issues, isLoading } = useAllIssues(token)
  const { currentUser } = useCurrentUser(token, 'default')

  // list types
  const [listType, setListType] = useState<IssueListType>('myOpeningIssues')
  const [isShowingListTypeSelector, setIsShowingListTypeSelector] = useState(false)

  // Search issues
  const [searchText, setSearchText] = useState('')
  const filterIssues: Issue[] = useMemo(() => {
    if (!issues) return []

    let issueList = issues.filter((issue) => {
      switch (listType) {
        case 'allIssues':
          return issue
        case 'myIssues':
          return issue.assignee?.id === currentUser?.id
        case 'myOpeningIssues':
          return (
            issue.assignee?.id === currentUser?.id && issue.state.type !== 'completed' && issue.state.type !== 'backlog'
          )
        case 'openingIssues':
          return issue.state.type !== 'completed' && issue.state.type !== 'backlog'
      }
    })

    return _.isEmpty(searchText)
      ? issueList
      : issueList?.filter((issue) => issue.title.toLowerCase().includes(searchText.toLowerCase()))
  }, [searchText, listType])

  // Group issues by states
  const groupedIssues: GroupedIssue[] = useMemo(() => {
    return filterIssues.reduce((accumulator, issue) => {
      const stateId = issue.state.id
      const existingGroup = accumulator.find((group) => group.state.id === stateId)

      if (existingGroup) {
        existingGroup.data.push(issue)
      } else {
        const newGroup: GroupedIssue = { state: issue.state, data: [issue] }
        accumulator.push(newGroup)
      }
      accumulator.sort((a, b) => a.state.position - b.state.position)
      return accumulator
    }, [] as GroupedIssue[])
  }, [filterIssues])

  // Render issue row
  const renderIssueRow = ({ item }: { item: Issue }) => {
    return <IssueListRow key={item.id} {...{ issue: item, onPressIssue }} />
  }
  // Render list header
  const renderSectionHeader = (state: WorkflowState, length: number) => {
    let { icon, color } = stateIconInfo(state.type as WorkflowStateType)
    return (
      <View className="flex flex-row gap-2 bg-gray-100 px-4 pb-2 items-center">
        <FontAwesomeIcon icon={icon} color={color} />
        <Text>{state.name}</Text>
        <Text className="text-xs text-gray-500">{length}</Text>
      </View>
    )
  }

  // navigation
  const navigation = useRootNavigation()
  const onPressIssue = useCallback((issueId: Issue['id']) => {
    navigation.push('IssueDetails', { issueId: issueId })
  }, [])

  // set filter
  const [isShowingFilterModal, setIsShowingFilterSheet] = useState(false)
  const onChangeFilter = useCallback((index: number) => {}, [])

  // Return null if useAllIssues fails
  if (!issues) {
    return null
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['left', 'right', 'bottom']}>
      <View className="h-full">
        {isLoading ? (
          <View className="justify-center h-full">
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <>
            <View className="p-4">
              <SearchBar value={searchText} onChangeText={setSearchText} />
              <View className="flex flex-row flex-wrap mt-4 justify-between items-center">
                <Pressable
                  className="px-2 py-1 border border-slate-500 flex flex-row"
                  onPress={() => {
                    setIsShowingListTypeSelector(true)
                  }}
                >
                  <Text>{listType}</Text>
                  <FontAwesomeIcon icon={faCaretDown} size={14} />
                </Pressable>
                <Pressable
                  className=""
                  onPress={() => {
                    setIsShowingFilterSheet(true)
                  }}
                >
                  <FontAwesomeIcon icon={faSliders} />
                </Pressable>
              </View>
            </View>
            {_.isEmpty(issues) ? (
              <View></View>
            ) : (
              <SectionList
                className="pt-2"
                sections={Object.values(groupedIssues)}
                keyExtractor={(item) => item.id}
                renderItem={renderIssueRow}
                renderSectionHeader={({ section: { state, data } }) => renderSectionHeader(state, data.length)}
                renderSectionFooter={() => <View className="pb-2"></View>}
              />
            )}
          </>
        )}
        <ActionSheet
          title=""
          visible={isShowingListTypeSelector}
          options={[
            {
              title: 'My opening issues',
              type: 'default',
              action: () => {
                setListType('myOpeningIssues')
                setIsShowingListTypeSelector(false)
              },
            },
            {
              title: 'My issues',
              type: 'default',
              action: () => {
                setListType('myIssues')
                setIsShowingListTypeSelector(false)
              },
            },
            {
              title: 'Opening issues',
              type: 'default',
              action: () => {
                setListType('openingIssues')
                setIsShowingListTypeSelector(false)
              },
            },
            {
              title: 'All issues',
              type: 'default',
              action: () => {
                setListType('allIssues')
                setIsShowingListTypeSelector(false)
              },
            },
          ]}
          onRequestClose={() => {
            setIsShowingListTypeSelector(false)
          }}
        />
      </View>
      {isShowingFilterModal && (
        <FilterModal
          visible={isShowingFilterModal}
          onChange={function (type: WorkflowStateType): void {
            throw new Error('Function not implemented.')
          }}
          onRequestClose={function (): void {
            throw new Error('Function not implemented.')
          }}
        />
      )}
    </SafeAreaView>
  )
}

type GroupedIssue = {
  state: WorkflowState
  data: Issue[]
}

type IssueSortedBy = 'status' | 'priority' | 'identifier' | 'name'
type IssueGroupedBy = 'status' | 'assignee' | 'project' | 'priority' | 'label' | 'none'
type IssueListType = 'myIssues' | 'openingIssues' | 'myOpeningIssues' | 'allIssues'
const issueTypes: IssueListType[] = ['myOpeningIssues', 'myIssues', 'openingIssues', 'allIssues']

const issueListHeaders: { type: IssueListType; title: string }[] = [
  {
    type: 'allIssues',
    title: 'All issues',
  },
  {
    type: 'openingIssues',
    title: 'Opening issues',
  },
  {
    type: 'myOpeningIssues',
    title: 'My opening issues',
  },
  {
    type: 'myIssues',
    title: 'My issues',
  },
]
