import type { Document, Filter, FindOptions, InsertOneOptions, MongoClient } from 'mongodb'
import Logger from '../core/logger/index.js'
import { IContext } from '../core/context/context.js'
import { IUser, IUserResponse } from './user.schema.js'

export class UserRepository {
  constructor(private readonly client: MongoClient, private readonly logger: Logger) {}

  private getCollection<T extends object>(collection: string = 'users') {
    return this.client.db('users').collection<T>(collection)
  }

  async create(ctx: IContext, data: object, options?: InsertOneOptions) {
    const logger = this.logger.Logger(ctx)
    logger.info(`${UserRepository.name} - ${this.create.name}`)
    return await this.getCollection().insertOne(data, options)
  }

  async find(ctx: IContext, filter: Filter<Document>, options?: FindOptions) {
    const logger = this.logger.Logger(ctx)
    logger.info(`${UserRepository.name} - ${this.find.name}`)
    filter = { ...filter, deleteDate: null }
    return await this.getCollection<IUserResponse>('users').find(filter, options).toArray()
  }

  async findOne(ctx: IContext, id: string) {
    const logger = this.logger.Logger(ctx)
    logger.info(`${UserRepository.name} - ${this.findOne.name}`)
    const filter = { id, deleteDate: null }
    return await this.getCollection<IUserResponse>('users').findOne(filter, {
      projection: { _id: 0, password: 0, createdAt: 0, updatedAt: 0, deleteDate: 0 },
    })
  }

  async findByEmail(ctx: IContext, email: string) {
    const logger = this.logger.Logger(ctx)
    logger.info(`${UserRepository.name} - ${this.findByEmail.name}`)
    const filter = { email, deleteDate: null }
    return await this.getCollection<IUser>('users').findOne(filter)
  }

  async delete(ctx: IContext, id: string) {
    const logger = this.logger.Logger(ctx)
    logger.info(`${UserRepository.name} - ${this.delete.name}`)
    const filter = { id, deleteDate: null }
    const update = { $set: { deleteDate: new Date().toString() } }
    return await this.getCollection<IUserResponse>('users').updateOne(filter, update)
  }
}
