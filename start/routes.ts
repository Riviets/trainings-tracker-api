
import Route from '@ioc:Adonis/Core/Route'

Route.get('/users', 'UsersController.index')
Route.post('/users', 'UsersController.store')
Route.get('/users/:id', 'UsersController.show')
Route.put('/users/:id', 'UsersController.update')
Route.delete('/users/:id', 'UsersController.destroy')

Route.get('/trainings', 'TrainingsController.index')
Route.post('/trainings', 'TrainingsController.store')
Route.get('/trainings/:id', 'TrainingsController.show')
Route.put('/trainings/:id', 'TrainingsController.update')
Route.delete('/trainings/:id', 'TrainingsController.destroy')
Route.get('/trainings/user/:userId', 'TrainingsController.findByUser')

Route.get('/', async () => {
  return { hello: 'world' }
})
