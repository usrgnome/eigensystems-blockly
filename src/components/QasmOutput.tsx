import React from 'react';
import styles from '@/styles/QasmText.module.css';

type QasmProps = {
    qasm: string,
}

const QasmText = ({ qasm }: QasmProps) => {
    return (
        <label className={styles.code}>
            <pre>
                <code>
                    {qasm}
                </code>
            </pre>
        </label>
    );
}

export default QasmText;