/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'auth.new_account.store': {
    methods: ["POST"]
    pattern: '/api/v1/auth/signup'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').signupValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').signupValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['store']>>>
    }
  }
  'auth.session.store': {
    methods: ["POST"]
    pattern: '/api/v1/auth/login'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').loginValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').loginValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/session_controller').default['store']>>>
    }
  }
  'auth.session.destroy': {
    methods: ["POST"]
    pattern: '/api/v1/auth/logout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/session_controller').default['destroy']>>>
    }
  }
  'auth.profile.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/auth/me'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/profile_controller').default['show']>>>
    }
  }
  'profile.profile.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/account/profile'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/profile_controller').default['show']>>>
    }
  }
  'courses.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/courses'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/course').indexCourseValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/courses_controller').default['index']>>>
    }
  }
  'courses.store': {
    methods: ["POST"]
    pattern: '/api/v1/courses'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/course').createCourseValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/course').createCourseValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/courses_controller').default['store']>>>
    }
  }
  'courses.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/courses/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/course').showCourseValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/courses_controller').default['show']>>>
    }
  }
  'courses.update': {
    methods: ["PUT","PATCH"]
    pattern: '/api/v1/courses/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/course').updateCourseValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/course').updateCourseValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/courses_controller').default['update']>>>
    }
  }
  'courses.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/courses/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/course').showCourseValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/course').showCourseValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/courses_controller').default['destroy']>>>
    }
  }
  'subjects.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/subjects'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/subject').indexSubjectValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/subjects_controller').default['index']>>>
    }
  }
  'subjects.store': {
    methods: ["POST"]
    pattern: '/api/v1/subjects'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/subject').createSubjectValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/subject').createSubjectValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/subjects_controller').default['store']>>>
    }
  }
  'subjects.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/subjects/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/subject').showSubjectValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/subjects_controller').default['show']>>>
    }
  }
  'subjects.update': {
    methods: ["PUT","PATCH"]
    pattern: '/api/v1/subjects/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/subject').updateSubjectValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/subject').updateSubjectValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/subjects_controller').default['update']>>>
    }
  }
  'subjects.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/subjects/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/subject').showSubjectValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/subject').showSubjectValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/subjects_controller').default['destroy']>>>
    }
  }
  'subject_prerequisites.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/subjects/:id/prerequisites'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/subject').showSubjectValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/subject_prerequisites_controller').default['index']>>>
    }
  }
  'subject_prerequisites.store': {
    methods: ["POST"]
    pattern: '/api/v1/subjects/:id/prerequisites'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/subject').attachSubjectPrerequisiteValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/subject').attachSubjectPrerequisiteValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/subject_prerequisites_controller').default['store']>>>
    }
  }
  'subject_prerequisites.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/subjects/:id/prerequisites/:prerequisiteSubjectId'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/subject').attachSubjectPrerequisiteValidator)>>
      paramsTuple: [ParamValue, ParamValue]
      params: { id: ParamValue; prerequisiteSubjectId: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/subject').attachSubjectPrerequisiteValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/subject_prerequisites_controller').default['destroy']>>>
    }
  }
}
