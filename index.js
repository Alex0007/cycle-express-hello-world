const { Observable } = require('rxjs')
const { makeRouterDriver } = require('cycle-express-driver')
const express = require('express')
const run = require('@cycle/rxjs-run').default

const app = express()
const router = express.Router()

function main({ router }) {
  const mainHandler$ = router.get('/').map(({ id }) => {
    return { id, send: 'This is an example of cycle.js driver for express application' }
  })

  const delayed$ = router.get('/123').flatMap(({ id }) => {
    return new Promise((resolve) => {
      setTimeout(() => { resolve({ id, send: 'ok' }) }, 1000)
    })
  })

  return {
    router: Observable.merge(
      mainHandler$, delayed$
    )
  }
}

run(main, {
  router: makeRouterDriver(router)
})

app.use(router).listen(3000, () => {
  console.log('Listening on http://localhost:3000/')
})
