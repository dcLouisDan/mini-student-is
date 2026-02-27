import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'subjects'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.float('passing_grade').notNullable().defaultTo(75)
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('passing_grade')
    })
  }
}
