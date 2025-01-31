import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsersController {
    public async index(ctx: HttpContextContract) {
        return 'GET users'
    }
    
    
    public async store({ request }: HttpContextContract) {
        return {
          message: 'POST users',
          body: request.body(),
        }
    }
}
