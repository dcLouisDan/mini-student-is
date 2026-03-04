import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class DashboardController {
  async index({ response }: HttpContext) {
    const coursesCount = await this.getTableCount('courses')
    const subjectsCount = await this.getTableCount('subjects')
    const studentsCount = await this.getTableCount('students')
    const usersCount = await this.getTableCount('users')

    const studentsCountByCourse = await this.getEntityCountByRelation(
      'courses',
      'course',
      'students',
      ['courses.code']
    )

    const subjectsCountByCourse = await this.getEntityCountByRelation(
      'courses',
      'course',
      'subjects',
      ['courses.code']
    )

    return response.ok({
      coursesCount,
      subjectsCount,
      studentsCount,
      usersCount,
      studentsCountByCourse,
      subjectsCountByCourse,
    })
  }

  private async getTableCount(table: string) {
    const rows = await db.from(table).count('* as total')

    return rows[0].total as number
  }

  private async getEntityCountByRelation(
    primaryTable: string,
    primaryEntity: string,
    relatedTable: string,
    additionalSelect?: string[]
  ) {
    const selectString = additionalSelect
      ? [`${primaryTable}.id`, ...additionalSelect]
      : [`${primaryTable}.id`]

    return await db
      .from(primaryTable)
      .leftJoin(relatedTable, `${primaryTable}.id`, '=', `${relatedTable}.${primaryEntity}_id`)
      .select(selectString)
      .count(`${relatedTable}.id as ${relatedTable}Count`)
      .groupBy(`${primaryTable}.id`)
      .orderBy(`${relatedTable}Count`, 'desc')
  }
}
