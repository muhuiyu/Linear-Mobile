export type SingleModelChange<T extends { id: string | number }> =
  | { type: 'added'; data: T }
  | { type: 'updated'; changes: Partial<Omit<T, 'id'>> | ((oldData: T) => T) }
  | { type: 'deleted' }

export default interface ModelChange<T extends { id: string | number }> {
  added?: T[]
  updated?: { [id in T['id']]: Partial<Omit<T, 'id'>> }
  deleted?: T['id'][]
}
