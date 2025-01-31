import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Training from 'App/Models/Training'

export default class TrainingsController {
  public async index(ctx: HttpContextContract) {
    try {
      const trainings = await Training.all()
      return trainings
    } catch (error) {
      ctx.response.status(500).send('Error retrieving trainings')
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const body = request.body()
      const training = await Training.create(body)
      response.status(201)
      return training
    } catch (error) {
      response.status(400).send('Error creating training')
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const training = await Training.findOrFail(params.id)
      return training
    } catch (error) {
      response.status(404).send('Training not found')
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    try {
      const body = request.body()
      const training = await Training.findOrFail(params.id)
      training.type = body.type
      training.date = body.date
      training.duration = body.duration
      training.calories_burnt = body.calories_burnt
      await training.save()
      return training
    } catch (error) {
      response.status(400).send('Error updating training')
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const training = await Training.findOrFail(params.id)
      await training.delete()
      response.status(204).send('Training deleted')
    } catch (error) {
      response.status(404).send('Training not found')
    }
  }
}
