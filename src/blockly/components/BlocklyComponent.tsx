import React, { useEffect, useRef } from 'react'
import styles from '@/styles/BlocklyComponent.module.css'
import Blockly from 'blockly'
import { PropsWithChildren } from 'react'
import { QasmBlockly } from '@/generator/generatorCollection'

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
  const newBlock = useRef<Blockly.Block | null>(null)

  useEffect(() => {
    const { ...rest } = props

    if (blocklyDiv.current && toolbox.current && !workspaceInjected.current) {
      primaryWorkspace.current = Blockly.inject(blocklyDiv.current, {
        toolbox: toolbox.current,
        ...rest,
        zoom:
        {
          controls: true,
          wheel: true,
          startScale: 1.0,
          maxScale: 3,
          minScale: 0.3,
          scaleSpeed: 1.2,
          pinch: true
        },
      })
      workspaceInjected.current = true

      primaryWorkspace.current.addChangeListener(() => {
        const qasm = generateCode().qasm
        let qasmString = '';
        qasm.forEach(line => qasmString += line)
        props.setQASM(qasmString)
      })

      const blockName = 'entry' // Name of block to add

      const block = (newBlock.current =
        primaryWorkspace.current.newBlock(blockName))
      block.initSvg()
      block.render()

    }
  }, [primaryWorkspace, toolbox, blocklyDiv, props])

  // create an object that will store the parsed blockly blocks to a collection of qasm nodes

  // populate the collection with nodes
  const generateCode = () => {
    const collection = new QasmBlockly()
    const compiled = collection.compile(primaryWorkspace.current, newBlock.current);

    return compiled
  }

  return (
    <>
      <div ref={blocklyDiv} className={styles.main} id='blocklyDiv' />
      <div ref={toolbox}>{props.children}</div>
    </>
  )
}
export default BlocklyComponent
