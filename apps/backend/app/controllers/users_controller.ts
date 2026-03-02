import {
  indexUserValidator,
  showUserValidator,
  signupValidator,
  updateUserValidator,
} from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import { DEFAULT_PER_PAGE_LIMIT, SortOrder } from '../../lib/constants.ts'
import User from '#models/user'
import UserTransformer from '#transformers/user_transformer'
import { ModelAttributes } from '@adonisjs/lucid/types/model'
import { activity } from '@holoyan/adonisjs-activitylog'

export default class UsersController {
  /**
   * Display a list of resource
   */
  async index({ request, response, serialize, auth: { user: authUser } }: HttpContext) {
    if (!authUser) {
      return response.unauthorized()
    }

    if (authUser.role !== 'admin') {
      return response.unauthorized()
    }

    const {
      qs: { page, perPage, sortBy, sortOrder, fullName, role },
    } = await request.validateUsing(indexUserValidator)
    const filters = { role }
    const ilikeFilters = { fullName }
    let usersRaw = User.query()

    const sortColumn = sortBy ?? 'createdAt'
    const order: SortOrder = (sortOrder as SortOrder) ?? 'asc'

    Object.entries(filters).forEach(([key, value]) => {
      if (value) usersRaw.where(key, value)
    })

    Object.entries(ilikeFilters).forEach(([key, value]) => {
      if (value) usersRaw.orWhereILike(key, `%${value}%`)
    })

    usersRaw = usersRaw.orderBy(sortColumn, order)

    const users = await usersRaw.paginate(page ?? 1, perPage ?? DEFAULT_PER_PAGE_LIMIT)

    const data = users.all()
    const metadata = users.getMeta()

    return serialize(UserTransformer.paginate(data, metadata))
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request, serialize, response, auth: { user: authUser } }: HttpContext) {
    if (!authUser) {
      return response.unauthorized()
    }

    if (authUser.role !== 'admin') {
      return response.unauthorized()
    }

    const { fullName, email, password, role } = await request.validateUsing(signupValidator)

    const user = await User.create({ fullName, email, passwordHash: password, role })

    await activity().by(authUser).making('create').on(user).log('User successfully created')

    return serialize(UserTransformer.transform(user))
  }

  /**
   * Show individual record
   */
  async show({ request, serialize }: HttpContext) {
    const {
      params: { id },
    } = await request.validateUsing(showUserValidator)

    const user = await User.findOrFail(id)

    return serialize(UserTransformer.transform(user))
  }

  /**
   * Edit individual record
   */
  async edit({}: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ request, serialize, response, auth: { user: authUser } }: HttpContext) {
    if (!authUser) {
      return response.unauthorized()
    }

    if (authUser.role !== 'admin') {
      return response.unauthorized()
    }

    const {
      fullName,
      email,
      password,
      role,
      params: { id },
    } = await request.validateUsing(updateUserValidator)

    const user = await User.findOrFail(id)
    const updateData: Partial<ModelAttributes<User>> = {
      fullName,
      email,
      role,
    }

    if (password) {
      updateData.passwordHash = password
    }

    await user.merge(updateData).save()

    await activity().by(authUser).making('update').on(user).log('User successfully updated')

    return serialize(UserTransformer.transform(user))
  }

  /**
   * Delete record
   */
  async destroy({ request, response, auth: { user: authUser } }: HttpContext) {
    if (!authUser) {
      return response.unauthorized()
    }

    if (authUser.role !== 'admin') {
      return response.unauthorized()
    }

    const {
      params: { id },
    } = await request.validateUsing(showUserValidator)

    const user = await User.findOrFail(id)

    await user.delete()

    await activity().by(authUser).making('delete').on(user).log('User successfully deleted')

    return response.status(200).send({ success: true, message: 'User deleted' })
  }
}
