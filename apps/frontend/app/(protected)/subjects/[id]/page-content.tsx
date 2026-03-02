'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { subjectQueryOptions } from '@/lib/query-options/subject-query-options'
import { useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export default function SubjectPageContent({ id }: { id: string }) {
  const { data: subject } = useQuery(subjectQueryOptions(id))
  const prerequisites = subject?.prerequisites ?? []
  return (
    <main className="flex flex-1 gap-4 p-4 pt-0">
      <aside className="w-full sm:max-w-sm flex flex-col gap-4">
        <Card size="sm">
          <CardHeader>
            <CardTitle>{subject?.code}</CardTitle>
            <CardDescription>
              {' '}
              {subject?.course?.name}
              <br />
              {subject?.title}
            </CardDescription>
          </CardHeader>
          <Separator />
          <CardContent>
            <Label>Preqrequisites:</Label>
            <div className="grid gap-2">
              {prerequisites.length === 0 ? (
                <div className="w-full text-center p-2 text-muted-foreground">No prerequisites</div>
              ) : (
                prerequisites.map((prereq) => (
                  <Link href={`/subjects/${prereq.id}`}>{prereq.title}</Link>
                ))
              )}
            </div>
          </CardContent>
          <CardFooter className="flex gap-2 items-center">
            <Button size="sm" className="w-full">
              <Plus /> Prerequisite Subject
            </Button>
          </CardFooter>
        </Card>
      </aside>
      <div></div>
    </main>
  )
}
