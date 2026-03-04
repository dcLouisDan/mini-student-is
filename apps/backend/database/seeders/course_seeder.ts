import Course from '#models/course'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const data = [
      {
        name: 'Bachelor of Science in Information Technology',
        code: 'BSIT',
        description:
          'A program focused on software development, networking, database systems, and modern web technologies. Prepares students for careers in full-stack development, systems administration, and IT infrastructure.',
      },
      {
        name: 'Bachelor of Science in Computer Science',
        code: 'BSCS',
        description:
          'Covers algorithms, data structures, artificial intelligence, software engineering, and systems architecture. Designed for students aiming for advanced technical roles or research-oriented careers.',
      },
      {
        name: 'Bachelor of Science in Business Administration',
        code: 'BSBA',
        description:
          'Provides foundation in management, marketing, finance, and operations. Equips students with practical skills for entrepreneurship and corporate leadership.',
      },
      {
        name: 'Bachelor of Science in Accountancy',
        code: 'BSA',
        description:
          'Focuses on financial accounting, auditing, taxation, and regulatory compliance. Prepares students for careers in public accounting and corporate finance.',
      },
      {
        name: 'Bachelor of Science in Education',
        code: 'BSED',
        description:
          'Prepares future educators with training in curriculum development, classroom management, and instructional strategies for secondary education.',
      },
    ]

    await Course.updateOrCreateMany('code', data)
  }
}
