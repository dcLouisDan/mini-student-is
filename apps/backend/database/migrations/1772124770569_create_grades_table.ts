import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'grades'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.raw('uuid_generate_v4()'))
      table
        .uuid('student_id')
        .notNullable()
        .references('id')
        .inTable('students')
        .onDelete('CASCADE')
      table
        .uuid('subject_id')
        .notNullable()
        .references('id')
        .inTable('subjects')
        .onDelete('CASCADE')
      table.uuid('course_id').notNullable().references('id').inTable('courses').onDelete('CASCADE')
      table.float('prelim').defaultTo(0)
      table.float('midterm').defaultTo(0)
      table.float('finals').defaultTo(0)
      table.float('final_grade').defaultTo(0)
      table.text('remarks').defaultTo('')
      table
        .uuid('encoded_by_user_id')
        .nullable()
        .references('id')
        .inTable('users')
        .onDelete('SET NULL')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
