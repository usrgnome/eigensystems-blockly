import Editor, { Monaco } from '@monaco-editor/react'
import styles from '@/styles/Home.module.css'
import React, { useState } from 'react'

export default function CodeArea ({ code }: { code: string }) {
  const [codetxt, setCode] = useState('')
  const [txt, setTxt] = useState('')

  console.log(codetxt, code, 'WTF!!!!1')

  return (
    <div className={styles.outputDiv}>
      <Editor
        height='100%'
        width='100%'
        defaultLanguage=''
        defaultValue={code}
        value={code}
        onMount={a => {
          //console.log('wtf', a);
        }}
      />
      <button
        onClick={() => {
          setCode('Hello world')
        }}
        className={styles.convertBtn}
      >
        {txt}
      </button>
      <input type="text" onChange={(e) => {
        const text = e.currentTarget.value;
        setTxt(text);
        console.log(text);

      }}></input>
    </div>
  )
}
