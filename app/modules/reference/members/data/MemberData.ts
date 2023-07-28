import { Member } from '../models/Member'

export const memberData: Member[] = [
  {
    id: 'eunice-au',
    name: 'Eunice Au',
    jobTitle: 'Trainer lead',
    note: '',
    photoUrl: 'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
  },
  {
    id: 'alice-au',
    name: 'Alice',
    jobTitle: 'OC',
    note: '',
    photoUrl: 'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
  },
  {
    id: 'anna-au',
    name: 'Anna Howard',
    jobTitle: 'Kidzone',
    note: '',
    photoUrl: 'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
  },
]

export const getMemberById = (memberId: string): Member | undefined => {
  for (const member of memberData) {
    if (member.id === memberId) {
      return member
    }
  }
  return undefined // return undefined if no session is found with the provided id
}
