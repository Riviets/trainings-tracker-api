import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Training from 'App/Models/Training'

export default class TrainingsController {
  
  /**
   * @swagger
   * /trainings:
   *   get:
   *     tags:
   *       - Trainings
   *     summary: Retrieve a list of all trainings
   *     responses:
   *       200:
   *         description: List of trainings
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Training'
   */
  public async index(ctx: HttpContextContract) {
    try {
      const trainings = await Training.all()
      return trainings
    } catch (error) {
      ctx.response.status(500).send('Error retrieving trainings')
    }
  }

  /**
   * @swagger
   * /trainings:
   *   post:
   *     tags:
   *       - Trainings
   *     summary: Create a new training session
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               type:
   *                 type: string
   *                 example: "Running"
   *               date:
   *                 type: string
   *                 format: date
   *                 example: "2025-01-30"
   *               duration:
   *                 type: integer
   *                 example: 45
   *               calories_burnt:
   *                 type: integer
   *                 example: 300
   *     responses:
   *       201:
   *         description: Training created successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Training'
   *       400:
   *         description: Error creating training
   */
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

  /**
   * @swagger
   * /trainings/{id}:
   *   get:
   *     tags:
   *       - Trainings
   *     summary: Get training session details by ID
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: ID of the training session to retrieve
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Training session details
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Training'
   *       404:
   *         description: Training not found
   */
  public async show({ params, response }: HttpContextContract) {
    try {
      const training = await Training.findOrFail(params.id)
      return training
    } catch (error) {
      response.status(404).send('Training not found')
    }
  }

  /**
   * @swagger
   * /trainings/{id}:
   *   put:
   *     tags:
   *       - Trainings
   *     summary: Update training session details by ID
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: ID of the training session to update
   *         schema:
   *           type: integer
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               type:
   *                 type: string
   *               date:
   *                 type: string
   *                 format: date
   *               duration:
   *                 type: integer
   *               calories_burnt:
   *                 type: integer
   *     responses:
   *       200:
   *         description: Training session updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Training'
   *       400:
   *         description: Error updating training session
   *       404:
   *         description: Training session not found
   */
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

  /**
   * @swagger
   * /trainings/{id}:
   *   delete:
   *     tags:
   *       - Trainings
   *     summary: Delete a training session by ID
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: ID of the training session to delete
   *         schema:
   *           type: integer
   *     responses:
   *       204:
   *         description: Training session deleted successfully
   *       404:
   *         description: Training session not found
   */
  public async destroy({ params, response }: HttpContextContract) {
    try {
      const training = await Training.findOrFail(params.id)
      await training.delete()
      response.status(204).send('Training deleted')
    } catch (error) {
      response.status(404).send('Training not found')
    }
  }

  /**
   * @swagger
   * /trainings/user/{userId}:
   *   get:
   *     tags:
   *       - Trainings
   *     summary: Get all trainings for a specific user by user ID
   *     parameters:
   *       - name: userId
   *         in: path
   *         required: true
   *         description: ID of the user to retrieve trainings for
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: List of training sessions for the user
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Training'
   *       500:
   *         description: Error retrieving trainings for user
   */
  public async findByUser({ params, response }: HttpContextContract) {
    try {
      const userId = params.userId
      const trainings = await Training.query().where('user_id', userId)
      return trainings
    } catch (error) {
      response.status(500).send('Error retrieving trainings for user')
    }
  }
}
