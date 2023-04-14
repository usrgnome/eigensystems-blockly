import React, { useState } from 'react';
import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import BlocklyComponent, { Block, Category } from '../blockly/components';
import '../blockly/blocks';
import { titles as gateBlocksTitles } from '../blockly/blocks/gateblocks';
import { titles as otherBlocksTitles } from '../blockly/blocks/otherblocks';
import { titles as variableBlocksTitles } from '../blockly/blocks/variableblocks';
import ProbabilitiesGraph from '../components/Graph';
import QasmText from '../components/QasmOutput';

const Home = () => {
  const [data, setData] = useState([]);
  const [qasmBox, setQasmBox] = useState("");

  return (
    <>
      <Head>
        <title>Quokka Blockly</title>
        <meta name="description" content="blockly app for the qasm language to be used by the Quokka computer" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.blockly}>
        <BlocklyComponent trashcan={true} media={'media/'}
          move={{
            scrollbars: true,
            drag: true,
            wheel: true
          }}
        >
          <Category name="Built-in Gate Blocks">
            {gateBlocksTitles.map((title, index) => <Block type={title} key={`gate ${index}`}/>)}
          </Category>
          <Category name="Variable Blocks">
            {variableBlocksTitles.map((title, index) => <Block type={title} key={`gate ${index}`}/>)}
          </Category>
          <Category name="Other Blocks">
            {otherBlocksTitles.map((title, index) => <Block type={title} key={`gate ${index}`}/>)}
          </Category>
        </BlocklyComponent>
      </div>
      <div className={styles.outputs}>
          <ProbabilitiesGraph data={data} />
          <QasmText qasm={qasmBox} />
      </div>
    </>
  )
}
export default Home;
