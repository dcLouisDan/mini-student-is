import vine from '@vinejs/vine'

export const indexCourseValidator = vine.create({
  qs: vine.object({
    page: vine.number().nonNegative().withoutDecimals().optional(),
    perPage: vine.number().nonNegative().withoutDecimals().optional(),
  }),
})

const courseValidatorBase = {
  code: vine.string(),
  name: vine.string(),
  description: vine.string(),
}

export const createCourseValidator = vine.create(courseValidatorBase)

export const updateCourseValidator = vine.create({
  ...courseValidatorBase,
  params: vine.object({
    id: vine.string(),
  }),
})

export const showCourseValidator = vine.create({
  params: vine.object({
    id: vine.string(),
  }),
})
