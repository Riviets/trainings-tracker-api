import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Trainings extends BaseSchema {
  protected tableName = 'trainings'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('type')
      table.date('date')
      table.float('duration', 8, 2)
      table.integer('calories_burnt')
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
