import Editor, { Monaco } from '@monaco-editor/react'
import styles from '@/styles/Home.module.css'
import BlocklyComponent, { Block, Category } from '../blockly/components'
import React, { useState } from 'react'
import { titles as gateBlocksTitles } from '../blockly/blocks/gateblocks'
import { titles as otherBlocksTitles } from '../blockly/blocks/otherblocks'
import { titles as variableBlocksTitles } from '../blockly/blocks/variableblocks'
import CodeArea from './CodeArea'

export default function AppContainer () {
  const [data, setData] = useState(['bob'])
  const [qasmBox, setQasmBox] = useState('')

  console.log('re-render app container');

  return (
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
            wheel: true
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

      <CodeArea code={qasmBox}></CodeArea>
    </div>
  )
}
