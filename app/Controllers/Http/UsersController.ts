import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  
  /**
   * @swagger
   * /users:
   *   get:
   *     tags:
   *       - Users
   *     summary: Retrieve a list of all users
   *     responses:
   *       200:
   *         description: List of users
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/User'
   */
  public async index(ctx: HttpContextContract) {
    try {
      const users = await User.all()
      return users
    } catch (error) {
      ctx.response.status(500).send('Error retrieving users')
    }
  }

  /**
   * @swagger
   * /users:
   *   post:
   *     tags:
   *       - Users
   *     summary: Create a new user
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               username:
   *                 type: string
   *                 example: "john_doe"
   *               age:
   *                 type: integer
   *                 example: 30
   *               weight:
   *                 type: number
   *                 example: 75.5
   *               height:
   *                 type: number
   *                 example: 180
   *     responses:
   *       201:
   *         description: User created successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       400:
   *         description: Error creating user
   */
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

  /**
   * @swagger
   * /users/{id}:
   *   get:
   *     tags:
   *       - Users
   *     summary: Get user details by ID
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: ID of the user to retrieve
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: User details
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       404:
   *         description: User not found
   */
  public async show({ params, response }: HttpContextContract) {
    try {
      const user = await User.findOrFail(params.id)
      return user
    } catch (error) {
      response.status(404).send('User not found')
    }
  }

  /**
   * @swagger
   * /users/{id}:
   *   put:
   *     tags:
   *       - Users
   *     summary: Update user details by ID
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: ID of the user to update
   *         schema:
   *           type: integer
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               username:
   *                 type: string
   *               age:
   *                 type: integer
   *               weight:
   *                 type: number
   *               height:
   *                 type: number
   *     responses:
   *       200:
   *         description: User updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       400:
   *         description: Error updating user
   *       404:
   *         description: User not found
   */
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

  /**
   * @swagger
   * /users/{id}:
   *   delete:
   *     tags:
   *       - Users
   *     summary: Delete a user by ID
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: ID of the user to delete
   *         schema:
   *           type: integer
   *     responses:
   *       204:
   *         description: User deleted successfully
   *       404:
   *         description: User not found
   */
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
