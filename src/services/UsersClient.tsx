import HttpClient from '@/services/HttpClient'

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
  }
}

export default UsersClient
