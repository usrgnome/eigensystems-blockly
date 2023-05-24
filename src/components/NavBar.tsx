import React from 'react'
import styles from '@/styles/Home.module.css'
import '../blockly/blocks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Select from 'react-select';
import {
    faCode,
    faMousePointer,
    faPlay
} from '@fortawesome/free-solid-svg-icons'
import { Difficulty } from '@/utils/utils';

type NavbarComponentProps = {
    setMode: (mode: string) => void
    setDifficulty: React.Dispatch<React.SetStateAction<Difficulty>>
    difficulty: Difficulty
}

const difficultyOptions = [
            { value: Difficulty.EASY, label: 'Easy' },
            { value: Difficulty.HARD, label: 'Hard' }
];

const Navbar = ({ setMode, setDifficulty, difficulty }: NavbarComponentProps) => {
    const handleDifficultyChange = (option: { value: Difficulty, label: string } | null) => {
        if (option) {
            setDifficulty(option.value);
        }
    }

    return (
        <div className={styles.navbar}>
            <div
                className={styles.navbarBtn}
                onClick={() => {
                    setMode('d&d')
                }}
            >
                <FontAwesomeIcon
                    icon={faMousePointer}
                    className={styles.navbarBtnIcon}
                ></FontAwesomeIcon>{' '}
                Drag & Drop
            </div>
            <div
                className={styles.navbarBtn}
                onClick={() => {
                    setMode('inspect')
                }}
            >
                <FontAwesomeIcon
                    icon={faCode}
                    className={styles.navbarBtnIcon}
                ></FontAwesomeIcon>
                Inspect Code
            </div>
            <div className={styles.navbarBtn}>
                <FontAwesomeIcon
                    icon={faPlay}
                    className={styles.navbarBtnIcon}
                ></FontAwesomeIcon>
                Run
            </div>
            <div className={styles.dropdown}>
                <div className={styles.dropdownText}>Difficulty</div>
                <Select
                    inputId="react-select-input"
                    options={difficultyOptions}
                    onChange={option => handleDifficultyChange(option)}
                    value={difficultyOptions.find(o => o.value === difficulty)} // Find the option that matches the current difficulty
                    styles={{
                        singleValue: (base) => ({ ...base, color: "white" }),
                        valueContainer: (base) => ({
                            ...base,
                            color: "white",
                            width: "100%"
                        }),
                        option: (defaultStyles, { isSelected }) => ({
                            ...defaultStyles,
                            backgroundColor: isSelected
                                ? "#a0a0a0"
                                : "#1b1c1d",
                            color: "#fff",
                        }),
                        control: (defaultStyles) => ({
                            ...defaultStyles,
                            backgroundColor: "#1b1c1d",
                            padding: "10px",
                            border: "none",
                            boxShadow: "none",
                        }),
                        menu: (provided) => ({
                            ...provided,
                            color: 'white',
                            backgroundColor: '#1b1c1d',
                        })
                    }}
                />
            </div>
        </div>
    )
}
export default Navbar;