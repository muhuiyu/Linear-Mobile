import { z } from 'zod'

export interface User {
  /** Whether the user is an organization administrator. */
  admin: boolean
  /** An URL to the user's avatar image. */
  avatarUrl?: string
  /** The user's display (nick) name. Unique within each organization. */
  displayName: string
  /** The user's email address. */
  email: string
  /** The unique identifier of the entity. */
  id: string
  /** Whether the user is the currently authenticated user. */
  isMe: boolean
  /** The user's full name. */
  name: string
  /** User's profile URL. */
  url: string
}

export const userQuery = 'admin avatarUrl displayName email id isMe name url'

export declare class UserFull extends Request {
  //   constructor(request: LinearRequest, data: L.UserFragment)
  /** Whether the user account is active or disabled (suspended). */
  active: boolean
  /** Whether the user is an organization administrator. */
  admin: boolean
  /** The time at which the entity was archived. Null if the entity has not been archived. */
  archivedAt?: Date
  /** An URL to the user's avatar image. */
  avatarUrl?: string
  /** [DEPRECATED] Hash for the user to be used in calendar URLs. */
  calendarHash?: string
  /** The time at which the entity was created. */
  createdAt: Date
  /** Number of issues created. */
  createdIssueCount: number
  /** A short description of the user, either its title or bio. */
  description?: string
  /** Reason why is the account disabled. */
  disableReason?: string
  /** The user's display (nick) name. Unique within each organization. */
  displayName: string
  /** The user's email address. */
  email: string
  /** Whether the user is a guest in the workspace and limited to accessing a subset of teams. */
  guest: boolean
  /** The unique identifier of the entity. */
  id: string
  /** Unique hash for the user to be used in invite URLs. */
  inviteHash: string
  /** Whether the user is the currently authenticated user. */
  isMe: boolean
  /** The last time the user was seen online. If null, the user is currently online. */
  lastSeen?: Date
  /** The user's full name. */
  name: string
  /** The emoji to represent the user current status. */
  statusEmoji?: string
  /** The label of the user current status. */
  statusLabel?: string
  /** A date at which the user current status should be cleared. */
  statusUntilAt?: Date
  /** The local timezone of the user. */
  timezone?: string
  /**
   * The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
   *     for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
   *     been updated after creation.
   */
  updatedAt: Date
  /** User's profile URL. */
  url: string
  /** Organization the user belongs to. */
  //   get organization(): LinearFetch<Organization>
  //   /** Issues assigned to the user. */
  //   assignedIssues(variables?: Omit<L.User_AssignedIssuesQueryVariables, 'id'>): LinearFetch<IssueConnection>
  //   /** Issues created by the user. */
  //   createdIssues(variables?: Omit<L.User_CreatedIssuesQueryVariables, 'id'>): LinearFetch<IssueConnection>
  //   /** Memberships associated with the user. For easier access of the same data, use `teams` query. */
  //   teamMemberships(variables?: Omit<L.User_TeamMembershipsQueryVariables, 'id'>): LinearFetch<TeamMembershipConnection>
  //   /** Teams the user is part of. */
  //   teams(variables?: Omit<L.User_TeamsQueryVariables, 'id'>): LinearFetch<TeamConnection>
  //   /** Suspends a user. Can only be called by an admin. */
  //   suspend(): LinearFetch<UserAdminPayload>
  //   /** Un-suspends a user. Can only be called by an admin. */
  //   unsuspend(): LinearFetch<UserAdminPayload>
  //   /** Updates a user. Only available to organization admins and the user themselves. */
  //   update(input: L.UpdateUserInput): LinearFetch<UserPayload>
}

export const UserSchema = z.object({
  admin: z.boolean(),
  avatarUrl: z.string().url().optional(),
  displayName: z.string(),
  email: z.string().email(),
  id: z.string(),
  isMe: z.boolean(),
  name: z.string(),
  url: z.string().url(),
})
