import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'caches'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('key').primary()
      table.jsonb('value')
      table.timestamp('expires_at').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
