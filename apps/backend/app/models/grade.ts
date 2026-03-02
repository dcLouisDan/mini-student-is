import { GradeSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import Student from './student.ts'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Course from './course.ts'
import Subject from './subject.ts'
import User from './user.ts'
import { MorphMap } from '@holoyan/adonisjs-activitylog'
import { LogModelInterface } from '@holoyan/adonisjs-activitylog/types'

@MorphMap('grades')
export default class Grade extends GradeSchema implements LogModelInterface {
  getModelId(): string {
    return String(this.id)
  }

  @belongsTo(() => Student)
  declare student: BelongsTo<typeof Student>

  @belongsTo(() => Subject)
  declare subject: BelongsTo<typeof Subject>

  @belongsTo(() => Course)
  declare course: BelongsTo<typeof Course>

  @belongsTo(() => User, {
    foreignKey: 'encodedByUserId',
    localKey: 'id',
  })
  declare encodedByUser: BelongsTo<typeof User>

  toLog() {
    return {
      id: this.id,
      studentId: this.studentId,
      courseId: this.courseId,
      subjectId: this.subjectId,
      prelim: this.prelim,
      midterm: this.midterm,
      finals: this.finals,
      finalGrade: this.finalGrade,
      remarks: this.remarks,
      encodedByUserId: this.encodedByUserId,
    }
  }
}
