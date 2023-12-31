import { faSliders, faSort } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import _ from 'lodash'
import { useCallback, useMemo, useState } from 'react'
import { Pressable, SectionList, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import useAllIssues from '../../hooks/useAllIssues'
import useAuth from '../../hooks/useAuth'
import useCurrentUser from '../../hooks/useCurrentUser'
import { Issue } from '../../models/Issue'
import { IssueLabel } from '../../models/IssueLabel'
import { Project } from '../../models/Project'
import { WorkflowState } from '../../models/WorkFlowState'
import { IssueTabScreenProps } from '../../navigation/models/IssueTabParamList'
import { useRootNavigation } from '../../navigation/models/RootParamList'
import LoadingSpinner from '../common/components/LoadingSpinner'
import SearchBar from '../common/components/SearchBar'
import { safeAreaStyle } from '../common/styles/pageStyle'
import BacklogListFilterModal from './components/Backlog/BacklogListFilterModal'
import BacklogSortModal from './components/Backlog/BacklogSortModal'
import EmptyView from './components/EmptyView'
import { renderItemSeparator } from './components/ItemSeparator'
import IssueListRow from './components/ListView/IssueListRow'
import renderSectionHeader from './components/ListView/SectionHeader'
import { IssueSortedBy } from './components/SortModal'

type Props = IssueTabScreenProps<'IssueBacklog'>

export default function IssueBacklogListView(props: Props) {
  // Fetch issues
  const { token } = useAuth()
  const [currentTeamId, setCurrentTeamId] = useState(props.route.params.teamId)
  const [currentProjectId, setCurrentProjectId] = useState(props.route.params.projectId)
  const { backlogIssues: issues, isLoading } = useAllIssues(token, currentTeamId, currentProjectId)
  const { currentUser } = useCurrentUser(token, 'default')

  // set filter
  const [isShowingFilterModal, setIsShowingFilterSheet] = useState(false)
  const [groupedBy, setGroupedBy] = useState<IssueGroupedBy>('status')
  const [isShowingSubIssue, setIsShowingSubIssue] = useState(true)
  const [isShowingEmptyGroup, setIsShowingEmptyGroup] = useState(false)
  const [isShowingMineOnly, setIsShowingMineOnly] = useState(false)

  // set sort modal
  const [isShowingSortModal, setIsShowingSortSheet] = useState(false)
  const [sortedBy, setSortedBy] = useState<IssueSortedBy>('priority')

  // navigation
  const navigation = useRootNavigation()
  const onPressIssue = useCallback((issueId: Issue['id']) => {
    navigation.push('IssueDetails', { issueId: issueId, teamId: props.route.params.teamId })
  }, [])

  // Search issues
  const [searchText, setSearchText] = useState('')
  const filteredIssues: Issue[] = useMemo(() => {
    // apply search
    // apply all filters
    let issueList = issues.filter((issue) => {
      if (isShowingMineOnly && issue.assignee?.id !== currentUser?.id) {
        return false
      }
      if (!isShowingSubIssue && !issue.parent) {
        return false
      }
      return true
    })
    return _.isEmpty(searchText)
      ? issueList
      : issueList?.filter((issue) => issue.title.toLowerCase().includes(searchText.toLowerCase()))
  }, [issues, searchText, isShowingMineOnly, isShowingSubIssue])

  // Group issues by states
  const groupedIssues: GroupedIssue[] = useMemo(() => {
    let groups: GroupedIssue[] = []
    switch (groupedBy) {
      case 'priority':
        groups = filteredIssues.reduce((accumulator, issue) => {
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
        groups = accumulator
      default:
        // Projects
        groups = filteredIssues.reduce((accumulator, issue) => {
          const existingGroup = accumulator.find((group) => (group.header as Project).id === issue.project.id)

          if (existingGroup) {
            existingGroup.data.push(issue)
          } else {
            const newGroup: GroupedIssue = { groupedBy: 'project', header: issue.project, data: [issue] }
            accumulator.push(newGroup)
          }
          return accumulator
        }, [] as GroupedIssue[])
    }

    // sortedBy
    switch (sortedBy) {
      case 'identifier':
        groups.forEach((group) => {
          group.data.sort((a, b) => a.identifier.localeCompare(b.identifier))
        })
        break
      case 'manual':
        groups.forEach((group) => {
          group.data.sort((a, b) => a.sortOrder - b.sortOrder)
        })
      case 'title':
        groups.forEach((group) => {
          group.data.sort((a, b) => a.title.localeCompare(b.title))
        })
      case 'priority':
        groups.forEach((group) => {
          group.data.sort((a, b) => {
            if (a.priority === 0) return 1
            if (b.priority === 0) return -1
            return a.priority - b.priority
          })
        })
      case 'status':
        groups.forEach((group) => {
          group.data.sort((a, b) => a.state.position - b.state.position)
        })
    }
    return groups
  }, [filteredIssues, groupedBy, isShowingEmptyGroup, sortedBy])

  // Render issue row
  const renderIssueRow = ({ item }: { item: Issue }) => {
    return <IssueListRow key={item.id} {...{ issue: item, onPressIssue, groupedBy }} />
  }

  const onPressAddIssue = () => {
    // TODO:
  }

  const renderPageContent = () => {
    return (
      <SectionList
        className="pt-2"
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

  // Return null if useAllIssues fails
  if (!issues) {
    return null
  }

  return (
    <SafeAreaView className={safeAreaStyle} edges={['left', 'right', 'bottom']}>
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
        <BacklogListFilterModal
          visible={isShowingFilterModal}
          onRequestClose={() => {
            setIsShowingFilterSheet(false)
          }}
          {...{
            groupedBy,
            onChangeGroupedBy: setGroupedBy,
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
        <BacklogSortModal
          visible={isShowingSortModal}
          onRequestClose={() => {
            setIsShowingSortSheet(false)
          }}
          {...{ sortedBy, onChangeSortedBy: setSortedBy }}
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
