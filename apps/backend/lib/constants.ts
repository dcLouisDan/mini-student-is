export const DEFAULT_PER_PAGE_LIMIT = 20

export const USER_ROLES_ARR = ['admin', 'encoder', 'student'] as const
export type UserRole = (typeof USER_ROLES_ARR)[number]

export type SortOrder = 'asc' | 'desc'

export const SORT_ORDER_ARR: Array<SortOrder> = ['asc', 'desc']
