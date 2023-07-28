import _ from 'lodash'
import { create } from 'zustand'
import { myDefaultTeamId, myToken } from '../constants/apiKeys'
import { Team } from '../models/Team'

// token
interface UserDefaultsState {
  token: string
  setToken: (newToken: string) => void
  removeToken: () => void
  defaultTeamId: Team['id']
  setDefaultTeamId: (id: string) => void
  removeDefaultTeamId: () => void
}

const useUserDefaultsStore = create<UserDefaultsState>()((set) => ({
  token: myToken,
  setToken: (newToken) => set((state) => ({ token: newToken })),
  removeToken: () => set((state) => ({ token: '' })),
  defaultTeamId: myDefaultTeamId,
  setDefaultTeamId: (id) => set((state) => ({ defaultTeamId: id })),
  removeDefaultTeamId: () => set((state) => ({ defaultTeamId: '' })),
}))

// UseAuth
export default function useAuth() {
  const token = useUserDefaultsStore((state) => state.token)
  const defaultTeamId = useUserDefaultsStore((state) => state.defaultTeamId)
  const isSignedIn = !_.isEmpty(token)

  const signIn = useUserDefaultsStore((state) => state.setToken)
  const signOut = useUserDefaultsStore((state) => state.removeToken)

  return { token, defaultTeamId, isSignedIn, signIn, signOut }
}
