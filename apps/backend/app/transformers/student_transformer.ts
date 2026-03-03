import { BaseTransformer } from '@adonisjs/core/transformers'
import Student from '#models/student'
import CourseTransformer from './course_transformer.ts'
import SubjectTransformer from './subject_transformer.ts'

export default class StudentTransformer extends BaseTransformer<Student> {
  toObject() {
    return {
      ...this.pick(this.resource, [
        'id',
        'studentNo',
        'firstName',
        'lastName',
        'email',
        'birthDate',
        'courseId',
        'createdAt',
      ]),
      course: CourseTransformer.transform(this.whenLoaded(this.resource.course)),
      reservedSubjects: SubjectTransformer.transform(
        this.whenLoaded(this.resource.reservedSubjects)
      )?.useVariant('withExtras'),
    }
  }
}
