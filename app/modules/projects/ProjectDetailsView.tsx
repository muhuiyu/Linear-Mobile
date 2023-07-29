import { Text, View } from 'react-native'
import useAuth from '../../hooks/useAuth'
import useProject from '../../hooks/useProject'
import useProjectIssues from '../../hooks/useProjectIssues'
import { RootScreenProps } from '../../navigation/models/RootParamList'

type Props = RootScreenProps<'ProjectDetails'>

export default function ProjectDetailsView(props: Props) {
  const { token } = useAuth()
  const { project } = useProject(token, props.route.params.projectId, 'default')
  const { issues } = useProjectIssues(token, props.route.params.projectId)

  if (!project || !issues) {
    return null
  }
  return (
    <View>
      <Text>{project.name}</Text>
      <Text>{issues.length}</Text>
    </View>
  )
}

// add title
// + filter, space, sort setup button
// scroll view
// status: ticket ()

// tab: board, backlog, timeline, report
// board: todo, in progress, dev done, ready for testing
