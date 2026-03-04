'use client'

import { TrendingUp } from 'lucide-react'
import { LabelList, Pie, PieChart } from 'recharts'

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

export const description = 'A pie chart with a label list'

export function CourseStudentsChart() {
  const { courseStudentsCounts } = useDashboard()

  const chartConfig = useMemo(() => {
    const map: Record<string, { label: string; color?: string }> = {
      studentsCount: {
        label: 'Students',
      },
    }

    courseStudentsCounts.forEach((item, index) => {
      map[item.code] = { label: item.code, color: `var(--chart-${(index % 5) + 1})` }
    })

    return map satisfies ChartConfig
  }, [courseStudentsCounts])
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Courses - Students</CardTitle>
        <CardDescription>Number of students per course</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-62.5 [&_.recharts-text]:fill-background"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent nameKey="studentsCount" hideLabel />} />
            <Pie data={courseStudentsCounts ?? []} dataKey="studentsCount" nameKey="code">
              <LabelList
                dataKey="code"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: string) => chartConfig[value]?.label}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
