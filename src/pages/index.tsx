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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCode,
  faICursor,
  faMousePointer,
  faPlay
} from '@fortawesome/free-solid-svg-icons'

const Home = () => {
  const [mode, setMode] = useState('d&d')

  return (
    <>
      <Head>
        <title>Quokka Blockly</title>
        <meta
          name='description'
          content='blockly app for the qasm language to be used by the Quokka computer'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className={styles.app}>
        <div className={styles.navbar}>
          <div
            className={styles.navbarBtn}
            onClick={() => {
              setMode('d&d')
            }}
          >
            <FontAwesomeIcon
              icon={faMousePointer}
              className={styles.navbarBtnIcon}
            ></FontAwesomeIcon>{' '}
            Drag & Drop
          </div>
          <div
            className={styles.navbarBtn}
            onClick={() => {
              setMode('inspect')
            }}
          >
            <FontAwesomeIcon
              icon={faCode}
              className={styles.navbarBtnIcon}
            ></FontAwesomeIcon>
            Inspect Code
          </div>
          <div className={styles.navbarBtn}>
            <FontAwesomeIcon
              icon={faPlay}
              className={styles.navbarBtnIcon}
            ></FontAwesomeIcon>
            Run
          </div>
        </div>

        <AppContainer mode={mode} />
      </div>
    </>
  )
}

export default Home
