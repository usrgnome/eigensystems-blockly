import React from 'react'
import styles from '@/styles/Home.module.css'
import '../blockly/blocks'

export default function Popup ({
  svg,
  closeFn
}: {
  svg: any
  closeFn: () => void
}) {
  return (
    <div className={styles.popup}>
      <div className={styles.popup_content}>
        <a href='#' className={styles.popup_close} onClick={closeFn}>
          &times;
        </a>
        <h3>QASM Circuit</h3>
        <div dangerouslySetInnerHTML={{ __html: svg }}></div>
      </div>
    </div>
  )
}
