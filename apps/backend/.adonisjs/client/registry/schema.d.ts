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
  'users.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/users'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/user').indexUserValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/users_controller').default['index']>>>
    }
  }
  'users.store': {
    methods: ["POST"]
    pattern: '/api/v1/users'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').signupValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').signupValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/users_controller').default['store']>>>
    }
  }
  'users.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/users/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/user').showUserValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/users_controller').default['show']>>>
    }
  }
  'users.update': {
    methods: ["PUT","PATCH"]
    pattern: '/api/v1/users/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').updateUserValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/user').updateUserValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/users_controller').default['update']>>>
    }
  }
  'users.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/users/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').showUserValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/user').showUserValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/users_controller').default['destroy']>>>
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
      body: ExtractBody<InferInput<(typeof import('#validators/subject').showSubjectPrerequisiteValidator)>>
      paramsTuple: [ParamValue, ParamValue]
      params: { id: ParamValue; prerequisiteSubjectId: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/subject').showSubjectPrerequisiteValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/subject_prerequisites_controller').default['destroy']>>>
    }
  }
  'students.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/students'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/student').indexStudentValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/students_controller').default['index']>>>
    }
  }
  'students.store': {
    methods: ["POST"]
    pattern: '/api/v1/students'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/student').createStudentValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/student').createStudentValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/students_controller').default['store']>>>
    }
  }
  'students.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/students/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/student').showStudentValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/students_controller').default['show']>>>
    }
  }
  'students.update': {
    methods: ["PUT","PATCH"]
    pattern: '/api/v1/students/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/student').updateStudentValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/student').updateStudentValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/students_controller').default['update']>>>
    }
  }
  'students.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/students/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/student').showStudentValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/student').showStudentValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/students_controller').default['destroy']>>>
    }
  }
  'subject_reservations.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/students/:id/reservations'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/student').showStudentValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/subject_reservations_controller').default['index']>>>
    }
  }
  'subject_reservations.store': {
    methods: ["POST"]
    pattern: '/api/v1/students/:id/reservations'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/student').attachStudentReservationValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/student').attachStudentReservationValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/subject_reservations_controller').default['store']>>>
    }
  }
  'subject_reservations.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/students/:id/reservations/:subjectId'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/student').showStudentReservationValidator)>>
      paramsTuple: [ParamValue, ParamValue]
      params: { id: ParamValue; subjectId: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/student').showStudentReservationValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/subject_reservations_controller').default['destroy']>>>
    }
  }
  'subject_reservations.cancel': {
    methods: ["POST"]
    pattern: '/api/v1/students/:id/reservations/:subjectId/cancel'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/student').showStudentReservationValidator)>>
      paramsTuple: [ParamValue, ParamValue]
      params: { id: ParamValue; subjectId: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/student').showStudentReservationValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/subject_reservations_controller').default['cancel']>>>
    }
  }
  'grades.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/grades'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/grade').indexGradeValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/grades_controller').default['index']>>>
    }
  }
  'grades.store': {
    methods: ["POST"]
    pattern: '/api/v1/grades'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/grade').groupUpsertGradeValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/grade').groupUpsertGradeValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/grades_controller').default['store']>>>
    }
  }
  'grades.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/grades/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/grades_controller').default['show']>>>
    }
  }
  'grades.update': {
    methods: ["PUT","PATCH"]
    pattern: '/api/v1/grades/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/grade').upsertGradeValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/grade').upsertGradeValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/grades_controller').default['update']>>>
    }
  }
  'grades.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/grades/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/grades_controller').default['destroy']>>>
    }
  }
}
