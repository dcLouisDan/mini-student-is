'use client'

import * as React from 'react'
import { MonitorCog, University, Users } from 'lucide-react'

import { NavMain } from '@/components/nav-main'
import { NavUser } from '@/components/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
import AppSidebarHeader from './app-sidebar-header'

// This is sample data.
const data = {
  navMain: [
    {
      title: 'Students',
      url: '#',
      icon: Users,
      isActive: true,
      items: [
        {
          title: 'Student Records',
          url: '#',
        },
        {
          title: 'Grade Sheet',
          url: '#',
        },
        {
          title: 'Subject Reservations',
          url: '#',
        },
      ],
    },
    {
      title: 'Curriculum',
      url: '#',
      icon: University,
      items: [
        {
          title: 'Courses',
          url: '/courses',
        },
        {
          title: 'Subjects',
          url: '#',
        },
      ],
    },
    {
      title: 'System',
      url: '#',
      icon: MonitorCog,
      items: [
        {
          title: 'Users',
          url: '#',
        },
        {
          title: 'Activity Logs',
          url: '#',
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <AppSidebarHeader />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
