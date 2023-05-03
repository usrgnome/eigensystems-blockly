import Editor, { Monaco } from '@monaco-editor/react'
import styles from '@/styles/Home.module.css'
import React, { useState } from 'react'

export default function CodeArea ({
  code,
  showCircuit,
  visible
}: {
  visible: boolean;
  code: string
  showCircuit: () => any
}) {
  const [codetxt, setCode] = useState('')
  const [txt, setTxt] = useState('')

  console.log(codetxt, code, 'WTF!!!!1')

  return (
    <div className={styles.outputDiv} style={{display: visible ? "block" : "none"}}>
      <Editor
        height='100%'
        width='100%'
        defaultLanguage=''
        defaultValue={code}
        value={code}
        options={{readOnly: true}}
        onMount={a => {
          //console.log('wtf', a);
        }}
      />
      <button
        onClick={showCircuit}
        className={styles.convertBtn}
      >
        Show circuit {visible ? "true" : "false"}
      </button>
    </div>
  )
}
