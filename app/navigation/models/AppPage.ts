export type AppPage = 'home' | 'projects' | 'issues' | 'dashbaord' | 'notifications'
interface PageInfo {
  key: AppPage
  name: string
}

export const pageInfo: Record<AppPage, PageInfo> = {
  home: {
    key: 'home',
    name: 'Home',
  },
  projects: {
    key: 'projects',
    name: 'Projects',
  },
  issues: {
    key: 'issues',
    name: 'Issues',
  },
  dashbaord: {
    key: 'dashbaord',
    name: 'Dashboard',
  },
  notifications: {
    key: 'notifications',
    name: 'Notifications',
  },
}
