import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async index(ctx: HttpContextContract) {
    try {
      const users = await User.all()
      return users
    } catch (error) {
      ctx.response.status(500).send('Error retrieving users')
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const body = request.body()
      const user = await User.create(body)
      response.status(201)
      return user
    } catch (error) {
      response.status(400).send('Error creating user')
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const user = await User.findOrFail(params.id)
      return user
    } catch (error) {
      response.status(404).send('User not found')
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    try {
      const body = request.body()
      const user = await User.findOrFail(params.id)
      user.username = body.username
      user.age = body.age
      user.weight = body.weight
      user.height = body.height
  
      await user.save()
      return user
    } catch (error) {
      response.status(400).send('Error updating user')
    }
  }
  

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const user = await User.findOrFail(params.id)
      await user.delete()
      response.status(204).send('User deleted')
    } catch (error) {
      response.status(404).send('User not found')
    }
  }
}
