'use client';

import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import MenuGroups from '@/components/MenuGroups';
import MenuGroupsOpen from '@/components/MenuGroupsOpen';

type UserInput = { [key: string]: string | undefined };
type UserInput1 = { [key: string]: string | undefined };

const inputIdentifiers = ['input2', 'input3', 'input4', 'input5', 'input6', 'input7'] as const;

export default function AllIngredients() {
    const [userInput, setUserInput] = useState<UserInput>({});
    const [userInput1, setUserInput1] = useState<UserInput1>({});

    useEffect(() => {
        console.log('checkTasks=', localStorage.getItem('userInputs'));
        const savedInputs: UserInput = JSON.parse(localStorage.getItem('userInputs') || '');
        setUserInput(savedInputs);
        const savedInput1: UserInput1 = JSON.parse(localStorage.getItem('userInputs') || '');
        setUserInput1(savedInput1);
    }, []);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        identifier: (typeof inputIdentifiers)[number] | 'input1',
    ) => {
        if (identifier === 'input1') {
            const newInputs1: UserInput1 = {
                ...userInput,
                input1: e.target.value,
            };
            setUserInput1(newInputs1);
            localStorage.setItem('userInputs', JSON.stringify(newInputs1));
            console.log('checkTasks=', localStorage.getItem('userInputs'));
        } else {
            const newInputs: UserInput = {
                ...userInput,
                [identifier]: e.target.value,
            };
            setUserInput(newInputs);
            localStorage.setItem('userInputs', JSON.stringify(userInput));
            console.log('checkTasks=', localStorage.getItem('userInputs'));
        }
    };

    return (
        <>
            <div className={styles.container_top}>
                <div className={styles.container_text}>
                    <div>
                        <MenuGroupsOpen />
                    </div>
                    <input
                        className={styles.container_input}
                        type='text'
                        value={userInput1['input1'] || ''}
                        maxLength={27}
                        onChange={(e) => handleInputChange(e, 'input1')}
                        placeholder='Меню для...'
                    />
                </div>
                {inputIdentifiers.map((identifier) => (
                    <div key={identifier} className={styles.container_text}>
                        <div>
                            <MenuGroups />
                        </div>
                        <input
                            className={styles.container_input}
                            type='text'
                            value={userInput[identifier] || ''}
                            maxLength={27}
                            onChange={(e) => handleInputChange(e, identifier)}
                            placeholder='Меню для...'
                        />
                    </div>
                ))}
            </div>
        </>
    );
}
