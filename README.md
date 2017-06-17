# vagalume-api [![Build Status](https://travis-ci.org/gpedro/vagalume-api.svg?branch=master)](https://travis-ci.org/gpedro/vagalume-api)

## Install

```
$ npm install vagalume
```


## Usage

```js
const Vagalume = require('vagalume');
const vagalume = new Vagalume(apikey);

vagalume.artist('u2').then(response => {
	console.log(response.artist.id)
	//=> '3ade68b2g3b86eda3'
})
```

## API

### vagalume.artist(artist, options)
### vagalume.lyrics(options)
### vagalume.search(type, query, limit, options)
### vagalume.discography(artist, options)
### vagalume.hotspots(options)
### vagalume.news(options)
### vagalume.artistImage(artistId, limit, options)

## License

MIT © [Gabriel Pedro](https://github.com/gpedro)