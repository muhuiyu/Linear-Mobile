import { z } from 'zod'

export interface History {
  /** The time at which the entity was created. */
  createdAt: Date
  /** The id for the user that started the job. */
  creatorId: string
  /** The unique identifier of the entity. */
  id: string
  /** The status for the import job. */
  status: string
}

// export declare class IssueImport extends Request {
//   constructor(request: LinearRequest, data: L.IssueImportFragment)
//   /** The time at which the entity was archived. Null if the entity has not been archived. */
//   archivedAt?: Date
//   /** The time at which the entity was created. */
//   createdAt: Date
//   /** The id for the user that started the job. */
//   creatorId: string
//   /** File URL for the uploaded CSV for the import, if there is one. */
//   csvFileUrl?: string
//   /** User readable error message, if one has occurred during the import. */
//   error?: string
//   /** Error code and metadata, if one has occurred during the import */
//   errorMetadata?: Record<string, unknown>
//   /** The unique identifier of the entity. */
//   id: string
//   /** The data mapping configuration for the import job. */
//   mapping?: Record<string, unknown>
//   /** Current step progress in % (0-100). */
//   progress?: number
//   /** The service from which data will be imported. */
//   service: string
//   /** The status for the import job. */
//   status: string
//   /** New team's name in cases when teamId not set */
//   teamName?: string
//   /**
//    * The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those
//    *     for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't
//    *     been updated after creation.
//    */
//   updatedAt: Date
//   /** Deletes an import job. */
//   delete(issueImportId: string): LinearFetch<IssueImportDeletePayload>
//   /** Updates the mapping for the issue import. */
//   update(input: L.IssueImportUpdateInput): LinearFetch<IssueImportPayload>
// }

export const HistorySchema = z.object({
  createdAt: z.date(),
  creatorId: z.string(),
  id: z.string(),
  status: z.string(),
})
