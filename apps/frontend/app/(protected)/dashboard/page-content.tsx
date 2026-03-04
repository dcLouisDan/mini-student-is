'use client'

import { buttonVariants } from '@/components/ui/button'
import useActivityLogs from '@/hooks/use-activity-logs'
import useDashboard, { EntityCountItem } from '@/hooks/useDashboard'
import dayjs from '@/lib/dayjs'
import Link from 'next/link'
import { CourseStudentsChart } from './charts/course-students-chart'
import { CourseSubjectsChart } from './charts/course-subjects-chart'
import useAuth from '@/hooks/use-auth'

export default function PageContent() {
  const { entityCountsArr } = useDashboard()
  const { user } = useAuth()

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        {entityCountsArr.map((item) => (
          <EntityCountCard key={item.label} item={item} />
        ))}
      </div>
      {user?.role == 'admin' && (
        <div className="flex flex-col gap-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <CourseStudentsChart />
            <CourseSubjectsChart />
          </div>
          <RecentActivitiesCard />
        </div>
      )}
    </main>
  )
}

function EntityCountCard({ item }: { item: EntityCountItem }) {
  return (
    <div className="flex items-center border bg-secondary text-secondary-foreground p-2 rounded-lg">
      {item.icon && (
        <div>
          <item.icon className="size-8" />
        </div>
      )}
      <div className="flex flex-col items-end flex-1 w-full">
        <div className="text-xl font-semibold">{item.count}</div>
        <p>{item.label}</p>
      </div>
    </div>
  )
}

function RecentActivitiesCard() {
  const { activitylogs } = useActivityLogs({
    page: 1,
    sortBy: 'createdAt',
    sortOrder: 'desc',
    perPage: 10,
  })

  return (
    <div className="grid border rounded-lg pb-4">
      <div className="flex items-center justify-between">
        <h4 className="p-2 font-semibold">Recent Activities</h4>
        <Link href="/activity-logs" className={buttonVariants({ variant: 'link' })}>
          See all
        </Link>
      </div>
      <div className="grid">
        {activitylogs.map((item) => (
          <div key={item.id} className="flex items-center border-y text-xs p-2">
            <div className=" border-e-2 pe-2 me-2">
              <strong>USER: </strong>
              {(item.modelId ?? 'system').toUpperCase()}
            </div>{' '}
            <div className="w-24 font-bold border-e-2 me-2">
              {(item.entityType ?? 'unknown').toUpperCase()}
            </div>{' '}
            <div className="flex-1"> {item.description}</div>
            <div> {dayjs(item.createdAt).fromNow()}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
