import Subject from '#models/subject'

export class SubjectService {
  async validateSubjects(
    subjectIds: string[],
    studentCourseId: string,
    studentId: string
  ): Promise<{ valid: boolean; invalidIds: Array<{ id: string; message: string }> }> {
    const subjects = await Subject.query().preload('prerequisites').whereIn('id', subjectIds)
    const invalidIds: Array<{ id: string; message: string }> = []
    const passedSubjectIds = await this.getPassSubjectsIdArr(studentId)

    if (subjects.length !== subjectIds.length) {
      return { valid: false, invalidIds: [] }
    }

    for (const subject of subjects) {
      if (subject.courseId !== studentCourseId) {
        invalidIds.push({ id: subject.id, message: 'Unrelated course' })
        continue
      }

      const unmetPrereq = subject.prerequisites.some(
        (prereq) => !passedSubjectIds.includes(prereq.id)
      )

      if (unmetPrereq) {
        invalidIds.push({ id: subject.id, message: 'Unmet prerequisites' })
      }
    }

    return { valid: invalidIds.length == 0, invalidIds }
  }

  async getPassedSubjects(studentId: string) {
    return await Subject.query()
      .innerJoin('grades', (query) => {
        query.on((subquery) => {
          subquery
            .on('subjects.id', '=', 'grades.subject_id')
            .andOnVal('grades.student_id', '=', studentId)
        })
      })
      .select('subjects.*')
      .where('grades.final_grade', '>=', 'subjects.passing_grade')
  }

  async getPassSubjectsIdArr(studentId: string) {
    const subjects = await this.getPassedSubjects(studentId)

    return subjects.map((subject) => subject.id)
  }
}
