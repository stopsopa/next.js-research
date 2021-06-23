
import { useState, useEffect } from 'react';

import Link from 'next/link'

import Image from 'next/image'

// doesn't seem to work,
// I have error
// #15 8.240 Module parse failed: Unexpected character '�' (1:0)
// #15 8.240 You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
// #15 8.240 (Source code omitted for this binary file)
// : https://github.com/vercel/next.js/issues/9209

// import src from '../public/lima4.png'

/**
 * https://nextjs.org/docs/advanced-features/preview-mode
 */
export default function Images({
}) {

  return (

    <div className="preview">
      <h1>images</h1>
      <Link href="/" as="/">
        <a>Home</a>
      </Link>

      <hr/>

      {/*<Image*/}
      {/*  src={src}*/}
      {/*  alt="Picture of the author"*/}
      {/*  // width={500} automatically provided*/}
      {/*  // height={500} automatically provided*/}
      {/*  // blurDataURL="data:..." automatically provided*/}
      {/*  // Optionally allows to add a blurred version of the image while loading*/}
      {/*  // placeholder="blur"*/}
      {/*/>*/}
      {/*<hr/>*/}

      <Image
        src="/lima2.jpg"
        alt="lima2"
        width={849}
        height={810}
      />

      <hr/>

      <Image
        src="/lima1.jpg"
        alt="lima1"
        width={760}
        height={480}
      />

      <hr/>

      <Image
        src="/lima3.jpg"
        alt="lima3"
        width={700}
        height={550}
      />

      <hr/>

      <Image
        src="/lima4.jpg"
        alt="lima4"
        width={700}
        height={450}
      />

      <hr/>

    </div>
  )
}