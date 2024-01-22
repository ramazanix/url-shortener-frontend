import HttpClient from '@/services/HttpClient'
import { parseDate } from '@/utils'

class UsersClient extends HttpClient {
  constructor(baseURL: string) {
    super({
      baseURL,
      headers: new Headers(),
    })
  }

  users = {
    create: (username: string, password: string) =>
      this.setHeader('Content-Type', 'application/json')
        .post('', { username, password })
        .then((res) => {
          return {
            status: 'success',
            statusCode: res!.status,
            data: [],
          }
        })
        .catch((e) => {
          return {
            status: 'failed',
            statusCode: e.status,
            data: e.data.detail,
          }
        }),

    urls: (accessToken: string) =>
      this.setBearerAuth(accessToken)
        .setHeader('Content-Type', 'application/json')
        .get('/me/urls')
        .then((res) => {
          return {
            status: 'success',
            statusCode: res!.status,
            data: res!.data,
          }
        })
        .catch((e) => {
          return {
            status: 'failed',
            statusCode: e.status,
            data: e.data.detail,
          }
        }),
  }
}

export default UsersClient
