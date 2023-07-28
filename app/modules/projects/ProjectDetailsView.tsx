import { Text, View } from 'react-native'
import useFilteredIssues from '../../hooks/useFilteredIssues'
import useProject from '../../hooks/useProject'
import { RootScreenProps } from '../../navigation/models/RootParamList'

type Props = RootScreenProps<'ProjectDetails'>

export default function ProjectDetailsView(props: Props) {
  const { project } = useProject(props.route.params.projectId)
  const { issues } = useFilteredIssues(props.route.params.projectId)
  if (!project) {
    return null
  }
  return (
    <View>
      <Text>{project.name}</Text>
    </View>
  )
}

// add title
// + filter, space, sort setup button
// scroll view
// status: ticket ()

// tab: board, backlog, timeline, report
// board: todo, in progress, dev done, ready for testing
