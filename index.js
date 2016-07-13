import { run } from '@cycle/core'
import { makeRouterDriver } from 'cycle-express'
import express from 'express'

let app = express()
let router = express.Router()

function main ({ router }) {
  return {
    router: router.get('*')
      .map(req => {
        return {
          id: req.id,
          send: 'Hello world'
        }
      })
  }
}

run(main, {
  router: makeRouterDriver(router)
})

app.use(router).listen(3000)
