'use babel'
import path from 'path'
import fs from 'fs'

const shebagnToFileExtension = {
	'node': 'js'
}

const languageHandlers = {}
fs.readdirSync(__dirname)
.map(fileName => {
	if (fileName !== 'index.js' && fileName[0] !== '.'){
		languageHandlers[fileName.substring(0, 2)] = require(`./${fileName}`)
		// assign handlers by file name
		// files should be named with first two letters as
		// file extension (e.g. pyhandler, rbhandler, jshandler)
	}
})

let findHandler = (lang) => {
	let splitLang = lang.split('/')
	if (splitLang.length > 1) { // shebang
		lang = splitLang.pop().slice(splitLang.length - 2)
	} else {
		lang = shebagnToFileExtension[splitLang[0]] || splitLang[0]
	}
	return languageHandlers[lang] || {parseError: (x) => ''}
}

export default findHandler
