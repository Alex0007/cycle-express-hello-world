import Rx from 'rxjs/Rx'

const NestedComponent = ({ router }) => {
  const nestedRouter$ = router.route('/nested')

  const nestedHandler$ = nestedRouter$
    .get('/123')
    .map(({ id }) => { return { id, send: 'nested router' } })

  const nestedError$ = nestedRouter$
    .get('/error')
    .flatMap(req => {
      throw({id: req.id, error: new Error('This is an error')})
    })

  return {
    router: Rx.Observable.merge(nestedHandler$, nestedError$)
  }
}

export default NestedComponent
