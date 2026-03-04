'use client'

import { TrendingUp } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import useDashboard from '@/hooks/useDashboard'
import { useMemo } from 'react'

export const description = 'A bar chart'

export function CourseSubjectsChart() {
  const { courseSubjectsCounts } = useDashboard()

  const chartConfig = useMemo(() => {
    const map: Record<string, { label: string; color?: string }> = {
      subjectsCount: {
        label: 'Subjects',
      },
    }

    courseSubjectsCounts.forEach((item, index) => {
      map[item.code] = { label: item.code, color: `var(--chart-${(index % 5) + 1})` }
    })

    return map satisfies ChartConfig
  }, [courseSubjectsCounts])
  return (
    <Card>
      <CardHeader>
        <CardTitle>Courses - Subjects</CardTitle>
        <CardDescription>Number of subjects per course</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={courseSubjectsCounts}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="code"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="subjectsCount" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
