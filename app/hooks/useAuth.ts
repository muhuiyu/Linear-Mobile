import _ from 'lodash'
import { create } from 'zustand'

interface TokenState {
  token: string
  setToken: (newToken: string) => void
  removeToken: () => void
}

const useTokenStore = create<TokenState>()((set) => ({
  token: 'lin_api_JPn0by2Io0BzBFJl0s5wg4pyzyGZOizzqfWuuAD1',
  setToken: (newToken) => set((state) => ({ token: newToken })),
  removeToken: () => set((state) => ({ token: '' })),
}))

// UseAuth
export default function useAuth() {
  const token = useTokenStore((state) => state.token)
  const isSignedIn = !_.isEmpty(token)

  const signIn = useTokenStore((state) => state.setToken)
  const signOut = useTokenStore((state) => state.removeToken)

  return { token, isSignedIn, signIn, signOut }
}
