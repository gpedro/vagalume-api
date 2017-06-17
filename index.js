import 'whatwg-fetch';
import 'babel-polyfill';
import { stringify } from 'querystring';
import dashify from 'dashify';

const webBaseUrl = 'https://www.vagalume.com.br';
const apiBaseUrl = 'https://api.vagalume.com.br';

class Vagalume {

	constructor(apikey) {
		this.apikey = apikey;
	}

	_fetch(url, params = []) {
		if (this.apikey && !params['apikey']) {
			params['apikey'] = this.apikey;
		}

		var qs = stringify(params);
		return fetch(`${url}?${qs}`).then(res => res.json())
	}

	async artist(artist, options = {}) {
		const slug = dashify(artist);
		return this._fetch(`${webBaseUrl}/${slug}/index.js`, options);
	}

	async lyrics(options) {
		if (options.musid && (options.art || options.mus)) {
			delete options.art;
			delete options.mus;
		}

		if (options.extra) {
			if (options.extra instanceof Array) {
				options.extra = options.extra.join(',');
			}
		}

		return this._fetch(`${apiBaseUrl}/search.php`, options);
	}

	async search(type = 'art' , query = '', limit = 5, options = {}) {
		if (['art', 'excerpt', 'artmus', 'alb'].indexOf(type) === -1) {
			throw new Error('Tipo inválido. Disponíveis: art, excerpt, artmus, alb');
		}
		
		options.q = query || '';
		options.limit = limit || 5;

		return this._fetch(`${apiBaseUrl}/search.${type}`, options);
	}

	async discography(artist, options) {
		const slug = dashify(artist);
		return this._fetch(`${webBaseUrl}/${slug}/discografia/index.js`, options);
	}

	async hotspots(options) {
		return this._fetch(`${apiBaseUrl}/hotspots.php`, options);
	}

	async news(options) {
		return this._fetch(`${webBaseUrl}/news/index.js`, options);	
	}

	async artistImage(artistId, limit = 3, options = {}) {
		options.bandID = artistId;
		options.limit = limit || 3;
		return this._fetch(`${apiBaseUrl}/image.php`, options);
	}
}

if (typeof module !== 'undefined' && module.exports) {
	module.exports = Vagalume;
} else {
	window.Vagalume = Vagalume;
}