/**
 * START `Implement cleaner stack traces`
 * See https://github.com/cypress-io/cypress/issues/881#issuecomment-485235225
 */
const stacktraces = []

before(() => {
  stacktraces.length = 0
})

Cypress.Commands.each(({ name }) => {
  const fn = cy[name]
  cy[name] = (...args) => {
    const ret = fn.call(cy, ...args)
    stacktraces.push({
      stack: new Error().stack,
      chainerId: ret.chainerId
    })
    return ret
  }
})

Cypress.on('fail', (err, runnable) => {
  const commands = runnable.commands
  const cmdIdx = Cypress._.findLastIndex(commands, (cmd) => {
    return (cmd.state === 'pending' || cmd.state === 'failed') && cmd.chainerId
  })
  const cmd = commands && commands[cmdIdx]
  if (cmd) {
    const data = Cypress._.find(stacktraces, { chainerId: cmd.chainerId })
    if (data && data.stack) {
      console.log(data.stack, data.chainerId)
    }
  }
  throw err
})
/** END of `Implement cleaner stack traces` */

Cypress.Commands.add(`getCy`, (selector, options = {}) =>
  cy.get(`[data-cy="${selector}"]`, options)
)
