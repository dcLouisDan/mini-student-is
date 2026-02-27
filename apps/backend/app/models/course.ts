import { CourseSchema } from '#database/schema'
import { hasMany } from '@adonisjs/lucid/orm'
import Subject from './subject.ts'
import { type HasMany } from '@adonisjs/lucid/types/relations'
import Student from './student.ts'
import Grade from './grade.ts'

export default class Course extends CourseSchema {
  @hasMany(() => Subject)
  declare subjects: HasMany<typeof Subject>

  @hasMany(() => Student)
  declare students: HasMany<typeof Student>

  @hasMany(() => Grade)
  declare grades: HasMany<typeof Grade>
}
