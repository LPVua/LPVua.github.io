import Prismic from 'prismic-javascript'

const apiEndpoint = 'https://pavlo.cdn.prismic.io/api/v2'
// eslint-disable-next-line
const apiToken = 'MC5Xcy1kNUNnQUFDY0FRcWM5.77-9Xe-_vXrvv70rb--_ve-_vQo177-9FQHvv73vv71JX--_ve-_vUHvv70W77-977-977-9LnTvv73vv71B77-9'

export const Api = (callback) => Prismic.getApi(
  apiEndpoint, {
    accessToken: apiToken,
  }
).then(
  (api) => callback(api)
).catch(
  (reason) => console.log(reason)
)

Api.Predicates = Prismic.Predicates
