# deploy with docker

https://nextjs.org/docs/deployment#docker-image

# data fetching
getStaticProps (Static Generation)
https://nextjs.org/docs/basic-features/data-fetching

# testing what is stripped
https://next-code-elimination.vercel.app

from: https://nextjs.org/docs/basic-features/data-fetching#write-server-side-code-directly

# This demo features
## yaml based fake api

Run in console
```js
var r = await fetch('/api/yaml/abc'); console.log(JSON.stringify(await r.json(), null, 4))
```

# typescript
- https://nextjs.org/docs/basic-features/data-fetching#typescript-use-getstaticpaths
- https://nextjs.org/docs/basic-features/data-fetching#typescript-use-getserversideprops

# passHref
https://nextjs.org/docs/api-reference/next/link#if-the-child-is-a-function-component

# tips

You cannot use getStaticPaths [with](https://nextjs.org/docs/basic-features/data-fetching#technical-details-1) getServerSideProps.

# todo
- check if preprocessor needed: https://nextjs.org/docs/basic-features/environment-variables#exposing-environment-variables-to-the-browser
- remember me checkbox - login form