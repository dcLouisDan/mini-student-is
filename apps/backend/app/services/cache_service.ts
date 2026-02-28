import Cache from '#models/cache'
import { DateTime } from 'luxon'

export class CacheService {
  async get(key: string) {
    const record = await Cache.query().where('key', '=', key).first()

    if (!record) return null

    if (!record.expiresAt) return record.value

    const isExpired = record.expiresAt <= DateTime.now()

    if (isExpired) {
      await record.delete()
      return null
    }

    return record.value
  }

  async remember<T>(
    key: string,
    expiresAt: DateTime | null = null,
    rememberCallback: () => T | Promise<T>
  ): Promise<T> {
    const value = await this.get(key)

    if (value) {
      return value
    }

    const newValue = await rememberCallback()

    await Cache.updateOrCreate({ key: key }, { value: newValue, expiresAt })

    return newValue
  }

  async invalidate(key: string) {
    const record = await Cache.findBy('key', key)

    if (record) {
      await record.delete()
    }
  }
}
