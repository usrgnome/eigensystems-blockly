import Editor from '@monaco-editor/react'
import styles from '@/styles/Home.module.css'
import React from 'react'

export default function CodeArea ({
  code,
  showCircuit,
  visible
}: {
  visible: boolean;
  code: string
  showCircuit: () => any
}) {
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

        }}
      />
      <button
        onClick={showCircuit}
        className={styles.convertBtn}
      >
        Show circuit 
      </button>
    </div>
  )
}
