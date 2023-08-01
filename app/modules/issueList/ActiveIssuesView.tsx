import { faPlus, faSliders, faSort } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import _ from 'lodash'
import { useCallback, useMemo, useState } from 'react'
import { Pressable, SectionList, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import useAllIssues from '../../hooks/useAllIssues'
import useAuth from '../../hooks/useAuth'
import useCurrentUser from '../../hooks/useCurrentUser'
import { Issue, priorityNumberToString, wasCompletedInPastDay, wasCompletedInPastWeek } from '../../models/Issue'
import { IssueLabel } from '../../models/IssueLabel'
import { Project } from '../../models/Project'
import { WorkflowState } from '../../models/WorkFlowState'
import { IssueTabScreenProps } from '../../navigation/models/IssueTabParamList'
import { useRootNavigation } from '../../navigation/models/RootParamList'
import LoadingSpinner from '../common/components/LoadingSpinner'
import SearchBar from '../common/components/SearchBar'
import { safeAreaStyle } from '../common/styles/pageStyle'
import FilterModal from '../issueList/components/FilterModal'
import SortModal, { IssueListLayout, IssueSortedBy } from '../issueList/components/SortModal'
import IssueCard from './components/BoardView/IssueCard'
import EmptyView from './components/EmptyView'
import { renderItemSeparator } from './components/ItemSeparator'
import IssueListRow from './components/ListView/IssueListRow'
import renderSectionHeader from './components/ListView/SectionHeader'

type Props = IssueTabScreenProps<'ActiveIssues'>

export default function ActiveIssuesView(props: Props) {
  // Fetch issues
  const { token } = useAuth()
  const [currentTeamId, setCurrentTeamId] = useState(props.route.params.teamId)
  const [currentProjectId, setCurrentProjectId] = useState(props.route.params.projectId)
  const { activeIssues: issues, isLoading } = useAllIssues(token, currentTeamId, currentProjectId)
  const { currentUser } = useCurrentUser(token, 'default')

  // useEffect(() => {
  //   DeviceEventEmitter.addListener(eventChangeCurrentTeam, (teamId) => () => {
  //     setCurrentTeamId(teamId)
  //     // TODO: fix bug
  //     console.log('should reload data')
  //   })
  // })

  // navigation
  const navigation = useRootNavigation()
  const onPressIssue = useCallback((issueId: Issue['id']) => {
    navigation.push('IssueDetails', { issueId: issueId, teamId: props.route.params.teamId })
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
  const filteredIssues: Issue[] = useMemo(() => {
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
  }, [issues, searchText, showCompletedItemsType, isShowingMineOnly, isShowingSubIssue])

  // Group issues by states
  const groupedIssues: GroupedIssue[] = useMemo(() => {
    switch (groupedBy) {
      case 'priority':
        return filteredIssues.reduce((accumulator, issue) => {
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
        return filteredIssues.reduce((accumulator, issue) => {
          const existingGroup = accumulator.find((group) => (group.header as Project).id === issue.project.id)

          if (existingGroup) {
            existingGroup.data.push(issue)
          } else {
            const newGroup: GroupedIssue = { groupedBy: 'project', header: issue.project, data: [issue] }
            accumulator.push(newGroup)
          }
          return accumulator
        }, [] as GroupedIssue[])
      case 'label':
        const accumulator: GroupedIssue[] = []

        filteredIssues.forEach((issue) => {
          issue.labels?.forEach((label) => {
            const existingGroup = accumulator.find((group) => (group.header as IssueLabel).id === label.id)
            if (existingGroup) {
              existingGroup.data.push(issue)
            } else {
              const newGroup: GroupedIssue = { groupedBy: 'label', header: label, data: [issue] }
              accumulator.push(newGroup)
            }
          })
        })
        return accumulator
      default:
        // status
        return filteredIssues.reduce((accumulator, issue) => {
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
  }, [filteredIssues, groupedBy, isShowingEmptyGroup])

  // Render issue row
  const renderIssueRow = ({ item }: { item: Issue }) => {
    return <IssueListRow key={item.id} {...{ issue: item, onPressIssue, groupedBy }} />
  }

  const onPressAddIssue = (groupedBy: IssueGroupedBy, header: WorkflowState | Project | IssueLabel | number) => {
    // TODO:
  }

  const renderPageContent = () => {
    switch (layout) {
      case 'board':
        return (
          <>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
                    title = priorityNumberToString[section.header as number]
                    break
                  case 'label':
                    title = (section.header as IssueLabel).name
                    break
                }

                return (
                  <View className="mx-4" key={index}>
                    <View className="flex flex-row bg-gray-100 py-2 pl-3 w-[300px] justify-between items-center">
                      <View className="flex flex-row items-center">
                        <Text>{title}</Text>
                        <Text className="text-gray-500 ml-2">{section.data.length}</Text>
                      </View>
                      <Pressable className="px-3" onPress={() => onPressAddIssue(section.groupedBy, section.header)}>
                        <FontAwesomeIcon icon={faPlus} size={12} />
                      </Pressable>
                    </View>
                    <View className="bg-gray-100 mt-2 flex-1 w-[300px]">
                      <ScrollView className="m-2 flex-1" showsVerticalScrollIndicator={false}>
                        {section.data.map((issue) => (
                          <IssueCard key={issue.id} {...{ issue, onPressIssue, groupedBy }} />
                        ))}
                      </ScrollView>
                    </View>
                  </View>
                )
              })}
            </ScrollView>
            {/* TODO: add scroll indicator */}
            {/* <View className="justify-center items-center pt-2 flex flex-row gap-1">
              <View className={classNames('h-2 w-2 rounded-full bg-slate-300')}></View>
              <View className={classNames('h-2 w-2 rounded-full bg-slate-300')}></View>
              <View className={classNames('h-2 w-2 rounded-full bg-slate-300')}></View>
              <View className={classNames('h-2 w-2 rounded-full bg-slate-300')}></View>
            </View> */}
          </>
        )
      case 'list':
        return (
          <SectionList
            className="mt-2"
            sections={groupedIssues}
            keyExtractor={(item) => item.id}
            renderItem={renderIssueRow}
            ItemSeparatorComponent={renderItemSeparator}
            renderSectionHeader={({ section: { groupedBy, header, data } }) =>
              renderSectionHeader(groupedBy, header, data.length, onPressAddIssue)
            }
          />
        )
    }
  }

  // Return null if useAllIssues fails
  if (!issues) {
    return null
  }

  return (
    <SafeAreaView className={safeAreaStyle} edges={['left', 'right']}>
      <View className="h-full">
        {isLoading ? (
          <LoadingSpinner />
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
              <SearchBar value={searchText} placeholder="Search issues" onChangeText={setSearchText} />
              <Pressable
                className="pl-2"
                onPress={() => {
                  setIsShowingSortSheet(true)
                }}
              >
                <FontAwesomeIcon icon={faSort} />
              </Pressable>
            </View>
            {_.isEmpty(filteredIssues) ? <EmptyView /> : renderPageContent()}
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
