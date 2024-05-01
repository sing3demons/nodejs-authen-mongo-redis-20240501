import { Collection, MongoClient } from 'mongodb'
import { logger } from '../logger/utils'
const url =
  'bW9uZ29kYjovL0RFVl9VU0VSOkMzQkFENTYyLTg5NjgtNENENC05MENFLTQzQjZFMEJBMjM2MkBsb2NhbGhvc3Q6MjcwMTcvdG9kbz9hdXRoU291cmNlPWFkbWlu'

export default class MongoService {
  private client: MongoClient

  constructor() {
    const buf = Buffer.from(url, 'base64')
    const uri = buf.toString('utf-8')
    this.client = new MongoClient(uri)
    this.client.on('connect', async () => {
      logger.info('MongoDB connected')
    })
  }

  async connect() {
    await this.client.connect()
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

export async function connectDB() {
  const buf = Buffer.from(url, 'base64')
  const uri = buf.toString('utf-8')
  const client = new MongoClient(uri)
  await client.connect()

  return client
}
