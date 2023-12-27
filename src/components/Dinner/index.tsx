/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';

interface LanguageOption {
    value: { [key: string]: any };
    label: string;
    Image: string;
}
interface MondayProps {
    setIngredients: React.Dispatch<React.SetStateAction<any[]>>;
}

const Starters_dessert: LanguageOption[] = [
    {
        value: { Сахар_гр: 25, Milk_гр: 20 },
        label: 'Генкиbeeg',
        Image: 'https://bartcevich.github.io/letter/image/Mask%20Group.png',
    },
    {
        value: { Яйца_шт: 1, Сахар_гр: 5, Milk_гр: 100 },
        label: 'Омлет',
        Image: 'https://bartcevich.github.io/letter/image/Mask%20Group.png',
    },
];

const Monday: React.FC<MondayProps> = (props) => {
    const [sunday, setSunday] = useState('');
    const [sundayValue, setSundayValue] = useState<any[]>([]);
    const [sundayImage, setSundayImage] = useState('');
    const [sundayLabel, setSundayLabel] = useState('');
    const [count, setCount] = useState(1);

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedLabel = event.target.value;
        const selectedOption = Starters_dessert.find((option) => option.label === selectedLabel);

        if (selectedOption) {
            setSunday(selectedLabel);
            setSundayImage(selectedOption.Image);
            setSundayLabel(selectedOption.label);
            setSundayValue(Object.entries(selectedOption.value));
            //props.setIngredients(Object.entries(selectedOption.value));
        }
    };
    const [stateCountIngredients, setStateCountIngredients] = useState<any[]>([]);
    useEffect(() => {
        let countIngredients: any[] = []; //умноженный вес ингридиентов
        for (let i = 0; i < sundayValue.length; i++) {
            countIngredients.push(sundayValue[i][0]);
            countIngredients.push(sundayValue[i][1] * count);
        }
        props.setIngredients(countIngredients);
        setStateCountIngredients(countIngredients);
    }, [sunday, count, props.setIngredients, props, sundayValue]);

    return (
        <div className={styles.container_top}>
            <div className={styles.image}>
                <div className={styles.image}>{sundayImage !== '' && <img src={sundayImage} alt='Image' />}</div>
            </div>
            <div className={styles.container}>
                <select onChange={handleSelectChange}>
                    <option value=''>Choose a dinner</option>
                    {Starters_dessert.map((option, index) => (
                        <option key={index} value={option.label}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
            <div className={styles.container_button}>
                <button type='button' onClick={() => setCount(count < 2 ? 1 : count - 1)}>
                    -
                </button>
                <b>{count}</b>
                <button type='button' onClick={() => setCount(count > 99 ? 100 : count + 1)}>
                    +
                </button>
                <span className={styles.container_text}>number of servings</span>
            </div>
            <div>{sundayLabel}</div>
            <div>
                {sundayValue.map(([key, value], index) => (
                    <div key={index}>{`${key}: ${value}`}</div>
                ))}
            </div>
            <div className={styles.container}>
                {' '}
                {stateCountIngredients.map((item, index) => (
                    <p key={index}>{item}</p>
                ))}{' '}
            </div>
        </div>
    );
};
export default Monday;
