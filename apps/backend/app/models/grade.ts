import { GradeSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import Student from './student.ts'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Course from './course.ts'
import Subject from './subject.ts'
import User from './user.ts'

export default class Grade extends GradeSchema {
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
}
