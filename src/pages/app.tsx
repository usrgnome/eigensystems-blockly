import styles from '@/styles/Home.module.css'
import BlocklyComponent, { Block, Category } from '../blockly/components'
import Blockly from 'blockly'
import React, { useState, useEffect } from 'react'
import { titles as gateBlocksTitles } from '../blockly/blocks/gateblocks'
import { titles as otherBlocksTitles } from '../blockly/blocks/otherblocks'
import { titles as variableBlocksTitles } from '../blockly/blocks/variableblocks'
import CodeArea from './CodeArea'
import Popup from './popup'
const QuantumCircuit = require('../lib/quantum-circuit')

export default function AppContainer({ mode }: { mode: string }) {
  const [qasmBox, setQasmBox] = useState('')
  const [popupOpen, setPopupState] = useState(0)

  useEffect(() => {
    //console.log(qasmBox)
  }, [qasmBox])

  function closePopup() {
    setPopupState(0)
  }

  function showPopup() {
    setPopupState(1)
  }

  const circuit = new QuantumCircuit(3)
  circuit.importQASM(qasmBox, (err: string[]) => {
    if (err && err.length > 0) return console.log('error', qasmBox, err)
  })

  const svg = circuit.exportSVG(true);

  const categoryStyles = {
    'gate_category': {
      'colour': '%{BKY_GATE_HUE}'
    },
    'variable_category': {
      'colour': '%{BKY_VARIABLES_HUE}',
    },
    'other_category': {
      'colour': '%{BKY_OTHER_HUE}',
    }
  };
  
  const categoryNameToStyle = {
    'Gate': 'gate_category',
    'Var': 'variable_category',
    'Other': 'other_category'
  };

  Blockly.Themes.Classic.categoryStyles.gate_category = categoryStyles.gate_category;
  Blockly.Themes.Classic.categoryStyles.variable_category = categoryStyles.variable_category;
  Blockly.Themes.Classic.categoryStyles.other_category = categoryStyles.other_category;

  return (
    <div className={styles.container}>
      <div className={styles.appcontainer}>
        <div className={styles.blockly} style={{ display: mode === "d&d" ? "block" : "none" }}>
          <BlocklyComponent
            setQASM={(qasm: string) => {
              setQasmBox(qasm)
            }}
            trashcan
            media={'media/'}
            move={{
              scrollbars: true,
              drag: true,
              wheel: true
            }}
          >
            <Category name='Built-in Gate Blocks' categoryStyle={categoryNameToStyle['Gate']}>
              {gateBlocksTitles.map((title, index) => (
                <Block type={title} key={`gate ${index}`} />
              ))}
            </Category>
            <Category name='Variable Blocks' categoryStyle={categoryNameToStyle['Var']}>
              {variableBlocksTitles.map((title, index) => (
                <Block type={title} key={`var ${index}`} />
              ))}
            </Category>
            <Category name='Other Blocks' categoryStyle={categoryNameToStyle['Other']}>
              {otherBlocksTitles.map((title, index) => (
                <Block type={title} key={`other ${index}`} />
              ))}
            </Category>
          </BlocklyComponent>
        </div>
        <CodeArea visible={mode === 'inspect'} code={qasmBox} showCircuit={showPopup}></CodeArea>
      </div>
      {popupOpen ? <Popup svg={svg} closeFn={closePopup}></Popup> : null}
    </div>
  )
}
