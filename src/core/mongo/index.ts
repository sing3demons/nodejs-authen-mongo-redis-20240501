import { Collection, MongoClient } from 'mongodb'
import Logger from '../logger/index.js'
const url =
  'bW9uZ29kYjovL0RFVl9VU0VSOkMzQkFENTYyLTg5NjgtNENENC05MENFLTQzQjZFMEJBMjM2MkBsb2NhbGhvc3Q6MjcwMTcvdG9kbz9hdXRoU291cmNlPWFkbWlu'

export default class MongoService {
  private client: MongoClient

  constructor(private readonly logger: Logger) {
    const buf = Buffer.from(url, 'base64')
    const uri = buf.toString('utf-8')
    this.client = new MongoClient(uri)
    this.client.on('connect', () => {
      this.logger.info('MongoDB connected')
    })
  }

  async connect() {
    const conn = await this.client.connect()
    this.logger.info('MongoDB connected', {
      eventNames: conn.eventNames(),
      options: conn.options,
    })
  }

  async disconnect() {
    await this.client.close()
  }

  getClient() {
    return this.client
  }

  getCollection<T extends object>(collection: string = 'users'): Collection<T> {
    return this.client.db('users').collection(collection)
  }
}
