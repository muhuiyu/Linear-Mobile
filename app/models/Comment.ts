import { z } from 'zod'
import { User, UserSchema, userQuery } from './User'

export interface Comment {
  /** The comment content in markdown format. */
  body: string
  /** The comment content as a Prosemirror document. */
  bodyData: string
  /** The time at which the entity was created. */
  createdAt: Date
  /** The unique identifier of the entity. */
  id: string
  /** Comment's URL. */
  url: string
  /** The user who wrote the comment. */
  user: User
}

export const commentQuery = `body bodyData createdAt id url user { ${userQuery} }`

// export declare class Comment extends Request {
//   private _issue
//   private _parent?
//   private _user?
//   constructor(request: LinearRequest, data: L.CommentFragment)
//   /** The time at which the entity was archived. Null if the entity has not been archived. */
//   archivedAt?: Date
//   /** The comment content in markdown format. */
//   body: string
//   /** The comment content as a Prosemirror document. */
//   bodyData: string
//   /** The time at which the entity was created. */
//   createdAt: Date
//   /** The time user edited the comment. */
//   editedAt?: Date
//   /** The unique identifier of the entity. */
//   id: string
//   /** Emoji reaction summary, grouped by emoji type */
//   reactionData: Record<string, unknown>
//   /**
//    * The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
//    *     for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
//    *     been updated after creation.
//    */
//   updatedAt: Date
//   /** Comment's URL. */
//   url: string
//   /** The issue that the comment is associated with. */
//   get issue(): LinearFetch<Issue> | undefined
//   /** The parent comment under which the current comment is nested. */
//   get parent(): LinearFetch<Comment> | undefined
//   /** The user who wrote the comment. */
//   get user(): LinearFetch<User> | undefined
//   /** The children of the comment. */
//   children(variables?: Omit<L.Comment_ChildrenQueryVariables, 'id'>): LinearFetch<CommentConnection>
//   /** Creates a new comment. */
//   create(input: L.CommentCreateInput): LinearFetch<CommentPayload>
//   /** Deletes a comment. */
//   delete(): LinearFetch<DeletePayload>
//   /** Updates a comment. */
//   update(input: L.CommentUpdateInput): LinearFetch<CommentPayload>
// }

export const CommentSchema = z.object({
  body: z.string(),
  bodyData: z.string(),
  createdAt: z.string().transform((arg) => new Date(arg)),
  id: z.string(),
  url: z.string(),
  user: UserSchema,
})

// export type CommentBodyDataType = 'doc'
// export interface CommentBodyData {
//   type: CommentBodyDataType
//   content:
// }
