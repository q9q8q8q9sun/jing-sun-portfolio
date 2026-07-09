/*!
 * Quick
 *
 * @version : 0.1.0
 * @date    : 2024-04-06
 * @license : Copyright (c) 2024 Nobuaki Honma
 *
**/

importScripts('../vendor/comlink/index.js')

// Worker-compatible prefetch function
function prefetch(urls, isPriority = true) {
	if ( !urls ) return
	const urlList = Array.isArray(urls) ? urls : [urls]
	urlList.forEach(url => {
		fetch(url, { 
			mode: 'cors',
			credentials: 'omit',
			cache: 'force-cache'
		}).catch(() => {}) // Silently ignore errors
	})
}

class Quick {
	constructor() {
	}

	prefetch(urls = [], isPriority = true) {
		prefetch(urls, isPriority)
	}

	delayPrefetch(urls = [], interval = 1, delay = 0, isPriority = true) {
		let timer, count = 0
		setTimeout(() => {
			timer = setInterval(() => {
				prefetch(urls[count], isPriority)
				count++
				if ( count === urls.length ) {
					clearInterval(timer)
				}
			}, interval * 1000)
		}, delay * 1000)
	}
}

Comlink.expose(Quick, self)