import { IContext } from '../core/context/context.js'
import Logger from '../core/logger/index.js'
import { NotFoundError, UnauthorizedError } from '../core/router/errors.js'
import { UserRepository } from '../user/user.repository.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { IUser } from './auth.model.js'
import config from '../config.js'
import { Request } from 'express'
import { RedisService } from '../core/redis/index.js'
import { v4 as uuidv4 } from 'uuid'
import { userInfer } from '../user/user.schema.js'

interface PayloadToken {
  userId?: string
  role?: string[]
  sub?: string
  username?: string
}

export class AuthService {
  constructor(
    private readonly authRepository: UserRepository,
    private readonly redisClient: RedisService,
    private readonly logger: Logger
  ) {}

  async login(ctx: IContext, email: string, password: string) {
    const logger = this.logger.Logger(ctx)
    const cmd = `${AuthService.name}_${this.login.name}`
    logger.info(`${cmd} - email`, { email })

    const user = await this.authRepository.findByEmail(ctx, email)
    if (!user) {
      throw new NotFoundError('User not found')
    }

    const isValid = await this.comparePassword(password, user.password)

    if (!isValid) {
      throw new UnauthorizedError('Invalid password')
    }

    const access_token = this.generateToken(user)
    const refresh_token = this.generateRefreshToken(user)

    const saveRedis = await this.redisClient.setEx(refresh_token, 'true', 60 * 60)

    logger.info(`${cmd} - saveRedis`, saveRedis)
    return { access_token, refresh_token }
  }

  async register(ctx: IContext, body: userInfer) {
    const logger = this.logger.Logger(ctx)
    const cmd = `${AuthService.name}_${this.register.name}`
    logger.info(`${cmd} - body`, { body })

    // check if email already exist
    const user = await this.authRepository.findByEmail(ctx, body.email)
    if (user) {
      throw new UnauthorizedError('Email already exist')
    }

    const defaultDate = new Date().toString()
    const hash = await this.hashPassword(body.password)
    const data: IUser = {
      ...body,
      id: uuidv4(),
      password: hash,
      createdAt: defaultDate,
      updatedAt: defaultDate,
      role: ['user'],
    }
    const result = await this.authRepository.create(ctx, data)
    logger.info(`${cmd} - result`, result)
    return result
  }

  private async hashPassword(password: string) {
    const saltRounds = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, saltRounds)
  }

  async refresh(ctx: IContext, token: string) {
    const logger = this.logger.Logger(ctx)
    const cmd = `${AuthService.name}_${this.refresh.name}`
    logger.info(`${cmd} - token`, { token })

    const isExist = await this.redisClient.exists(token)
    if (isExist === 0) {
      throw new UnauthorizedError('Invalid token')
    }

    await this.redisClient.delete(token)

    const decode = this.verifyToken(token)

    if (!decode?.username) {
      throw new UnauthorizedError('Invalid token')
    }

    const user = await this.authRepository.findByEmail(ctx, decode.username)
    if (!user) {
      throw new NotFoundError('User not found')
    }

    const access_token = this.generateToken(user)
    const refresh_token = this.generateRefreshToken(user)

    const saveRedis = await this.redisClient.setEx(refresh_token, 'true', 60 * 60)
    logger.info(`${cmd} - saveRedis`, saveRedis)

    return {
      access_token,
      refresh_token,
    }
  }

  private async comparePassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash)
  }

  private generateToken<T extends IUser>(body: T, expire?: string | number) {
    const secret = config.jwt.privateKey
    if (!secret) {
      throw new Error('Internal Server Error')
    }
    const options: jwt.SignOptions = {
      expiresIn: expire ?? '1h',
      algorithm: 'RS256',
    }
    const secretOrPrivateKey = Buffer.from(secret, 'base64')
    const payload: PayloadToken = {
      sub: body?.id,
      role: body?.role,
      username: body?.email,
    }

    return jwt.sign(payload, secretOrPrivateKey, options)
  }

  private generateRefreshToken<T extends IUser>(body: T, expire?: string | number) {
    const secret = config.jwt.refreshPrivateKey
    if (!secret) {
      throw new Error('Internal Server Error')
    }
    const options: jwt.SignOptions = {
      expiresIn: expire ?? '1d',
      algorithm: 'RS256',
    }
    const secretOrPrivateKey = Buffer.from(secret, 'base64')
    const payload: PayloadToken = {
      sub: body?.id,
      role: body?.role,
      username: body?.email,
    }

    return jwt.sign(payload, secretOrPrivateKey, options)
  }
  private verifyToken(token: string) {
    const secret = config.jwt.refreshPublicKey
    if (!secret) {
      throw new Error('Internal Server Error')
    }
    const secretOrPrivateKey = Buffer.from(secret, 'base64')
    try {
      return jwt.verify(token, secretOrPrivateKey) as PayloadToken
    } catch (err) {
      throw new UnauthorizedError('Invalid token')
    }
  }

  getToken(req: Request) {
    try {
      const authHeader = req.header('authorization')
      if (!authHeader) {
        return new UnauthorizedError('Token not found')
      }
      const [bearer, token] = authHeader.split(' ')
      if (bearer !== 'Bearer') {
        return new UnauthorizedError('Invalid token')
      }
      if (!token) {
        return new UnauthorizedError('Token not found')
      }
      return token
    } catch (err) {
      return new UnauthorizedError('Invalid token')
    }
  }
}
