
import Link from 'next/link'

import log from 'inspc';

/**
 * https://nextjs.org/docs/advanced-features/preview-mode
 */
export default function Render({
  preview,
  previewData,
}) {

  return (
    <div>
      <h1>Preview renderer</h1>
      <pre>{JSON.stringify({
        preview,
        previewData,
      }, null, 4)}</pre>
    </div>
  )
}

export async function getStaticProps({
  preview = false,
  previewData = {nothing: 'is here'},
}) {

  console.log(`================ /preview/render getStaticProps(${JSON.stringify({preview, previewData})})`)

  return {
    props: {
      preview,
      previewData,
    },
  }
}