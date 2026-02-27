import { SubjectSchema } from '#database/schema'
import { belongsTo, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import Course from './course.ts'
import type { ManyToMany, BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Student from './student.ts'
import Grade from './grade.ts'

export default class Subject extends SubjectSchema {
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
}
