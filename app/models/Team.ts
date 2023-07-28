export interface Team {
  //   private _activeCycle?
  //   private _defaultIssueState?
  //   private _defaultTemplateForMembers?
  //   private _defaultTemplateForNonMembers?
  //   private _draftWorkflowState?
  //   private _integrationsSettings?
  //   private _markedAsDuplicateWorkflowState?
  //   private _mergeWorkflowState?
  //   private _reviewWorkflowState?
  //   private _startWorkflowState?
  //   private _triageIssueState?
  //   constructor(request: LinearRequest, data: L.TeamFragment)
  /** The time at which the entity was archived. Null if the entity has not been archived. */
  archivedAt?: Date
  /** Period after which automatically closed and completed issues are automatically archived in months. */
  autoArchivePeriod: number
  /** Period after which issues are automatically closed in months. Null/undefined means disabled. */
  autoClosePeriod?: number
  /** The canceled workflow state which auto closed issues will be set to. Defaults to the first canceled state. */
  autoCloseStateId?: string
  /** The team's color. */
  color?: string
  /** The time at which the entity was created. */
  createdAt: Date
  /** Calendar feed URL (iCal) for cycles. */
  cycleCalenderUrl: string
  /** The cooldown time after each cycle in weeks. */
  cycleCooldownTime: number
  /** The duration of a cycle in weeks. */
  cycleDuration: number
  /** Auto assign completed issues to current cycle. */
  cycleIssueAutoAssignCompleted: boolean
  /** Auto assign started issues to current cycle. */
  cycleIssueAutoAssignStarted: boolean
  /** Only allow issues issues with cycles in Active Issues. */
  cycleLockToActive: boolean
  /** The day of the week that a new cycle starts. */
  cycleStartDay: number
  /** Whether the team uses cycles. */
  cyclesEnabled: boolean
  /** What to use as an default estimate for unestimated issues. */
  defaultIssueEstimate: number
  /** The id of the default template to use for new issues created by members of the team. */
  defaultTemplateForMembersId?: string
  /** The id of the default template to use for new issues created by non-members of the team. */
  defaultTemplateForNonMembersId?: string
  /** The team's description. */
  description?: string
  /** Whether to group recent issue history entries. */
  groupIssueHistory: boolean
  /** The icon of the team. */
  icon?: string
  /** The unique identifier of the entity. */
  id: string
  /** Unique hash for the team to be used in invite URLs. */
  inviteHash: string
  /** Number of issues in the team. */
  issueCount: number
  /** Whether to allow zeros in issues estimates. */
  issueEstimationAllowZero: boolean
  /** Whether to add additional points to the estimate scale. */
  issueEstimationExtended: boolean
  /** The issue estimation type to use. Must be one of "notUsed", "exponential", "fibonacci", "linear", "tShirt". */
  issueEstimationType: string
  /** Whether issues without priority should be sorted first. */
  issueOrderingNoPriorityFirst: boolean
  /** Whether to move issues to bottom of the column when changing state. */
  issueSortOrderDefaultToBottom: boolean
  /** The team's unique key. The key is used in URLs. */
  key: string
  /** The team's name. */
  name: string
  /** Whether the team is private or not. */
  private: boolean
  /** Whether an issue needs to have a priority set before leaving triage */
  requirePriorityToLeaveTriage: boolean
  /** Whether to send new issue comment notifications to Slack. */
  slackIssueComments: boolean
  /** Whether to send new issue status updates to Slack. */
  slackIssueStatuses: boolean
  /** Whether to send new issue notifications to Slack. */
  slackNewIssue: boolean
  /** The timezone of the team. Defaults to "America/Los_Angeles" */
  timezone: string
  /** Whether triage mode is enabled for the team or not. */
  triageEnabled: boolean
  /** How many upcoming cycles to create. */
  upcomingCycleCount: number
  /**
   * The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
   *     for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
   *     been updated after creation.
   */
  updatedAt: Date
  /** Team's currently active cycle. */
  //   get activeCycle(): LinearFetch<Cycle> | undefined
  //   /** The default workflow state into which issues are set when they are opened by team members. */
  //   get defaultIssueState(): LinearFetch<WorkflowState> | undefined
  //   /** The default template to use for new issues created by members of the team. */
  //   get defaultTemplateForMembers(): LinearFetch<Template> | undefined
  //   /** The default template to use for new issues created by non-members of the team. */
  //   get defaultTemplateForNonMembers(): LinearFetch<Template> | undefined
  //   /** The workflow state into which issues are moved when a PR has been opened as draft. */
  //   get draftWorkflowState(): LinearFetch<WorkflowState> | undefined
  //   /** Settings for all integrations associated with that team. */
  //   get integrationsSettings(): LinearFetch<IntegrationsSettings> | undefined
  //   /** The workflow state into which issues are moved when they are marked as a duplicate of another issue. Defaults to the first canceled state. */
  //   get markedAsDuplicateWorkflowState(): LinearFetch<WorkflowState> | undefined
  //   /** The workflow state into which issues are moved when a PR has been merged. */
  //   get mergeWorkflowState(): LinearFetch<WorkflowState> | undefined
  //   /** The organization that the team is associated with. */
  //   get organization(): LinearFetch<Organization>
  //   /** The workflow state into which issues are moved when a review has been requested for the PR. */
  //   get reviewWorkflowState(): LinearFetch<WorkflowState> | undefined
  //   /** The workflow state into which issues are moved when a PR has been opened. */
  //   get startWorkflowState(): LinearFetch<WorkflowState> | undefined
  //   /** The workflow state into which issues are set when they are opened by non-team members or integrations if triage is enabled. */
  //   get triageIssueState(): LinearFetch<WorkflowState> | undefined
  //   /** Cycles associated with the team. */
  //   cycles(variables?: Omit<L.Team_CyclesQueryVariables, 'id'>): LinearFetch<CycleConnection>
  //   /** Issues associated with the team. */
  //   issues(variables?: Omit<L.Team_IssuesQueryVariables, 'id'>): LinearFetch<IssueConnection>
  //   /** Labels associated with the team. */
  //   labels(variables?: Omit<L.Team_LabelsQueryVariables, 'id'>): LinearFetch<IssueLabelConnection>
  //   /** Users who are members of this team. */
  //   members(variables?: Omit<L.Team_MembersQueryVariables, 'id'>): LinearFetch<UserConnection>
  //   /** Memberships associated with the team. For easier access of the same data, use `members` query. */
  //   memberships(variables?: Omit<L.Team_MembershipsQueryVariables, 'id'>): LinearFetch<TeamMembershipConnection>
  //   /** Projects associated with the team. */
  //   projects(variables?: Omit<L.Team_ProjectsQueryVariables, 'id'>): LinearFetch<ProjectConnection>
  //   /** The states that define the workflow associated with the team. */
  //   states(variables?: Omit<L.Team_StatesQueryVariables, 'id'>): LinearFetch<WorkflowStateConnection>
  //   /** Templates associated with the team. */
  //   templates(variables?: Omit<L.Team_TemplatesQueryVariables, 'id'>): LinearFetch<TemplateConnection>
  //   /** Webhooks associated with the team. */
  //   webhooks(variables?: Omit<L.Team_WebhooksQueryVariables, 'id'>): LinearFetch<WebhookConnection>
  //   /** Creates a new team. The user who creates the team will automatically be added as a member to the newly created team. */
  //   create(input: L.TeamCreateInput, variables?: Omit<L.CreateTeamMutationVariables, 'input'>): LinearFetch<TeamPayload>
  //   /** Deletes a team. */
  //   delete(): LinearFetch<DeletePayload>
  //   /** Updates a team. */
  //   update(input: L.TeamUpdateInput): LinearFetch<TeamPayload>
}

// 21ec1c84-1d64-4ce2-9f3c-c0414ac26fd4
// 9aed3e49-ad24-4dc8-aeff-61dab2bf7308: default
