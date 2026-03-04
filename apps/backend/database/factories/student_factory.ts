import factory from '@adonisjs/lucid/factories'
import Student from '#models/student'
import { DateTime } from 'luxon'
import Course from '#models/course'

export const StudentFactory = factory
  .define(Student, async ({ faker }) => {
    const courses = await Course.all()
    const courseIds: string[] = courses.map((course) => course.id)

    const randomCourseId = courseIds[Math.floor(Math.random() * courseIds.length)]

    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const year = new Date().getFullYear()
    const studentNumber = `${year}-${faker.number
      .int({ min: 1, max: 9999 })
      .toString()
      .padStart(4, '0')}`
    return {
      firstName,
      lastName,
      email: faker.internet.email({ firstName, lastName }).toLowerCase(),
      birthDate: DateTime.fromJSDate(faker.date.birthdate({ min: 18, max: 25, mode: 'age' })),
      courseId: randomCourseId,
      studentNo: studentNumber,
    }
  })
  .build()
