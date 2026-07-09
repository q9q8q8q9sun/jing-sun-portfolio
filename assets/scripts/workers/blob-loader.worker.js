/*!
 * Blob Loader
 *
 * @version : 0.1.0
 * @date    : 2024-04-06
 * @license : Copyright (c) 2024 Nobuaki Honma
 *
**/

importScripts('../vendor/comlink/index.js')

class BlobLoader {
	constructor() {
	}

	async load(urls = []) {
		if ( Array.isArray(urls) ) { // # Array
			let blobs, objUrls = []
			for ( let i = 0; urls.length > i; i++ ) {
				const url      = urls[i]
				const response = await fetch(url, { mode: 'cors' })
				const blob     = await response.blob()
				const objUrl   = URL.createObjectURL(blob)
				blobs.push(blob)
				objUrls.push(objUrl)
			}
			return { blobs, objUrls }
		} else { // # Single
			const url      = urls
			const response = await fetch(url, { mode: 'cors' })
			const blob     = await response.blob()
			const objUrl   = URL.createObjectURL(blob)
			return { blob, objUrl }
		}
	}
}

Comlink.expose(BlobLoader, self)