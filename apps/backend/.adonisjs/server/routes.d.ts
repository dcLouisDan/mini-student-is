import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.session.store': { paramsTuple?: []; params?: {} }
    'auth.session.destroy': { paramsTuple?: []; params?: {} }
    'auth.profile.show': { paramsTuple?: []; params?: {} }
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'users.index': { paramsTuple?: []; params?: {} }
    'users.store': { paramsTuple?: []; params?: {} }
    'users.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'courses.index': { paramsTuple?: []; params?: {} }
    'courses.store': { paramsTuple?: []; params?: {} }
    'courses.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'courses.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'courses.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'subjects.index': { paramsTuple?: []; params?: {} }
    'subjects.store': { paramsTuple?: []; params?: {} }
    'subjects.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'subjects.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'subjects.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'subject_prerequisites.index': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'subject_prerequisites.store': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'subject_prerequisites.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'id': ParamValue,'prerequisiteSubjectId': ParamValue} }
    'students.index': { paramsTuple?: []; params?: {} }
    'students.store': { paramsTuple?: []; params?: {} }
    'students.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'students.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'students.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'subject_reservations.index': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'subject_reservations.store': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'subject_reservations.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'id': ParamValue,'subjectId': ParamValue} }
    'subject_reservations.cancel': { paramsTuple: [ParamValue,ParamValue]; params: {'id': ParamValue,'subjectId': ParamValue} }
    'grades.index': { paramsTuple?: []; params?: {} }
    'grades.store': { paramsTuple?: []; params?: {} }
    'grades.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'grades.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'grades.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  GET: {
    'auth.profile.show': { paramsTuple?: []; params?: {} }
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'users.index': { paramsTuple?: []; params?: {} }
    'users.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'courses.index': { paramsTuple?: []; params?: {} }
    'courses.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'subjects.index': { paramsTuple?: []; params?: {} }
    'subjects.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'subject_prerequisites.index': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'students.index': { paramsTuple?: []; params?: {} }
    'students.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'subject_reservations.index': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'grades.index': { paramsTuple?: []; params?: {} }
    'grades.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  HEAD: {
    'auth.profile.show': { paramsTuple?: []; params?: {} }
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'users.index': { paramsTuple?: []; params?: {} }
    'users.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'courses.index': { paramsTuple?: []; params?: {} }
    'courses.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'subjects.index': { paramsTuple?: []; params?: {} }
    'subjects.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'subject_prerequisites.index': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'students.index': { paramsTuple?: []; params?: {} }
    'students.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'subject_reservations.index': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'grades.index': { paramsTuple?: []; params?: {} }
    'grades.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  POST: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.session.store': { paramsTuple?: []; params?: {} }
    'auth.session.destroy': { paramsTuple?: []; params?: {} }
    'users.store': { paramsTuple?: []; params?: {} }
    'courses.store': { paramsTuple?: []; params?: {} }
    'subjects.store': { paramsTuple?: []; params?: {} }
    'subject_prerequisites.store': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'students.store': { paramsTuple?: []; params?: {} }
    'subject_reservations.store': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'subject_reservations.cancel': { paramsTuple: [ParamValue,ParamValue]; params: {'id': ParamValue,'subjectId': ParamValue} }
    'grades.store': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'users.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'courses.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'subjects.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'students.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'grades.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  PATCH: {
    'users.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'courses.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'subjects.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'students.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'grades.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'users.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'courses.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'subjects.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'subject_prerequisites.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'id': ParamValue,'prerequisiteSubjectId': ParamValue} }
    'students.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'subject_reservations.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'id': ParamValue,'subjectId': ParamValue} }
    'grades.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}