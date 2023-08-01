import { IssueLabel } from '../../../models/IssueLabel'
import ChipView from '../../common/components/ChipView'

interface Props {
  label: IssueLabel
}

export default function IssueLabelChipView({ label }: Props) {
  return <ChipView id={label.id} name={label.name} color={label.color} />
}
