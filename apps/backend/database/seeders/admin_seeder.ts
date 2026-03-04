import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await User.create({
      fullName: 'Admin',
      email: 'admin@email.com',
      role: 'admin',
      passwordHash: 'password',
    })
  }
}
