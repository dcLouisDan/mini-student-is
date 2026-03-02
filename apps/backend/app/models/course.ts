import { CourseSchema } from '#database/schema'
import { hasMany } from '@adonisjs/lucid/orm'
import Subject from './subject.ts'
import { type HasMany } from '@adonisjs/lucid/types/relations'
import Student from './student.ts'
import Grade from './grade.ts'
import { MorphMap } from '@holoyan/adonisjs-activitylog'
import { LogModelInterface } from '@holoyan/adonisjs-activitylog/types'

@MorphMap('courses')
export default class Course extends CourseSchema implements LogModelInterface {
  getModelId(): string {
    return String(this.id)
  }

  @hasMany(() => Subject)
  declare subjects: HasMany<typeof Subject>

  @hasMany(() => Student)
  declare students: HasMany<typeof Student>

  @hasMany(() => Grade)
  declare grades: HasMany<typeof Grade>

  toLog() {
    return {
      id: this.id,
      code: this.code,
      name: this.name,
      description: this.description,
    }
  }
}
