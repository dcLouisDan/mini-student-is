import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.session.store': { paramsTuple?: []; params?: {} }
    'auth.session.destroy': { paramsTuple?: []; params?: {} }
    'auth.profile.show': { paramsTuple?: []; params?: {} }
    'profile.profile.show': { paramsTuple?: []; params?: {} }
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
  }
  GET: {
    'auth.profile.show': { paramsTuple?: []; params?: {} }
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'courses.index': { paramsTuple?: []; params?: {} }
    'courses.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'subjects.index': { paramsTuple?: []; params?: {} }
    'subjects.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'subject_prerequisites.index': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  HEAD: {
    'auth.profile.show': { paramsTuple?: []; params?: {} }
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'courses.index': { paramsTuple?: []; params?: {} }
    'courses.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'subjects.index': { paramsTuple?: []; params?: {} }
    'subjects.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'subject_prerequisites.index': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  POST: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.session.store': { paramsTuple?: []; params?: {} }
    'auth.session.destroy': { paramsTuple?: []; params?: {} }
    'courses.store': { paramsTuple?: []; params?: {} }
    'subjects.store': { paramsTuple?: []; params?: {} }
    'subject_prerequisites.store': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  PUT: {
    'courses.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'subjects.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  PATCH: {
    'courses.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'subjects.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'courses.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'subjects.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'subject_prerequisites.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'id': ParamValue,'prerequisiteSubjectId': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}