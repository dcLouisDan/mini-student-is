import { SubjectSchema } from '#database/schema'
import { belongsTo, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import Course from './course.ts'
import type { ManyToMany, BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Student from './student.ts'
import Grade from './grade.ts'
import { MorphMap } from '@holoyan/adonisjs-activitylog'
import { LogModelInterface } from '@holoyan/adonisjs-activitylog/types'

@MorphMap('courses')
export default class Subject extends SubjectSchema implements LogModelInterface {
  getModelId(): string {
    return String(this.id)
  }

  @belongsTo(() => Course)
  declare course: BelongsTo<typeof Course>

  @hasMany(() => Grade)
  declare grades: HasMany<typeof Grade>

  @manyToMany(() => Subject, {
    localKey: 'id',
    pivotForeignKey: 'subjectId',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'prerequisiteSubjectId',
    pivotTable: 'subjectPrerequisites',
    pivotTimestamps: true,
  })
  declare prerequisites: ManyToMany<typeof Subject>

  @manyToMany(() => Subject, {
    localKey: 'id',
    pivotForeignKey: 'prerequisiteSubjectId',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'subjectId',
    pivotTable: 'subjectPrerequisites',
    pivotTimestamps: true,
  })
  declare prerequisiteTo: ManyToMany<typeof Subject>

  @manyToMany(() => Student, {
    localKey: 'id',
    pivotForeignKey: 'subjectId',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'studentId',
    pivotTable: 'subjectReservations',
    pivotColumns: ['status'],
    pivotTimestamps: {
      createdAt: 'reserved_at',
      updatedAt: false,
    },
  })
  declare students: ManyToMany<typeof Student>

  toLog() {
    return {
      id: this.id,
      courseId: this.courseId,
      code: this.code,
      title: this.title,
      units: this.units,
    }
  }
}
