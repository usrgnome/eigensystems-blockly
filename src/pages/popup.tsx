import React, { useState } from 'react'
import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import BlocklyComponent, { Block, Category } from '../blockly/components'
import '../blockly/blocks'
import { titles as gateBlocksTitles } from '../blockly/blocks/gateblocks'
import { titles as otherBlocksTitles } from '../blockly/blocks/otherblocks'
import { titles as variableBlocksTitles } from '../blockly/blocks/variableblocks'
import ProbabilitiesGraph from '../components/Graph'
import QasmText from '../components/QasmOutput'
import AppContainer from './app'

export default function Popup ({
  svg,
  closeFn
}: {
  svg: any
  closeFn: () => void
}) {
  //console.log(data, qasmBox);
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
