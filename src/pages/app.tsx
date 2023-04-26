import Editor, { Monaco } from '@monaco-editor/react'
import styles from '@/styles/Home.module.css'
import BlocklyComponent, { Block, Category } from '../blockly/components'
import React, { useState } from 'react'
import { titles as gateBlocksTitles } from '../blockly/blocks/gateblocks'
import { titles as otherBlocksTitles } from '../blockly/blocks/otherblocks'
import { titles as variableBlocksTitles } from '../blockly/blocks/variableblocks'
import CodeArea from './CodeArea'
import Popup from './popup'
const QuantumCircuit = require('../lib/quantum-circuit')

export default function AppContainer () {
  const [data, setData] = useState(['bob'])
  const [qasmBox, setQasmBox] = useState('')
  const [popupOpen, setPopupState] = useState(0)

  console.log('re-render app container')
  
  function closePopup(){
    setPopupState(0);
  }

  function showPopup(){
    setPopupState(1);
  }

  const circuit = new QuantumCircuit(3)
circuit.importQASM(qasmBox, (err: string[]) => {
  if (err && err.length > 0) return console.log('error', qasmBox, err)
})

  const svg = circuit.exportSVG(true)
  console.log(svg)

  return (
    <div className={styles.container}>
      <div className={styles.appcontainer}>
        <div className={styles.blockly}>
          <BlocklyComponent
            setQASM={(qasm: string) => {
              setQasmBox(qasm)
              setData(['dave'])
            }}
            trashcan={true}
            media={'media/'}
            move={{
              scrollbars: true,
              drag: true,
              wheel: true,
            }}
          >
            <Category name='Built-in Gate Blocks'>
              {gateBlocksTitles.map((title, index) => (
                <Block type={title} key={`gate ${index}`} />
              ))}
            </Category>
            <Category name='Variable Blocks'>
              {variableBlocksTitles.map((title, index) => (
                <Block type={title} key={`gate ${index}`} />
              ))}
            </Category>
            <Category name='Other Blocks'>
              {otherBlocksTitles.map((title, index) => (
                <Block type={title} key={`gate ${index}`} />
              ))}
            </Category>
          </BlocklyComponent>
        </div>

        <CodeArea code={qasmBox} showCircuit={showPopup}></CodeArea>
      </div>
      {popupOpen ? <Popup svg={svg} closeFn={closePopup}></Popup> : null}
    </div>
  )
}
