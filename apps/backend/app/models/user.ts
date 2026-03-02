import { UserSchema } from '#database/schema'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { type AccessToken, DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import { hasMany } from '@adonisjs/lucid/orm'
import Grade from './grade.ts'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { MorphMap } from '@holoyan/adonisjs-activitylog'
import { LogModelInterface } from '@holoyan/adonisjs-activitylog/types'

@MorphMap('users')
export default class User
  extends compose(
    UserSchema,
    withAuthFinder(hash, {
      uids: ['email'],
      passwordColumnName: 'passwordHash',
    })
  )
  implements LogModelInterface
{
  static accessTokens = DbAccessTokensProvider.forModel(User)
  declare currentAccessToken?: AccessToken

  getModelId(): string {
    return String(this.id)
  }

  @hasMany(() => Grade, {
    foreignKey: 'encodedByUserId',
  })
  declare encodedGrades: HasMany<typeof Grade>

  get initials() {
    const [first, last] = this.fullName ? this.fullName.split(' ') : this.email.split('@')
    if (first && last) {
      return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase()
    }
    return `${first.slice(0, 2)}`.toUpperCase()
  }

  toLog() {
    return {
      id: this.id,
      fullName: this.fullName,
      email: this.email,
      passwordHash: this.passwordHash,
      role: this.role,
    }
  }
}
