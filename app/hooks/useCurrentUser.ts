import { useQuery } from '@tanstack/react-query'
import { apiEndPoint } from '../constants/Environment'
import { UserSchema, userQuery } from '../models/User'
import { currentAuthQueryKey } from './queryKeys'

export type UseCurrentUserType = 'basic' | 'default'

export default function useCurrentUser(token: string, type: UseCurrentUserType) {
  const { data: currentUser, isFetching } = useQuery({
    queryKey: [currentAuthQueryKey],
    queryFn: async () => {
      let query = ''
      switch (type) {
        case 'default':
          query = `{ viewer { ${userQuery} } }`
          break
      }

      const response = await fetch(apiEndPoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({ query }),
      })

      const data = await response.json()
      return UserSchema.parse(data.data.viewer)
    },
  })

  return {
    currentUser,
    isLoading: isFetching,
  }
}
