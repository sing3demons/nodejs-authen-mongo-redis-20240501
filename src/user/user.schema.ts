import { z } from 'zod'

export const UserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
})

export const ParamsSchema = z.object({
  id: z.string(),
})

export type userInfer = z.infer<typeof UserSchema>

export type IUser = userInfer & {
  id: string
  createdAt: string
  updatedAt: string
  role: string[]
}

export type IUserCollection = Omit<IUser, 'password' | 'createdAt' | 'updatedAt'>

export type IUserResponse = Omit<IUser, 'password' | 'createdAt' | 'updatedAt'> & {
  href: string
}
