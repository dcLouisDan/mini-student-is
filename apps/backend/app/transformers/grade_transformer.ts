import { BaseTransformer } from '@adonisjs/core/transformers'
import Grade from '#models/grade'
import StudentTransformer from './student_transformer.ts'
import CourseTransformer from './course_transformer.ts'
import SubjectTransformer from './subject_transformer.ts'
import UserTransformer from './user_transformer.ts'

export default class GradeTransformer extends BaseTransformer<Grade> {
  toObject() {
    return {
      ...this.pick(this.resource, ['id', 'prelim', 'midterm', 'finals', 'finalGrade', 'remarks']),
      student: StudentTransformer.transform(this.resource.student),
      course: CourseTransformer.transform(this.resource.course),
      subject: SubjectTransformer.transform(this.resource.subject),
      encodedBy: UserTransformer.transform(this.resource.encodedByUser),
    }
  }
}
