import Course from '#models/course'
import Subject from '#models/subject'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const courses = await Course.all()
    const courseIds: string[] = courses.map((course) => course.id)

    const data = [
      { code: 'IT101', title: 'Introduction to Computing', units: 3 },
      { code: 'IT102', title: 'Computer Programming 1', units: 3 },
      { code: 'IT201', title: 'Data Structures and Algorithms', units: 3 },
      { code: 'IT202', title: 'Database Management Systems', units: 3 },
      { code: 'IT203', title: 'Web Systems and Technologies', units: 3 },

      { code: 'CS101', title: 'Discrete Mathematics', units: 3 },
      { code: 'CS201', title: 'Operating Systems', units: 3 },
      { code: 'CS202', title: 'Software Engineering', units: 3 },

      { code: 'BA101', title: 'Principles of Management', units: 3 },
      { code: 'BA201', title: 'Marketing Management', units: 3 },
      { code: 'BA202', title: 'Financial Management', units: 3 },

      { code: 'AC101', title: 'Fundamentals of Accounting', units: 3 },
      { code: 'AC201', title: 'Cost Accounting', units: 3 },

      { code: 'ED101', title: 'Foundations of Education', units: 3 },
      { code: 'ED201', title: 'Assessment of Learning', units: 3 },
    ].map((subject, index) => ({
      ...subject,
      courseId: courseIds[index % courseIds.length],
    }))
    const subjects = await Subject.updateOrCreateMany('code', data)

    const prerequisiteMap: Record<string, string[]> = {
      IT201: ['IT102'],
      IT202: ['IT102'],
      IT203: ['IT102'],
      CS201: ['CS101'],
      CS202: ['CS201'],
      BA201: ['BA101'],
      BA202: ['BA101'],
      AC201: ['AC101'],
      ED201: ['ED101'],
    }

    const subjectByCode = new Map(subjects.map((subject) => [subject.code, subject]))

    for (const [subjectCode, prereqCodes] of Object.entries(prerequisiteMap)) {
      const subject = subjectByCode.get(subjectCode)
      if (!subject) continue

      const prereqIds = prereqCodes
        .map((code) => subjectByCode.get(code)?.id)
        .filter(Boolean) as string[]

      await subject.related('prerequisites').sync(prereqIds)
    }
  }
}
