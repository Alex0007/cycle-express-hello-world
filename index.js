import Rx from 'rxjs/Rx'
import { run } from '@cycle/rxjs-run'
import { makeRouterDriver } from 'cycle-express'
import express from 'express'

import NestedComponent from './nested'

let app = express()
let router = express.Router()

function main({ router }) {
  const nested = NestedComponent({ router })

  const mainHandler$ = router.get('/').map(({ id }) => {
    return { id, send: 'This is an example of cycle.js driver for express application' }
  })

  const delayed$ = router.get('/delayed').flatMap(({id}) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve({id, send: 'this was delayed'}), 3000)
    })
  })

  const numberHandler$ = router.get('/number/:number')
    .map(req => {
      return {
        id: req.id,
        send: `Hello world, ${req.params.number}`
      }
    })

  return {
    router: Rx.Observable
      .merge(mainHandler$, numberHandler$, delayed$, nested.router)
      .catch((err) => {
        return Rx.Observable.of({id: err.id, send: err.error.message})
      })
  }
}

run(main, {
  router: makeRouterDriver(router)
})

app.use(router).listen(3000)
