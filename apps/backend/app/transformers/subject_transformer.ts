import { BaseTransformer } from '@adonisjs/core/transformers'
import Subject from '#models/subject'
import CourseTransformer from './course_transformer.ts'

export default class SubjectTransformer extends BaseTransformer<Subject> {
  toObject() {
    return {
      ...this.pick(this.resource, ['id', 'courseId', 'code', 'title', 'units', 'passingGrade']),
      course: CourseTransformer.transform(this.whenLoaded(this.resource.course)),
    }
  }

  withExtras() {
    return {
      ...this.pick(this.resource, ['id', 'courseId', 'code', 'title', 'units']),
      course: CourseTransformer.transform(this.whenLoaded(this.resource.course)),
      reservationStatus: this.resource.$extras.pivot_status
        ? (this.resource.$extras.pivot_status as String)
        : undefined,
      reservedAt: this.resource.$extras.pivot_reserved_at
        ? (this.resource.$extras.pivot_status as String)
        : undefined,
    }
  }
}
