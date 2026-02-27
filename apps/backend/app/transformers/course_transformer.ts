import { BaseTransformer } from '@adonisjs/core/transformers'
import Course from '#models/course'

export default class CourseTransformer extends BaseTransformer<Course> {
  toObject() {
    return this.pick(this.resource, ['id', 'code', 'name', 'description'])
  }
}
