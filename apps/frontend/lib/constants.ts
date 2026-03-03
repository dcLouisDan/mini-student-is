import { stringArrToBasicSelectItems } from '@/components/basic-select'

export const PER_PAGE_DEFAULT = 20

export const USER_ROLES_ARR = ['admin', 'encoder'] as const
export const USER_ROLES_OPTIONS = stringArrToBasicSelectItems(Array.from(USER_ROLES_ARR))
export type UserRole = (typeof USER_ROLES_ARR)[number]
