import Koa from 'koa'
const { Nuxt, Builder } = require('nuxt')
const consola = require('consola')

import mongoose from 'mongoose'
import bodyParser from 'koa-bodyparser'
import session from 'koa-generic-session'
import Redis from 'koa-redis'
import json from 'koa-json'
import dbConfig from './dbs/config'
import passport from './interface/utils/passport'
import users from './interface/users'
import questionnaires from './interface/questionnaires'
import statistics from './interface/statistics'
import geo from './interface/geo'

const app = new Koa()

app.keys = ['wj', 'keyskeys']
app.proxy = true
app.use(session({
  key: 'wj',
  prefix: 'wj:uid',
  store: new Redis()
}))
app.use(bodyParser({
  extendTypes: ['json', 'form', 'text']
}))
app.use(json())
mongoose.connect(dbConfig.dbs, {
  useNewUrlParser: true
})
app.use(passport.initialize())
app.use(passport.session())

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = app.env !== 'production'

async function start () {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  await nuxt.ready()
  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  app.use(users.routes()).use(users.allowedMethods())
  app.use(questionnaires.routes()).use(questionnaires.allowedMethods())
  app.use(statistics.routes()).use(statistics.allowedMethods())
  app.use(geo.routes()).use(geo.allowedMethods())
  app.use((ctx) => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
