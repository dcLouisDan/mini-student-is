import { LucideIcon, MonitorCog, University, Users } from 'lucide-react'
import { UserRole } from './constants'

export interface NavMainSubItem {
  title: string
  url: string
}

export interface NavMainItem {
  title: string
  url: string
  icon: LucideIcon
  isActive?: boolean
  items: NavMainSubItem[]
  allowedRoles: UserRole[]
}

const navMain: NavMainItem[] = [
  {
    title: 'Students',
    url: '#',
    icon: Users,
    isActive: true,
    allowedRoles: ['admin', 'encoder'],
    items: [
      {
        title: 'Student Records',
        url: '/students',
      },
      {
        title: 'Grade Sheet',
        url: '/grades',
      },
    ],
  },
  {
    title: 'Curriculum',
    url: '#',
    icon: University,
    isActive: true,
    allowedRoles: ['admin', 'encoder'],
    items: [
      {
        title: 'Courses',
        url: '/courses',
      },
      {
        title: 'Subjects',
        url: '/subjects',
      },
    ],
  },
  {
    title: 'System',
    url: '#',
    icon: MonitorCog,
    isActive: true,
    allowedRoles: ['admin'],

    items: [
      {
        title: 'Users',
        url: '/users',
      },
      {
        title: 'Activity Logs',
        url: '/activity-logs',
      },
    ],
  },
]

export const getNavMainLinks = (role: UserRole) => {
  return navMain.filter((item) => item.allowedRoles.includes(role))
}
