import { StudentSchema } from '#database/schema'
import { belongsTo, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import Course from './course.ts'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Grade from './grade.ts'
import Subject from './subject.ts'

export default class Student extends StudentSchema {
  @belongsTo(() => Course)
  declare course: BelongsTo<typeof Course>

  @hasMany(() => Grade)
  declare grades: HasMany<typeof Grade>

  @manyToMany(() => Subject, {
    localKey: 'id',
    pivotForeignKey: 'studentId',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'subjectId',
    pivotTable: 'subjectReservations',
    pivotColumns: ['reservedAt', 'status'],
  })
  declare reservedSubjects: ManyToMany<typeof Subject>
}
