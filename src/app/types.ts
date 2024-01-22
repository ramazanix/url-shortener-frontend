import { UUID } from 'crypto'

export interface IUser {
  id: UUID
  username: string
  created_at: Date
}

export interface IAuthTokens {
  accessToken: string
  refreshToken: string
}

export interface IUrl {
  id: UUID
  full_name: string
  short_name: string
  created_at: Date
  user_id: UUID
}

export type AuthTokens = {
  accessToken: string | undefined
  refreshToken: string | undefined
}

export type FieldError = {
  loc: Array<string>
  msg: string
  type: string
}
