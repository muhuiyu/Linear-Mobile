import { faSliders, faSort } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import _ from 'lodash'
import { useCallback, useMemo, useState } from 'react'
import { ActivityIndicator, Pressable, SectionList, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import useAllIssues from '../../hooks/useAllIssues'
import useAuth from '../../hooks/useAuth'
import useCurrentUser from '../../hooks/useCurrentUser'
import { Issue, wasCompletedInPastDay, wasCompletedInPastWeek } from '../../models/Issue'
import { IssueLabel } from '../../models/IssueLabel'
import { Project } from '../../models/Project'
import { WorkflowState } from '../../models/WorkFlowState'
import { IssueTabScreenProps } from '../../navigation/models/IssueTabParamList'
import { useRootNavigation } from '../../navigation/models/RootParamList'
import SearchBar from '../common/components/SearchBar'
import FilterModal from './components/FilterModal'
import IssueCard from './components/IssueCard'
import IssueListRow from './components/IssueListRow'
import renderSectionHeader from './components/SectionHeader'
import SortModal, { IssueListLayout, IssueSortedBy } from './components/SortModal'

type Props = IssueTabScreenProps<'IssueList'>

export default function IssueListView(props: Props) {
  // Fetch issues
  const { token } = useAuth()
  const isBacklogIncluded = false
  const { issues, isLoading } = useAllIssues(token, props.route.params.teamId, isBacklogIncluded)
  const { currentUser } = useCurrentUser(token, 'default')

  // navigation
  const navigation = useRootNavigation()
  const onPressIssue = useCallback((issueId: Issue['id']) => {
    navigation.push('IssueDetails', { issueId: issueId })
  }, [])

  // set filter
  const [isShowingFilterModal, setIsShowingFilterSheet] = useState(false)
  const [groupedBy, setGroupedBy] = useState<IssueGroupedBy>('status')
  const [showCompletedItemsType, setShowCompletedItemsType] = useState<ShowCompletedItemsType>('none')
  const [isShowingSubIssue, setIsShowingSubIssue] = useState(true)
  const [isShowingEmptyGroup, setIsShowingEmptyGroup] = useState(false)
  const [isShowingMineOnly, setIsShowingMineOnly] = useState(false)

  // set sort modal
  const [isShowingSortModal, setIsShowingSortSheet] = useState(false)
  const [layout, setLayout] = useState<IssueListLayout>('board')
  const [sortedBy, setSortedBy] = useState<IssueSortedBy>('priority')

  // Search issues
  const [searchText, setSearchText] = useState('')
  const filterIssues: Issue[] = useMemo(() => {
    if (!issues) return []

    // apply all filters
    let issueList = issues.filter((issue) => {
      if (isShowingMineOnly && issue.assignee?.id !== currentUser?.id) {
        return false
      }
      if (!isShowingSubIssue && !issue.parent) {
        return false
      }
      switch (showCompletedItemsType) {
        case 'all':
          return issue
        case 'none':
          return issue.state.type !== 'completed'
        case 'pastDay':
          return issue.state.type !== 'completed' || wasCompletedInPastDay(issue)
        case 'pastWeek':
          return issue.state.type !== 'completed' || wasCompletedInPastWeek(issue)
      }
    })

    // apply search
    return _.isEmpty(searchText)
      ? issueList
      : issueList?.filter((issue) => issue.title.toLowerCase().includes(searchText.toLowerCase()))
  }, [issues, searchText, showCompletedItemsType, isShowingMineOnly])

  // Group issues by states
  const groupedIssues: GroupedIssue[] = useMemo(() => {
    switch (groupedBy) {
      case 'priority':
        return filterIssues.reduce((accumulator, issue) => {
          const existingGroup = accumulator.find((group) => group.header === issue.priority)

          if (existingGroup) {
            existingGroup.data.push(issue)
          } else {
            const newGroup: GroupedIssue = { groupedBy: 'priority', header: issue.priority, data: [issue] }
            accumulator.push(newGroup)
          }
          accumulator.sort((a, b) => {
            return (a.header as number) - (b.header as number)
          })
          return accumulator
        }, [] as GroupedIssue[])
      case 'project':
        return filterIssues.reduce((accumulator, issue) => {
          const existingGroup = accumulator.find((group) => (group.header as Project).id === issue.project.id)

          if (existingGroup) {
            existingGroup.data.push(issue)
          } else {
            const newGroup: GroupedIssue = { groupedBy: 'project', header: issue.project, data: [issue] }
            accumulator.push(newGroup)
          }
          return accumulator
        }, [] as GroupedIssue[])

      // TODO: add labels
      default:
        return filterIssues.reduce((accumulator, issue) => {
          const existingGroup = accumulator.find((group) => (group.header as WorkflowState).id === issue.state.id)

          if (existingGroup) {
            existingGroup.data.push(issue)
          } else {
            const newGroup: GroupedIssue = { groupedBy: 'status', header: issue.state, data: [issue] }
            accumulator.push(newGroup)
          }
          accumulator.sort((a, b) => (a.header as WorkflowState).position - (b.header as WorkflowState).position)
          return accumulator
        }, [] as GroupedIssue[])
    }
  }, [filterIssues, groupedBy, isShowingEmptyGroup])

  // Render issue row
  const renderIssueRow = ({ item }: { item: Issue }) => {
    return <IssueListRow key={item.id} {...{ issue: item, onPressIssue }} />
  }

  const renderPageContent = () => {
    switch (layout) {
      case 'board':
        return (
          <ScrollView horizontal>
            {groupedIssues.map((section, index) => {
              let title = ''
              switch (section.groupedBy) {
                case 'status':
                  title = (section.header as WorkflowState).name
                  break
                case 'project':
                  title = (section.header as Project).name
                  break
                case 'priority':
                  title = (section.header as number).toString()
                  break
              }

              return (
                <View className="mx-4" key={index}>
                  <View className="flex flex-row bg-gray-100 py-2 pl-2 w-[300px]">
                    <Text>{title}</Text>
                    <Text className="text-gray-500 ml-2">{section.data.length}</Text>
                  </View>
                  <View className="bg-gray-100 mt-2 h-full w-[300px]">
                    <ScrollView className="m-2">
                      {section.data.map((issue) => (
                        <IssueCard key={issue.id} {...{ issue, onPressIssue }} />
                      ))}
                    </ScrollView>
                  </View>
                </View>
              )
            })}
          </ScrollView>
        )
      case 'list':
        return (
          <SectionList
            className="pt-2"
            sections={groupedIssues}
            keyExtractor={(item) => item.id}
            renderItem={renderIssueRow}
            renderSectionHeader={({ section: { groupedBy, header, data } }) =>
              renderSectionHeader(groupedBy, header, data.length)
            }
            renderSectionFooter={() => <View className="pb-2"></View>}
          />
        )
    }
  }

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
            <View className="flex flex-row p-4 items-center">
              <Pressable
                className="pr-2"
                onPress={() => {
                  setIsShowingFilterSheet(true)
                }}
              >
                <FontAwesomeIcon icon={faSliders} />
              </Pressable>
              <SearchBar value={searchText} onChangeText={setSearchText} />
              <Pressable
                className="pl-2"
                onPress={() => {
                  setIsShowingSortSheet(true)
                }}
              >
                <FontAwesomeIcon icon={faSort} />
              </Pressable>
            </View>
            {_.isEmpty(issues) ? (
              <View>
                <Text>No issues found</Text>
              </View>
            ) : (
              renderPageContent()
            )}
          </>
        )}
      </View>
      {isShowingFilterModal && (
        <FilterModal
          visible={isShowingFilterModal}
          onRequestClose={() => {
            setIsShowingFilterSheet(false)
          }}
          {...{
            groupedBy,
            onChangeGroupedBy: setGroupedBy,
            showCompletedItemsType,
            onChangeShowCompletedItemsType: setShowCompletedItemsType,
            isShowingSubIssue,
            onChangeIsShowingSubIssue: setIsShowingSubIssue,
            isShowingEmptyGroup,
            onChangeIsShowingEmptyGroup: setIsShowingEmptyGroup,
            isShowingMineOnly,
            onChangeIsShowingMineOnly: setIsShowingMineOnly,
          }}
        />
      )}
      {isShowingSortModal && (
        <SortModal
          visible={isShowingSortModal}
          onRequestClose={() => {
            setIsShowingSortSheet(false)
          }}
          {...{ layout, onChangeLayout: setLayout, sortedBy, onChangeSortedBy: setSortedBy }}
        />
      )}
    </SafeAreaView>
  )
}

type GroupedIssue = {
  groupedBy: IssueGroupedBy
  header: WorkflowState | Project | IssueLabel | number
  data: Issue[]
}

export type IssueGroupedBy = 'status' | 'assignee' | 'project' | 'priority' | 'label' | 'none'
export type ShowCompletedItemsType = 'all' | 'pastDay' | 'pastWeek' | 'none'
