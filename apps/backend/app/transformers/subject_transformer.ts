import { BaseTransformer } from '@adonisjs/core/transformers'
import Subject from '#models/subject'
import CourseTransformer from './course_transformer.ts'

export default class SubjectTransformer extends BaseTransformer<Subject> {
  toObject() {
    return {
      ...this.pick(this.resource, ['id', 'courseId', 'code', 'title', 'units']),
      course: CourseTransformer.transform(this.resource.course),
    }
  }
}
