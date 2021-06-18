# deploy with docker

https://nextjs.org/docs/deployment#docker-image

# data fetching
getStaticProps (Static Generation)
https://nextjs.org/docs/basic-features/data-fetching

# This demo features
## yaml based fake api

Run in console
```js
var r = await fetch('/api/yaml/abc'); console.log(JSON.stringify(await r.json(), null, 4))
```