import xs from 'xstream'

const NestedComponent = ({ router }) => {
  const nestedRouter$ = router.route('/nested')

  const nestedHandler$ = nestedRouter$
    .get('/123')
    .map(({ id }) => { return { id, send: 'nested router' } })


  return {
    router: xs.merge(nestedHandler$)
  }
}

export default NestedComponent
