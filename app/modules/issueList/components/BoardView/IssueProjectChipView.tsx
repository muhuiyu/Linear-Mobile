import { linearIconToIconDefinition } from '../../../../helpers/iconHelpers'
import { Project } from '../../../../models/Project'
import ChipView from '../../../common/components/ChipView'

interface Props {
  project: Project
}

export default function IssueProjectChipView({ project }: Props) {
  return (
    <ChipView
      id="project"
      color="#fff"
      name={project.name}
      textColor="#000"
      icon={linearIconToIconDefinition[project.icon ?? '']}
      iconColor={project.color}
      borderColor="#ddd"
    />
  )
}
