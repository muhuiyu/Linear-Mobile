import { useQuery } from '@tanstack/react-query'
import _ from 'lodash'
import { useMemo } from 'react'
import { apiEndPoint } from '../constants/Environment'
import { Issue, IssueSchema, issueQuery } from '../models/Issue'
import { Project } from '../models/Project'
import { Team } from '../models/Team'
import { issuesQueryKey } from './queryKeys'

const query = `{ issues { nodes { ${issueQuery} } } }`

type QueryBy = 'team' | 'project' | 'all'

export default function useAllIssues(token: string, teamId?: Team['id'], projectId?: Project['id']) {
  const { data: issues, isFetching } = useQuery({
    queryKey: [issuesQueryKey],
    queryFn: async () => {
      let issuesQuery = ''
      let queryBy: QueryBy = 'all'

      if (!_.isEmpty(projectId)) {
        queryBy = 'project'
        issuesQuery = `{ project(id: \"${projectId}\") ${query}  }`
      } else if (!_.isEmpty(teamId)) {
        queryBy = 'team'
        issuesQuery = `{ team(id: \"${teamId}\") ${query}  }`
      } else {
        queryBy = 'all'
        issuesQuery = query
      }

      console.log('query by', queryBy, 'query', issuesQuery)

      return fetch(apiEndPoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({ query: issuesQuery }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data) return []

          switch (queryBy) {
            case 'team':
              let teamIssues: Issue[] = data.data.team.issues.nodes.map((node: any) => IssueSchema.parse(node))
              return teamIssues
            case 'project':
              let projectIssues: Issue[] = data.data.project.issues.nodes.map((node: any) => IssueSchema.parse(node))
              return projectIssues
            case 'all':
              let allIssues: Issue[] = data.data.issues.nodes.map((node: any) => IssueSchema.parse(node))
              return allIssues
          }
        })
        .catch((error) => {
          console.error(error)
        })
    },
  })

  const backlogIssues: Issue[] = useMemo(() => {
    return issues?.filter((item) => item.state.type === 'backlog') ?? []
  }, [issues])

  const activeIssues: Issue[] = useMemo(() => {
    return issues?.filter((issue) => issue.state.type !== 'backlog') ?? []
  }, [issues])

  return { issues, isLoading: isFetching, backlogIssues, activeIssues }
}
