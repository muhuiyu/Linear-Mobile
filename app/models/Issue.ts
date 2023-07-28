import { now } from 'lodash'
import { z } from 'zod'
import { CommentSchema, commentQuery } from './Comment'
import { IssueLabelSchema, issueLabelQuery } from './IssueLabel'
import { ProjectSchema, projectQuery } from './Project'
import { UserSchema, userQuery } from './User'
import { WorkflowStateSchema, workflowStateQuery } from './WorkFlowState'

// without sub-tasks, parent, creator, comments
export const issueQuery = `id title identifier sortOrder completedAt url state { ${workflowStateQuery} } priority priorityLabel assignee { ${userQuery} } project { ${projectQuery} } labels { nodes { ${issueLabelQuery} } } `
export const issueFullQuery = `${issueQuery} creator { ${userQuery} } parent { ${issueQuery} } children { nodes { ${issueQuery} } } comments { nodes { ${commentQuery} } }`

const BaseIssueSchema = z.object({
  id: z.string(),
  sortOrder: z.number(),
  description: z.string().optional(),
  title: z.string(),
  identifier: z.string(),
  state: WorkflowStateSchema,
  completedAt: z
    .string()
    .optional()
    .nullable()
    .transform((value) => (value ? new Date() : undefined)),
  priority: z.number(),
  priorityLabel: z.string(),
  assignee: UserSchema.nullable().optional(),
  creator: UserSchema.nullable().optional(),
  project: ProjectSchema,
  comments: z
    .object({
      nodes: z.array(CommentSchema),
    })
    .transform(({ nodes }) => nodes)
    .optional(),
  labels: z
    .object({
      nodes: z.array(IssueLabelSchema),
    })
    .transform(({ nodes }) => nodes)
    .optional(),
  url: z.string(),
})

// Recursive query
export type Issue = z.infer<typeof BaseIssueSchema> & {
  children?: Issue[]
  parent?: Issue | null | undefined
}

export const IssueSchema: z.ZodType<Issue> = BaseIssueSchema.extend({
  children: z.lazy(() =>
    z
      .object({
        nodes: IssueSchema.array(),
      })
      .transform(({ nodes }) => nodes)
      .optional(),
  ),
  parent: z.lazy(() => IssueSchema.nullable().optional()),
})

// export interface Issue {
//   /** The unique identifier of the entity. */
//   id: string
//   /** The order of the item in its column on the board. */
//   sortOrder: number
//   /** The issue's description in markdown format. */
//   description?: string
//   /** The issue's title. */
//   title: string
//   /** Issue's human readable identifier (e.g. ENG-123). */
//   identifier: string
//   /** The workflow state that the issue is associated with. */
//   state: WorkflowState
//   /** The priority of the issue. 0 = No priority, 1 = Urgent, 2 = High, 3 = Normal, 4 = Low. */
//   priority: number
//   /** Label for the priority. */
//   priorityLabel: string

//   /** The user to whom the issue is assigned to. */
//   assignee: User

//   /** The user who created the issue. */
//   creator?: User

//   /** Children of the issue. */
//   children?: Issue[]
//   /** The parent of the issue. */
//   parent?: Issue
//   /** Labels associated with this issue. */
//   labels?: IssueLabel[]
// }

export interface IssueFull {
  //   private _assignee?
  //   private _creator?
  //   private _cycle?
  //   private _favorite?
  //   private _parent?
  //   private _project?
  //   private _projectMilestone?
  //   private _snoozedBy?
  //   private _state
  //   private _team
  //   constructor(request: LinearRequest, data: L.IssueFragment)
  /** The time at which the entity was archived. Null if the entity has not been archived. */
  archivedAt?: Date
  /** The time at which the issue was automatically archived by the auto pruning process. */
  autoArchivedAt?: Date
  /** The time at which the issue was automatically closed by the auto pruning process. */
  autoClosedAt?: Date
  /** Suggested branch name for the issue. */
  branchName: string
  /** The time at which the issue was moved into canceled state. */
  canceledAt?: Date
  /** The time at which the issue was moved into completed state. */
  completedAt?: Date
  /** The time at which the entity was created. */
  createdAt: Date
  /** Returns the number of Attachment resources which are created by customer support ticketing systems (e.g. Zendesk). */
  customerTicketCount: number
  /** The issue's description in markdown format. */
  description?: string
  /** The date at which the issue is due. */
  // dueDate?: L.Scalars['TimelessDate']
  /** The estimate of the complexity of the issue.. */
  estimate?: number
  /** The unique identifier of the entity. */
  id: string
  /** Issue's human readable identifier (e.g. ENG-123). */
  identifier: string
  /** The issue's unique number. */
  number: number
  /** Previous identifiers of the issue if it has been moved between teams. */
  previousIdentifiers: string[]
  /** The priority of the issue. 0 = No priority, 1 = Urgent, 2 = High, 3 = Normal, 4 = Low. */
  priority: number
  /** Label for the priority. */
  priorityLabel: string
  /** The time until an issue will be snoozed in Triage view. */
  snoozedUntilAt?: Date
  /** The order of the item in relation to other items in the organization. */
  sortOrder: number
  /** The time at which the issue was moved into started state. */
  startedAt?: Date
  /** The time at which the issue entered triage. */
  startedTriageAt?: Date
  /** The order of the item in the sub-issue list. Only set if the issue has a parent. */
  subIssueSortOrder?: number
  /** The issue's title. */
  title: string
  /** A flag that indicates whether the issue is in the trash bin. */
  trashed?: boolean
  /** The time at which the issue left triage. */
  triagedAt?: Date
  /**
   * The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
   *     for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
   *     been updated after creation.
   */
  updatedAt: Date
  /** Issue URL. */
  url: string
  /** The user to whom the issue is assigned to. */
  // get assignee(): LinearFetch<User> | undefined
  /** The user who created the issue. */
  //   get creator(): LinearFetch<User> | undefined
  /** The cycle that the issue is associated with. */
  //   get cycle(): LinearFetch<Cycle> | undefined
  /** The users favorite associated with this issue. */
  //   get favorite(): LinearFetch<Favorite> | undefined
  /** The parent of the issue. */
  //   get parent(): LinearFetch<Issue> | undefined
  /** The project that the issue is associated with. */
  //   get project(): LinearFetch<Project> | undefined
  /** The projectMilestone that the issue is associated with. */
  //   get projectMilestone(): LinearFetch<ProjectMilestone> | undefined
  /** The user who snoozed the issue. */
  //   get snoozedBy(): LinearFetch<User> | undefined
  /** The workflow state that the issue is associated with. */
  //   get state(): LinearFetch<WorkflowState> | undefined
  /** The team that the issue is associated with. */
  //   get team(): LinearFetch<Team> | undefined
  /** Attachments associated with the issue. */
  //   attachments(variables?: Omit<L.Issue_AttachmentsQueryVariables, 'id'>): LinearFetch<AttachmentConnection>
  /** Children of the issue. */
  // children(variables?: Omit<L.Issue_ChildrenQueryVariables, 'id'>): LinearFetch<IssueConnection>
  /** Comments associated with the issue. */
  //   comments(variables?: Omit<L.Issue_CommentsQueryVariables, 'id'>): LinearFetch<CommentConnection>
  /** History entries associated with the issue. */
  // history(variables?: Omit<L.Issue_HistoryQueryVariables, 'id'>): LinearFetch<IssueHistoryConnection>
  /** Inverse relations associated with this issue. */
  //   inverseRelations(variables?: Omit<L.Issue_InverseRelationsQueryVariables, 'id'>): LinearFetch<IssueRelationConnection>
  /** Labels associated with this issue. */
  // labels(variables?: Omit<L.Issue_LabelsQueryVariables, 'id'>): LinearFetch<IssueLabelConnection>
  /** Relations associated with this issue. */
  //   relations(variables?: Omit<L.Issue_RelationsQueryVariables, 'id'>): LinearFetch<IssueRelationConnection>
  /** Users who are subscribed to the issue. */
  //   subscribers(variables?: Omit<L.Issue_SubscribersQueryVariables, 'id'>): LinearFetch<UserConnection>
  /** Archives an issue. */
  //   archive(variables?: Omit<L.ArchiveIssueMutationVariables, 'id'>): LinearFetch<IssueArchivePayload>
  /** Creates a new issue. */
  //   create(input: L.IssueCreateInput): LinearFetch<IssuePayload>
  /** Deletes (trashes) an issue. */
  //   delete(): LinearFetch<IssueArchivePayload>
  /** Unarchives an issue. */
  //   unarchive(): LinearFetch<IssueArchivePayload>
  /** Updates an issue. */
  //   update(input: L.IssueUpdateInput): LinearFetch<IssuePayload>
}

// Filter completed issues in the past day
export const wasCompletedInPastDay = (issue: Issue) => {
  if (issue.completedAt) {
    const differenceInTime = now() - issue.completedAt.getTime()
    const differenceInDays = differenceInTime / (1000 * 3600 * 24)
    return differenceInDays <= 1
  }
  return false
}

// Filter completed issues in the past week
export const wasCompletedInPastWeek = (issue: Issue) => {
  if (issue.completedAt) {
    const differenceInTime = now() - issue.completedAt.getTime()
    const differenceInDays = differenceInTime / (1000 * 3600 * 24)
    return differenceInDays <= 7
  }
  return false
}

export const priorityNumberToString: Record<number, string> = {
  0: 'no priority',
  1: 'urgent',
  2: 'high',
  3: 'medium',
  4: 'low',
}
