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

const Home = () => {
  //console.log(data, qasmBox);
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

      <AppContainer/>
    </>
  )
}

/*
        <div className={styles.outputs}>
          <ProbabilitiesGraph data={data} />
          <QasmText qasm={qasmBox} />
        </div>

*/

export default Home
