
import React from 'react'

import './ScssComponent.scss'

/**
 * This will not work
 * https://nextjs.org/docs/basic-features/built-in-css-support#adding-component-level-css
 */
export default function ScssComponent(props) {
  return (
    <div className="scss">
      styled component
    </div>
  )
}