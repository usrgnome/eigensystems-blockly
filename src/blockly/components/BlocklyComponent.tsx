import React, { useEffect, useRef } from 'react'
import styles from '@/styles/BlocklyComponent.module.css'
import Blockly from 'blockly'
import { PropsWithChildren } from 'react'
import { qasmGenerator, useCollection } from '@/generator/generator'
import { QasmBlockCollection } from '@/generator/generatorCollection'

type BlocklyComponentProps = {
  trashcan: boolean
  media: string
  move: object
  setQASM: (qasm: string) => void
}

const BlocklyComponent = (props: PropsWithChildren<BlocklyComponentProps>) => {
  const blocklyDiv = useRef<HTMLInputElement | null>(null)
  const toolbox = useRef<HTMLInputElement | null>(null)
  const primaryWorkspace = useRef<Blockly.WorkspaceSvg | null>(null)
  const workspaceInjected = useRef(false)

  useEffect(() => {
    const { ...rest } = props

    if (blocklyDiv.current && toolbox.current && !workspaceInjected.current) {
      primaryWorkspace.current = Blockly.inject(blocklyDiv.current, {
        toolbox: toolbox.current,
        ...rest
      })
      workspaceInjected.current = true

      primaryWorkspace.current.addChangeListener(() => {
        console.log('change occured!!!!');
        console.log(props.setQASM);

        const qasm = generateCode().qasm;
        let qasm_string = qasm.reduce((previous_string, current_string) => previous_string + current_string[0]);

        props.setQASM(qasm_string);
      })
    }
  }, [primaryWorkspace, toolbox, blocklyDiv, props])

  // create an object that will store the parsed blockly blocks to a collection of qasm nodes

  // populate the collection with nodes
  const generateCode = () => {
    const collection = new QasmBlockCollection()
    useCollection(collection)
    var code = qasmGenerator.workspaceToCode(primaryWorkspace.current)
    console.log(collection.blocks)
    const compiled = collection.compile();
    console.log(compiled);
    return compiled;
  }

  return (
    <>
      <div ref={blocklyDiv} className={styles.main} id='blocklyDiv' />
      <div ref={toolbox}>{props.children}</div>
    </>
  )
}
export default BlocklyComponent
