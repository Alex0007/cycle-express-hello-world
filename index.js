import xs from 'xstream'
import { run } from '@cycle/xstream-run'
import makeRouterDriver from 'cycle-express'
import express from 'express'

import NestedComponent from './nested'

let app = express()
let router = express.Router()

function main({ router }) {
  const nested = NestedComponent({ router })

  const mainHandler$ = router.get('/').map(({ id }) => {
    return { id, send: 'This is an example of cycle.js driver for express application' }
  })

  const numberHandler$ = router.get('/number/:number')
    .map(req => {
      return {
        id: req.id,
        send: `Hello world, ${req.params.number}`
      }
    })

  return {
    router: xs.merge(mainHandler$, numberHandler$, nested.router)
  }
}

run(main, {
  router: makeRouterDriver(router)
})

app.use(router).listen(3000)
