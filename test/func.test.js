const f = require('@funcmaticjs/funcmatic')
const coldhandler = require('../index')

describe('Handler', () => {
  let func = null
  beforeEach(async () => {
    func = f.create()
  })
  it ('should invoke normally if X-Cold-Start is not set', async () => {
    let startCalled = false
    func.start(async (ctx) => {
      startCalled = true
    })
    let handler = coldhandler(func)
    await handler({ }, { })
    expect(startCalled).toBe(true)
    startCalled = false
    await handler({ }, { })
    expect(startCalled).toBe(false)
  })
  it ('should force cold start if X-Cold-Start is set to true', async () => {
    let startCalled = false
    func.start(async (ctx) => {
      startCalled = true
    })
    let handler = coldhandler(func)
    await handler({ }, { })
    expect(startCalled).toBe(true)
    startCalled = false
    await handler({ headers: { 'X-Cold-Start': 'true' } }, { })
    expect(startCalled).toBe(true)
    startCalled = false
    await handler({ headers: { 'x-cold-start': 'TRUE' } }, { })
    expect(startCalled).toBe(true)
  })
})

