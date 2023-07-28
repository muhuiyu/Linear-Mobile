import { RootScreenProps } from '../../../navigation/models/RootParamList'
import SessionDetails from './components/SessionDetails'
import { getSessionById } from './data/ScheduleData'

type Props = RootScreenProps<'SessionDetails'>

export default function SessionDetailsView(props: Props) {
  const { navigation } = props
  const session = getSessionById(props.route.params.sessionId)
  if (!session) {
    return null
  }
  return <SessionDetails session={session} />
}
