import React, { useEffect, useRef } from 'react';
import styles from '@/styles/BlocklyComponent.module.css'
import Blockly from 'blockly';
import { PropsWithChildren } from 'react'
import { qasmGenerator } from '@/generator/generator';

type BlocklyComponentProps = {
  trashcan: boolean,
  media: string,
  move: object,
}

const BlocklyComponent = (props: PropsWithChildren<BlocklyComponentProps>) => {
  const blocklyDiv = useRef<HTMLInputElement | null>(null);
  const toolbox = useRef<HTMLInputElement | null>(null);
  const primaryWorkspace = useRef<Blockly.WorkspaceSvg | null>(null);
  const workspaceInjected = useRef(false);

  useEffect(() => {
    const { ...rest } = props;

    if (blocklyDiv.current && toolbox.current && !workspaceInjected.current) {
      primaryWorkspace.current = Blockly.inject(
        blocklyDiv.current,
        {
          toolbox: toolbox.current,
          ...rest
        },
      );
      workspaceInjected.current = true;
    }
  }, [primaryWorkspace, toolbox, blocklyDiv, props]);

  const generateCode = () => {
    var code = qasmGenerator.workspaceToCode(
      primaryWorkspace.current
    );
    console.log(code);
  }

  return (
    <>
     <button onClick={generateCode}>Convert</button>
      <div ref={blocklyDiv} className={styles.main} id="blocklyDiv" />
      <div ref={toolbox}>
        {props.children}
      </div>
    </>
  )
}
export default BlocklyComponent;