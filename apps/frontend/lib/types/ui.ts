export type SortOrderOption = 'asc' | 'desc'

export interface BaseParams {
  page?: number
  perPage?: number
  sortBy?: string
  sortOrder?: SortOrderOption
}

export interface Pagination {
  currentPage: number
  lastPage: number
  total: number
  perPage: number
}

export interface BreadcrumbItemType {
  title: string
  href: string
}
