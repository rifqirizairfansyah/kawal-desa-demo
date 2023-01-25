import GhostContentAPI from '@tryghost/content-api'

export default new GhostContentAPI({
  url: process.env.VUE_APP_URL,
  key: process.env.VUE_APP_KEY,
  version: process.env.VUE_APP_VERSION
})
