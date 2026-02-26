import User from '#models/user'
import { signupValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class NewAccountController {
  async store({ request, response }: HttpContext) {
    const { fullName, email, password, role } = await request.validateUsing(signupValidator)

    await User.create({ fullName, email, passwordHash: password, role })

    return response.ok({ success: true, message: 'Login successfull' })
  }
}
