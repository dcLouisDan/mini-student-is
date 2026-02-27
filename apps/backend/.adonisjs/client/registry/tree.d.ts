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
  courses: {
    index: typeof routes['courses.index']
    store: typeof routes['courses.store']
    show: typeof routes['courses.show']
    update: typeof routes['courses.update']
    destroy: typeof routes['courses.destroy']
  }
}
