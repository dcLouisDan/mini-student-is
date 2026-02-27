/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'

router.get('/', () => {
  return { hello: 'world' }
})

router
  .group(() => {
    router
      .group(() => {
        router.post('signup', [controllers.NewAccount, 'store'])
        router.post('login', [controllers.Session, 'store'])
        router.post('logout', [controllers.Session, 'destroy']).use(middleware.auth())
        router.get('/me', [controllers.Profile, 'show'])
      })
      .prefix('auth')
      .as('auth')

    router
      .group(() => {
        router.get('/profile', [controllers.Profile, 'show'])
      })
      .prefix('account')
      .as('profile')
      .use(middleware.auth())

    router
      .resource('courses', controllers.Courses)
      .apiOnly()
      .use(['store', 'update', 'destroy'], middleware.auth())

    router
      .resource('subjects', controllers.Subjects)
      .apiOnly()
      .use(['store', 'update', 'destroy'], middleware.auth())

    router
      .group(() => {
        router.get('/', [controllers.SubjectPrerequisites, 'index'])
        router.post('/', [controllers.SubjectPrerequisites, 'store'])
        router.delete('/:prerequisiteSubjectId', [controllers.SubjectPrerequisites, 'destroy'])
      })
      .prefix('/subjects/:id/prerequisites')
  })
  .prefix('/api/v1')
