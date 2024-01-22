import HttpClient from '@/services/HttpClient'

class AuthClient extends HttpClient {
  constructor(baseURL: string) {
    super({
      baseURL: baseURL,
    })
  }

  auth = {
    login: (username: string, password: string) =>
      this.post('/login', { username, password })
        .then((res) => {
          return {
            status: 'success',
            statusCode: res!.status,
            data: {
              accessToken: res!.data.access_token,
              refreshToken: res!.data.refresh_token,
            },
          }
        })
        .catch((e) => {
          return {
            status: 'failed',
            statusCode: e.status,
            data: e.data.detail,
          }
        }),

    currentUser: (accessToken: string) =>
      this.setBearerAuth(accessToken)
        .get('/users/me', { notRelated: true })
        .then((res) => {
          return {
            id: res.data.id,
            username: res.data.username,
            created_at: new Date(res.data.created_at),
          }
        }),

    refreshAccessToken: (refreshToken: string) =>
      this.setBearerAuth(refreshToken)
        .post('/refresh', {})
        .then((res) => {
          return { accessToken: res!.data.access_token }
        }),

    revokeAccessToken: (accessToken: string) =>
      this.setBearerAuth(accessToken).delete('/access_revoke'),

    revokeRefreshToken: (refreshToken: string) =>
      this.setBearerAuth(refreshToken).delete('/refresh_revoke'),
  }
}

export default AuthClient
