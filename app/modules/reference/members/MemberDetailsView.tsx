import { RootScreenProps } from '../../../navigation/models/RootParamList'
import MemberDetails from './components/MemberDetails'
import { getMemberById } from './data/MemberData'

type Props = RootScreenProps<'MemberDetails'>

export default function MemberDetailsView(props: Props) {
  const { navigation } = props
  const member = getMemberById(props.route.params.memberId)
  if (!member) {
    return null
  }
  return <MemberDetails member={member} />
}
