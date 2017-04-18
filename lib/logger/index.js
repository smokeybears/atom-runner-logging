'use babel'
import fs from 'fs'
import getLangHandler from './handlers'


createLog = (lang, logBody, type, editor) => {
  let langHandler = getLangHandler(lang)
  let fileName = editor.getFileName()
  fileName = fileName ? fileName : 'undefined'
  let log = {
    fileName: fileName,
    userEmail: atom.config.get('email'),
    output: {
      type: type, // "err" || "success"
      body: logBody.toString()
    },
    cursorLineNumber: editor.cursors[0].getScreenRow() + 1 // zero indexed
  }
  if (type === 'err') log.output.meta = langHandler.parseError(logBody)
  saveToFile(log)
}


let saveToFile = (log) => {
  return fs.appendFile(`/tmp/log_${log.fileName}`, JSON.stringify(log) + '\n', (err) => {
    if (err) console.log(err)
  })
}

export default createLog
