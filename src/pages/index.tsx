import React, { useState } from 'react'
import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import '../blockly/blocks'
import AppContainer from './app'
import Navbar from '../components/NavBar'
import { Difficulty } from '@/utils/utils';

const Home = () => {
  const [mode, setMode] = useState('d&d')
  const [difficulty, setDifficulty] = useState(Difficulty.EASY)

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
        <Navbar setMode={setMode} setDifficulty={setDifficulty} difficulty={difficulty}/>
        <AppContainer mode={mode} difficulty={difficulty}/>
      </div>
    </>
  )
}

export default Home
