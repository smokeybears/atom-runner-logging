'use babel'

let parseError = (errText) => {
  let splitErr = errText.toString().split('\n')
  return {
    lineNumber: splitErr[0].split(':').pop(),
    errorMsg: splitErr[4],
    errorType: splitErr[4].split(':')[0],
    stackTrace: splitErr.slice(5)
  }
}

export default {
    parseError: parseError
}
