import { IUrl } from '@/app/types'
import HttpClient from '@/services/HttpClient'
import { parseDate } from '@/utils'

class UrlsClient extends HttpClient {
  constructor(baseURL: string) {
    super({
      baseURL,
      headers: new Headers(),
    })
  }

  urls = {
    get: (short_name: string) =>
      this.get(`/${short_name}`).then((res) => {
        let created_at = parseDate(res.data.created_at)
        return {
          status: 'success',
          statusCode: res!.status,
          data: { ...res.data, created_at },
        }
      }),

    createDefault: (full_name: string, accessToken: string) =>
      this.setBearerAuth(accessToken)
        .setHeader('Content-Type', 'application/json')
        .post('/default', { full_name })
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

    createCustom: (
      full_name: string,
      short_name: string,
      accessToken: string
    ) =>
      this.setBearerAuth(accessToken)
        .setHeader('Content-Type', 'application/json')
        .post('/custom', { full_name, short_name })
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

    update: (
      oldShortName: string,
      short_name: string,
      full_name: string,
      accessToken: string
    ) =>
      this.setBearerAuth(accessToken)
        .setHeader('Content-Type', 'application/json')
        .patch(`/${oldShortName}`, { short_name, full_name })
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

    delete: (short_name: string, accessToken: string) =>
      this.setBearerAuth(accessToken)
        .setHeader('Content-Type', 'application/json')
        .delete(`/${short_name}`)
        .then((res) => {
          return {
            status: 'success',
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

export default UrlsClient
