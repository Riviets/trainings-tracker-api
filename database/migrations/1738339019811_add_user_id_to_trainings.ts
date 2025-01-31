import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddUserIdToTrainings extends BaseSchema {
  protected tableName = 'trainings'

  public async up () {
    this.schema.table(this.tableName, (table) => {
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
    })
  }

  public async down () {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('user_id')
    })
  }
}
