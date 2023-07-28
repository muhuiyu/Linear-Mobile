export interface Project {
  color: string
  icon?: string
  id: string
  name: string
}

export const projectQuery = 'color icon id name'

export interface ProjectFull {
  //   private _convertedFromIssue?
  //   private _creator
  //   private _integrationsSettings?
  //   private _lead?
  //   constructor(request: LinearRequest, data: L.ProjectFragment)
  /** The time at which the entity was archived. Null if the entity has not been archived. */
  archivedAt?: Date
  /** The time at which the project was automatically archived by the auto pruning process. */
  autoArchivedAt?: Date
  /** The time at which the project was moved into canceled state. */
  canceledAt?: Date
  /** The project's color. */
  color?: string
  /** The time at which the project was moved into completed state. */
  completedAt?: Date
  /** The number of completed issues in the project after each week. */
  completedIssueCountHistory?: number[]
  /** The number of completed estimation points after each week. */
  completedScopeHistory?: number[]
  /** The time at which the entity was created. */
  createdAt?: Date
  /** The project's description. */
  description?: string
  /** The icon of the project. */
  icon?: string
  /** The unique identifier of the entity. */
  id: string
  /** The number of in progress estimation points after each week. */
  inProgressScopeHistory?: number[]
  /** The total number of issues in the project after each week. */
  issueCountHistory?: number[]
  /** The project's name. */
  name: string
  /** The overall progress of the project. This is the (completed estimate points + 0.25 * in progress estimate points) / total estimate points. */
  progress?: number
  /** The time until which project update reminders are paused. */
  projectUpdateRemindersPausedUntilAt?: Date
  /** The overall scope (total estimate points) of the project. */
  scope?: number
  /** The total number of estimation points after each week. */
  scopeHistory?: number[]
  /** Whether to send new issue comment notifications to Slack. */
  slackIssueComments?: boolean
  /** Whether to send new issue status updates to Slack. */
  slackIssueStatuses?: boolean
  /** Whether to send new issue notifications to Slack. */
  slackNewIssue?: boolean
  /** The project's unique URL slug. */
  slugId?: string
  /** The sort order for the project within the organization. */
  sortOrder: number
  /** The estimated start date of the project. */
  //   startDate?: L.Scalars['TimelessDate']
  /** The time at which the project was moved into started state. */
  startedAt?: Date
  /** The type of the state. */
  state?: string
  /** The estimated completion date of the project. */
  //   targetDate?: L.Scalars['TimelessDate']
  /**
   * The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
   *     for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
   *     been updated after creation.
   */
  updatedAt: Date
  /** Project URL. */
  url: string
  /** The project was created based on this issue. */
  //   get convertedFromIssue(): LinearFetch<Issue> | undefined
  //   /** The user who created the project. */
  //   get creator(): LinearFetch<User> | undefined
  //   /** Settings for all integrations associated with that project. */
  //   get integrationsSettings(): LinearFetch<IntegrationsSettings> | undefined
  //   /** The project lead. */
  //   get lead(): LinearFetch<User> | undefined
  //   /** Documents associated with the project. */
  //   documents(variables?: Omit<L.Project_DocumentsQueryVariables, 'id'>): LinearFetch<DocumentConnection>
  //   /** Issues associated with the project. */
  //   issues(variables?: Omit<L.Project_IssuesQueryVariables, 'id'>): LinearFetch<IssueConnection>
  //   /** Links associated with the project. */
  //   links(variables?: Omit<L.Project_LinksQueryVariables, 'id'>): LinearFetch<ProjectLinkConnection>
  //   /** Users that are members of the project. */
  //   members(variables?: Omit<L.Project_MembersQueryVariables, 'id'>): LinearFetch<UserConnection>
  //   /** Milestones associated with the project. */
  //   projectMilestones(
  //     variables?: Omit<L.Project_ProjectMilestonesQueryVariables, 'id'>,
  //   ): LinearFetch<ProjectMilestoneConnection>
  //   /** Project updates associated with the project. */
  //   projectUpdates(variables?: Omit<L.Project_ProjectUpdatesQueryVariables, 'id'>): LinearFetch<ProjectUpdateConnection>
  //   /** Teams associated with this project. */
  //   teams(variables?: Omit<L.Project_TeamsQueryVariables, 'id'>): LinearFetch<TeamConnection>
  //   /** Archives a project. */
  //   archive(): LinearFetch<ProjectArchivePayload>
  //   /** Creates a new project. */
  //   create(input: L.ProjectCreateInput): LinearFetch<ProjectPayload>
  //   /** Deletes a project. All issues will be disassociated from the deleted project. */
  //   delete(): LinearFetch<DeletePayload>
  //   /** Unarchives a project. */
  //   unarchive(): LinearFetch<ProjectArchivePayload>
  //   /** Updates a project. */
  //   update(input: L.ProjectUpdateInput): LinearFetch<ProjectPayload>
}

const allProjectKeys: (keyof ProjectFull)[] = [
  'archivedAt',
  'autoArchivedAt',
  'canceledAt',
  'color',
  'completedIssueCountHistory',
  'completedScopeHistory',
  'createdAt',
  'description',
  'icon',
  'id',
  'inProgressScopeHistory',
  'issueCountHistory',
  'name',
  'progress',
  'projectUpdateRemindersPausedUntilAt',
  'scope',
  'scopeHistory',
  'slackIssueComments',
  'slackIssueStatuses',
  'slackNewIssue',
  'slugId',
  'sortOrder',
  'startedAt',
  'state',
  'updatedAt',
  'url',
]

export const projectFullQuery = '{ ' + allProjectKeys.join(' ') + ' }'
