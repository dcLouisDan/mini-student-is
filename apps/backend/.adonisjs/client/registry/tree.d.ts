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
}
