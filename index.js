module.exports = handler

function handler(func) {
  return async (event, context) => {
    return await func.invoke({ event, context }, { forceColdStart: isForceColdStart(event) })
  }
}


function isForceColdStart(event) {
  if (event && event.headers) {
    let value = event.headers['X-Cold-Start'] || event.headers['x-cold-start'] || 'false'
    return value == 'true' || value == 'TRUE'
  }
  return false
}