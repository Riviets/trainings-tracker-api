import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Training extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public type: string

  @column.date()
  public date: DateTime

  @column()
  public duration: number

  @column()
  public calories_burnt: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
