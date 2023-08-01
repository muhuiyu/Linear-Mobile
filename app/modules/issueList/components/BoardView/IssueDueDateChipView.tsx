import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import { toDueDateString } from '../../../../helpers/dateHelpers'
import { Issue } from '../../../../models/Issue'
import ChipView from '../../../common/components/ChipView'

interface Props {
  dueDate: Issue['dueDate']
}

export default function IssueDueDateChipView({ dueDate }: Props) {
  const iconColor = () => {
    const date = moment(dueDate)
    const today = moment()
    const isDueDatePassed = date.isBefore(today)
    const isWithinSevenDays = date.diff(today, 'days') <= 7
    return isDueDatePassed ? '#FA5F55' : isWithinSevenDays ? '#FA5F55' : '#ccc'
  }
  return (
    <ChipView
      id="due-date"
      color="#fff"
      iconColor={iconColor()}
      textColor="#000"
      borderColor="#ddd"
      icon={faCalendar}
      name={toDueDateString(dueDate)}
    />
  )
}
