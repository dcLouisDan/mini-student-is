import { UserSchema } from '#database/schema'
import vine from '@vinejs/vine'
import { SORT_ORDER_ARR, USER_ROLES_ARR } from '../../lib/constants.ts'
import { existsRule } from './rules/exists.ts'

/**
 * Shared rules for email and password.
 */
const email = () => vine.string().email().maxLength(254)
const password = () => vine.string().minLength(8).maxLength(32)
const role = () => vine.string().in(Array.from(USER_ROLES_ARR))

/**
 * Validator to use when performing self-signup
 */
export const signupValidator = vine.create({
  fullName: vine.string().nullable(),
  email: email().unique({ table: 'users', column: 'email' }),
  role: role(),
  password: password(),
  passwordConfirmation: password().sameAs('password'),
})

/**
 * Validator to use before validating user credentials
 * during login
 */
export const loginValidator = vine.create({
  email: email(),
  password: vine.string(),
})

const SORTABLE_COLUMNS: Array<(typeof UserSchema.$columns)[number]> = [
  'createdAt',
  'fullName',
  'role',
]

export const indexUserValidator = vine.create({
  qs: vine.object({
    page: vine.number().nonNegative().withoutDecimals().optional(),
    perPage: vine.number().nonNegative().withoutDecimals().optional(),
    sortBy: vine.string().in(SORTABLE_COLUMNS).optional(),
    sortOrder: vine.string().in(SORT_ORDER_ARR).optional(),
    fullName: vine.string().optional(),
    role: role().optional(),
  }),
})

export const showUserValidator = vine.create({
  params: vine.object({
    id: vine.string(),
  }),
})

export const updateUserValidator = vine.create({
  fullName: vine.string().nullable(),
  email: email(),
  role: role(),
  password: password().optional(),
  passwordConfirmation: password().sameAs('password').optional(),

  params: vine.object({
    id: vine.string(),
  }),
})

export const batchUsersDeleteValidator = vine.create({
  idArr: vine.array(vine.string().use(existsRule({ table: 'users', column: 'id' }))),
})

export const createUserValidator = vine.create({
  fullName: vine.string().nullable(),
  email: email().unique({ table: 'users', column: 'email' }),
  role: role(),
  password: password().optional(),
  passwordConfirmation: password().sameAs('password').optional(),
})
