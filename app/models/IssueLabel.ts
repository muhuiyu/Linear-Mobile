import { z } from 'zod'

export interface IssueLabel {
  /** The label's color as a HEX string. */
  color: string
  /** The label's description. */
  description?: string
  /** The unique identifier of the entity. */
  id: string
  /** The label's name. */
  name: string
}

export const issueLabelQuery = 'color description id name'

export declare class IssueLabelFull extends Request {
  // private _creator?
  // private _parent?
  // private _team?
  // constructor(request: LinearRequest, data: L.IssueLabelFragment)
  /** The time at which the entity was archived. Null if the entity has not been archived. */
  archivedAt?: Date
  /** The label's color as a HEX string. */
  color: string
  /** The time at which the entity was created. */
  createdAt: Date
  /** The label's description. */
  description?: string
  /** The unique identifier of the entity. */
  id: string
  /** The label's name. */
  name: string
  /**
   * The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
   *     for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
   *     been updated after creation.
   */
  updatedAt: Date
  /** The user who created the label. */
  // get creator(): LinearFetch<User> | undefined
  // get organization(): LinearFetch<Organization>
  // /** The parent label. */
  // get parent(): LinearFetch<IssueLabel> | undefined
  // /** The team that the label is associated with. If null, the label is associated with the global workspace. */
  // get team(): LinearFetch<Team> | undefined
  // /** Children of the label. */
  // children(variables?: Omit<L.IssueLabel_ChildrenQueryVariables, 'id'>): LinearFetch<IssueLabelConnection>
  // /** Issues associated with the label. */
  // issues(variables?: Omit<L.IssueLabel_IssuesQueryVariables, 'id'>): LinearFetch<IssueConnection>
  // /** Creates a new label. */
  // create(
  //   input: L.IssueLabelCreateInput,
  //   variables?: Omit<L.CreateIssueLabelMutationVariables, 'input'>,
  // ): LinearFetch<IssueLabelPayload>
  // /** Deletes an issue label. */
  // delete(): LinearFetch<DeletePayload>
  // /** Updates an label. */
  // update(input: L.IssueLabelUpdateInput): LinearFetch<IssueLabelPayload>
}

export const IssueLabelSchema = z.object({
  color: z.string(),
  description: z.string().nullable(),
  id: z.string(),
  name: z.string(),
})
