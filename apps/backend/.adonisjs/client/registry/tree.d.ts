/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    newAccount: {
      store: typeof routes['auth.new_account.store']
    }
    session: {
      store: typeof routes['auth.session.store']
      destroy: typeof routes['auth.session.destroy']
    }
    profile: {
      show: typeof routes['auth.profile.show']
    }
  }
  profile: {
    profile: {
      show: typeof routes['profile.profile.show']
    }
  }
  users: {
    index: typeof routes['users.index']
    store: typeof routes['users.store']
    show: typeof routes['users.show']
    update: typeof routes['users.update']
    destroy: typeof routes['users.destroy']
    batchDestroy: typeof routes['users.batch_destroy']
  }
  courses: {
    index: typeof routes['courses.index']
    store: typeof routes['courses.store']
    show: typeof routes['courses.show']
    update: typeof routes['courses.update']
    destroy: typeof routes['courses.destroy']
    batchDestroy: typeof routes['courses.batch_destroy']
  }
  subjects: {
    index: typeof routes['subjects.index']
    store: typeof routes['subjects.store']
    show: typeof routes['subjects.show']
    update: typeof routes['subjects.update']
    destroy: typeof routes['subjects.destroy']
    batchDestroy: typeof routes['subjects.batch_destroy']
  }
  activityLogs: {
    index: typeof routes['activity_logs.index']
  }
  subjectPrerequisites: {
    index: typeof routes['subject_prerequisites.index']
    prereqOptionsIndex: typeof routes['subject_prerequisites.prereq_options_index']
    store: typeof routes['subject_prerequisites.store']
    destroy: typeof routes['subject_prerequisites.destroy']
  }
  students: {
    index: typeof routes['students.index']
    store: typeof routes['students.store']
    show: typeof routes['students.show']
    update: typeof routes['students.update']
    destroy: typeof routes['students.destroy']
    batchDestroy: typeof routes['students.batch_destroy']
  }
  subjectReservations: {
    eligibleSubjectsIndex: typeof routes['subject_reservations.eligible_subjects_index']
    index: typeof routes['subject_reservations.index']
    store: typeof routes['subject_reservations.store']
    destroy: typeof routes['subject_reservations.destroy']
    cancel: typeof routes['subject_reservations.cancel']
  }
  grades: {
    index: typeof routes['grades.index']
    store: typeof routes['grades.store']
    show: typeof routes['grades.show']
    update: typeof routes['grades.update']
    destroy: typeof routes['grades.destroy']
  }
}
