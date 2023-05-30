import React, { useEffect, useRef } from 'react'
import styles from '@/styles/BlocklyComponent.module.css'
import Blockly from 'blockly'
import { PropsWithChildren } from 'react'
import { qasmGenerator } from '@/generator/generator'

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

      primaryWorkspace.current.addChangeListener((evt) => {
        if(evt.type == Blockly.Events.BLOCK_CHANGE || evt.type === Blockly.Events.MOVE) {
        const qasmString = generateCode().output
        props.setQASM(qasmString)
        }
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
  function generateCode() {
    const workspace = primaryWorkspace.current;
    if(!workspace) throw 'No workspace found!';
    return new qasmGenerator().compile(workspace);
  }

  return (
    <>
      <div ref={blocklyDiv} className={styles.main} id='blocklyDiv' />
      <div ref={toolbox}>{props.children}</div>
    </>
  )
}
export default BlocklyComponent
