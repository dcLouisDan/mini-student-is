/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'auth.new_account.store': {
    methods: ["POST"],
    pattern: '/api/v1/auth/signup',
    tokens: [{"old":"/api/v1/auth/signup","type":0,"val":"api","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['auth.new_account.store']['types'],
  },
  'auth.session.store': {
    methods: ["POST"],
    pattern: '/api/v1/auth/login',
    tokens: [{"old":"/api/v1/auth/login","type":0,"val":"api","end":""},{"old":"/api/v1/auth/login","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/login","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.session.store']['types'],
  },
  'auth.session.destroy': {
    methods: ["POST"],
    pattern: '/api/v1/auth/logout',
    tokens: [{"old":"/api/v1/auth/logout","type":0,"val":"api","end":""},{"old":"/api/v1/auth/logout","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/logout","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['auth.session.destroy']['types'],
  },
  'auth.profile.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/auth/me',
    tokens: [{"old":"/api/v1/auth/me","type":0,"val":"api","end":""},{"old":"/api/v1/auth/me","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/me","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/me","type":0,"val":"me","end":""}],
    types: placeholder as Registry['auth.profile.show']['types'],
  },
  'profile.profile.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/account/profile',
    tokens: [{"old":"/api/v1/account/profile","type":0,"val":"api","end":""},{"old":"/api/v1/account/profile","type":0,"val":"v1","end":""},{"old":"/api/v1/account/profile","type":0,"val":"account","end":""},{"old":"/api/v1/account/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['profile.profile.show']['types'],
  },
  'courses.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/courses',
    tokens: [{"old":"/api/v1/courses","type":0,"val":"api","end":""},{"old":"/api/v1/courses","type":0,"val":"v1","end":""},{"old":"/api/v1/courses","type":0,"val":"courses","end":""}],
    types: placeholder as Registry['courses.index']['types'],
  },
  'courses.store': {
    methods: ["POST"],
    pattern: '/api/v1/courses',
    tokens: [{"old":"/api/v1/courses","type":0,"val":"api","end":""},{"old":"/api/v1/courses","type":0,"val":"v1","end":""},{"old":"/api/v1/courses","type":0,"val":"courses","end":""}],
    types: placeholder as Registry['courses.store']['types'],
  },
  'courses.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/courses/:id',
    tokens: [{"old":"/api/v1/courses/:id","type":0,"val":"api","end":""},{"old":"/api/v1/courses/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/courses/:id","type":0,"val":"courses","end":""},{"old":"/api/v1/courses/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['courses.show']['types'],
  },
  'courses.update': {
    methods: ["PUT","PATCH"],
    pattern: '/api/v1/courses/:id',
    tokens: [{"old":"/api/v1/courses/:id","type":0,"val":"api","end":""},{"old":"/api/v1/courses/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/courses/:id","type":0,"val":"courses","end":""},{"old":"/api/v1/courses/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['courses.update']['types'],
  },
  'courses.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/courses/:id',
    tokens: [{"old":"/api/v1/courses/:id","type":0,"val":"api","end":""},{"old":"/api/v1/courses/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/courses/:id","type":0,"val":"courses","end":""},{"old":"/api/v1/courses/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['courses.destroy']['types'],
  },
  'subjects.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/subjects',
    tokens: [{"old":"/api/v1/subjects","type":0,"val":"api","end":""},{"old":"/api/v1/subjects","type":0,"val":"v1","end":""},{"old":"/api/v1/subjects","type":0,"val":"subjects","end":""}],
    types: placeholder as Registry['subjects.index']['types'],
  },
  'subjects.store': {
    methods: ["POST"],
    pattern: '/api/v1/subjects',
    tokens: [{"old":"/api/v1/subjects","type":0,"val":"api","end":""},{"old":"/api/v1/subjects","type":0,"val":"v1","end":""},{"old":"/api/v1/subjects","type":0,"val":"subjects","end":""}],
    types: placeholder as Registry['subjects.store']['types'],
  },
  'subjects.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/subjects/:id',
    tokens: [{"old":"/api/v1/subjects/:id","type":0,"val":"api","end":""},{"old":"/api/v1/subjects/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/subjects/:id","type":0,"val":"subjects","end":""},{"old":"/api/v1/subjects/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['subjects.show']['types'],
  },
  'subjects.update': {
    methods: ["PUT","PATCH"],
    pattern: '/api/v1/subjects/:id',
    tokens: [{"old":"/api/v1/subjects/:id","type":0,"val":"api","end":""},{"old":"/api/v1/subjects/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/subjects/:id","type":0,"val":"subjects","end":""},{"old":"/api/v1/subjects/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['subjects.update']['types'],
  },
  'subjects.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/subjects/:id',
    tokens: [{"old":"/api/v1/subjects/:id","type":0,"val":"api","end":""},{"old":"/api/v1/subjects/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/subjects/:id","type":0,"val":"subjects","end":""},{"old":"/api/v1/subjects/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['subjects.destroy']['types'],
  },
  'subject_prerequisites.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/subjects/:id/prerequisites',
    tokens: [{"old":"/api/v1/subjects/:id/prerequisites","type":0,"val":"api","end":""},{"old":"/api/v1/subjects/:id/prerequisites","type":0,"val":"v1","end":""},{"old":"/api/v1/subjects/:id/prerequisites","type":0,"val":"subjects","end":""},{"old":"/api/v1/subjects/:id/prerequisites","type":1,"val":"id","end":""},{"old":"/api/v1/subjects/:id/prerequisites","type":0,"val":"prerequisites","end":""}],
    types: placeholder as Registry['subject_prerequisites.index']['types'],
  },
  'subject_prerequisites.store': {
    methods: ["POST"],
    pattern: '/api/v1/subjects/:id/prerequisites',
    tokens: [{"old":"/api/v1/subjects/:id/prerequisites","type":0,"val":"api","end":""},{"old":"/api/v1/subjects/:id/prerequisites","type":0,"val":"v1","end":""},{"old":"/api/v1/subjects/:id/prerequisites","type":0,"val":"subjects","end":""},{"old":"/api/v1/subjects/:id/prerequisites","type":1,"val":"id","end":""},{"old":"/api/v1/subjects/:id/prerequisites","type":0,"val":"prerequisites","end":""}],
    types: placeholder as Registry['subject_prerequisites.store']['types'],
  },
  'subject_prerequisites.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/subjects/:id/prerequisites/:prerequisiteSubjectId',
    tokens: [{"old":"/api/v1/subjects/:id/prerequisites/:prerequisiteSubjectId","type":0,"val":"api","end":""},{"old":"/api/v1/subjects/:id/prerequisites/:prerequisiteSubjectId","type":0,"val":"v1","end":""},{"old":"/api/v1/subjects/:id/prerequisites/:prerequisiteSubjectId","type":0,"val":"subjects","end":""},{"old":"/api/v1/subjects/:id/prerequisites/:prerequisiteSubjectId","type":1,"val":"id","end":""},{"old":"/api/v1/subjects/:id/prerequisites/:prerequisiteSubjectId","type":0,"val":"prerequisites","end":""},{"old":"/api/v1/subjects/:id/prerequisites/:prerequisiteSubjectId","type":1,"val":"prerequisiteSubjectId","end":""}],
    types: placeholder as Registry['subject_prerequisites.destroy']['types'],
  },
  'students.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/students',
    tokens: [{"old":"/api/v1/students","type":0,"val":"api","end":""},{"old":"/api/v1/students","type":0,"val":"v1","end":""},{"old":"/api/v1/students","type":0,"val":"students","end":""}],
    types: placeholder as Registry['students.index']['types'],
  },
  'students.store': {
    methods: ["POST"],
    pattern: '/api/v1/students',
    tokens: [{"old":"/api/v1/students","type":0,"val":"api","end":""},{"old":"/api/v1/students","type":0,"val":"v1","end":""},{"old":"/api/v1/students","type":0,"val":"students","end":""}],
    types: placeholder as Registry['students.store']['types'],
  },
  'students.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/students/:id',
    tokens: [{"old":"/api/v1/students/:id","type":0,"val":"api","end":""},{"old":"/api/v1/students/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/students/:id","type":0,"val":"students","end":""},{"old":"/api/v1/students/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['students.show']['types'],
  },
  'students.update': {
    methods: ["PUT","PATCH"],
    pattern: '/api/v1/students/:id',
    tokens: [{"old":"/api/v1/students/:id","type":0,"val":"api","end":""},{"old":"/api/v1/students/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/students/:id","type":0,"val":"students","end":""},{"old":"/api/v1/students/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['students.update']['types'],
  },
  'students.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/students/:id',
    tokens: [{"old":"/api/v1/students/:id","type":0,"val":"api","end":""},{"old":"/api/v1/students/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/students/:id","type":0,"val":"students","end":""},{"old":"/api/v1/students/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['students.destroy']['types'],
  },
  'subject_reservations.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/students/:id/reservations',
    tokens: [{"old":"/api/v1/students/:id/reservations","type":0,"val":"api","end":""},{"old":"/api/v1/students/:id/reservations","type":0,"val":"v1","end":""},{"old":"/api/v1/students/:id/reservations","type":0,"val":"students","end":""},{"old":"/api/v1/students/:id/reservations","type":1,"val":"id","end":""},{"old":"/api/v1/students/:id/reservations","type":0,"val":"reservations","end":""}],
    types: placeholder as Registry['subject_reservations.index']['types'],
  },
  'subject_reservations.store': {
    methods: ["POST"],
    pattern: '/api/v1/students/:id/reservations',
    tokens: [{"old":"/api/v1/students/:id/reservations","type":0,"val":"api","end":""},{"old":"/api/v1/students/:id/reservations","type":0,"val":"v1","end":""},{"old":"/api/v1/students/:id/reservations","type":0,"val":"students","end":""},{"old":"/api/v1/students/:id/reservations","type":1,"val":"id","end":""},{"old":"/api/v1/students/:id/reservations","type":0,"val":"reservations","end":""}],
    types: placeholder as Registry['subject_reservations.store']['types'],
  },
  'subject_reservations.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/students/:id/reservations/:subjectId',
    tokens: [{"old":"/api/v1/students/:id/reservations/:subjectId","type":0,"val":"api","end":""},{"old":"/api/v1/students/:id/reservations/:subjectId","type":0,"val":"v1","end":""},{"old":"/api/v1/students/:id/reservations/:subjectId","type":0,"val":"students","end":""},{"old":"/api/v1/students/:id/reservations/:subjectId","type":1,"val":"id","end":""},{"old":"/api/v1/students/:id/reservations/:subjectId","type":0,"val":"reservations","end":""},{"old":"/api/v1/students/:id/reservations/:subjectId","type":1,"val":"subjectId","end":""}],
    types: placeholder as Registry['subject_reservations.destroy']['types'],
  },
  'subject_reservations.cancel': {
    methods: ["POST"],
    pattern: '/api/v1/students/:id/reservations/:subjectId/cancel',
    tokens: [{"old":"/api/v1/students/:id/reservations/:subjectId/cancel","type":0,"val":"api","end":""},{"old":"/api/v1/students/:id/reservations/:subjectId/cancel","type":0,"val":"v1","end":""},{"old":"/api/v1/students/:id/reservations/:subjectId/cancel","type":0,"val":"students","end":""},{"old":"/api/v1/students/:id/reservations/:subjectId/cancel","type":1,"val":"id","end":""},{"old":"/api/v1/students/:id/reservations/:subjectId/cancel","type":0,"val":"reservations","end":""},{"old":"/api/v1/students/:id/reservations/:subjectId/cancel","type":1,"val":"subjectId","end":""},{"old":"/api/v1/students/:id/reservations/:subjectId/cancel","type":0,"val":"cancel","end":""}],
    types: placeholder as Registry['subject_reservations.cancel']['types'],
  },
  'grades.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/grades',
    tokens: [{"old":"/api/v1/grades","type":0,"val":"api","end":""},{"old":"/api/v1/grades","type":0,"val":"v1","end":""},{"old":"/api/v1/grades","type":0,"val":"grades","end":""}],
    types: placeholder as Registry['grades.index']['types'],
  },
  'grades.store': {
    methods: ["POST"],
    pattern: '/api/v1/grades',
    tokens: [{"old":"/api/v1/grades","type":0,"val":"api","end":""},{"old":"/api/v1/grades","type":0,"val":"v1","end":""},{"old":"/api/v1/grades","type":0,"val":"grades","end":""}],
    types: placeholder as Registry['grades.store']['types'],
  },
  'grades.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/grades/:id',
    tokens: [{"old":"/api/v1/grades/:id","type":0,"val":"api","end":""},{"old":"/api/v1/grades/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/grades/:id","type":0,"val":"grades","end":""},{"old":"/api/v1/grades/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['grades.show']['types'],
  },
  'grades.update': {
    methods: ["PUT","PATCH"],
    pattern: '/api/v1/grades/:id',
    tokens: [{"old":"/api/v1/grades/:id","type":0,"val":"api","end":""},{"old":"/api/v1/grades/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/grades/:id","type":0,"val":"grades","end":""},{"old":"/api/v1/grades/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['grades.update']['types'],
  },
  'grades.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/grades/:id',
    tokens: [{"old":"/api/v1/grades/:id","type":0,"val":"api","end":""},{"old":"/api/v1/grades/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/grades/:id","type":0,"val":"grades","end":""},{"old":"/api/v1/grades/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['grades.destroy']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
