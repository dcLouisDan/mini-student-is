import { client } from '@/lib/api'
import { QUERY_KEYS } from '@/lib/query-options/query-keys'
import { useQuery } from '@tanstack/react-query'
import { BookMarked, LucideIcon, University, Users } from 'lucide-react'
import { useMemo } from 'react'

export interface EntityCountItem {
  label: string
  count: number
  icon?: LucideIcon
}

export default function useDashboard() {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.DASHBOARD],
    queryFn: async () => {
      const res = await client.api.dashboard.index({})

      return res
    },
  })

  const courseStudentsCounts: Array<{
    id: string
    code: string
    studentsCount: number
    fill: string
  }> = useMemo(() => {
    if (!data) return []

    return data.studentsCountByCourse.map((item) => ({
      ...item,
      fill: `var(--color-${item.code})`,
      studentsCount: Number(item.studentsCount),
    }))
  }, [data])

  const courseSubjectsCounts: Array<{
    id: string
    code: string
    subjectsCount: number
    fill: string
  }> = useMemo(() => {
    if (!data) return []

    return data.subjectsCountByCourse.map((item) => ({
      ...item,
      fill: `var(--color-${item.code})`,
      subjectsCount: Number(item.subjectsCount),
    }))
  }, [data])

  const entityCountsArr: Array<EntityCountItem> = useMemo(() => {
    if (!data) return []
    return [
      {
        label: 'Courses',
        count: Number(data.coursesCount),
        icon: University,
      },
      {
        label: 'Subjects',
        count: Number(data.subjectsCount),
        icon: BookMarked,
      },
      {
        label: 'Students',
        count: Number(data.studentsCount),
        icon: Users,
      },
    ]
  }, [data])

  return { data, isLoading, entityCountsArr, courseStudentsCounts, courseSubjectsCounts }
}
