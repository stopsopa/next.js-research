
import React from 'react'

import styles from './StyledComponent.module.css'

/**
 * https://nextjs.org/docs/basic-features/built-in-css-support#adding-component-level-css
 */
export default function StyledComponent(props) {

  return (
    <div className={styles.styled}>
      styled component
    </div>
  )
}