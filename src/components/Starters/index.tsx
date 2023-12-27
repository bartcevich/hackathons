'use client';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { getBreakfastData, getLunchData, getDinnerData } from '@/services/getData';
//import Svg from '@/assets/images/23472-2196f3.svg';

interface MondayProps {
    setIngredients: React.Dispatch<React.SetStateAction<any[]>>;
    setLabel: React.Dispatch<React.SetStateAction<any[]>>;
}
interface MealData {
    value: { [key: string]: number | undefined };
    label: string;
    Image: string;
}

const Monday: React.FC<MondayProps> = (props) => {
    const Starters_dessert: MealData[] = getBreakfastData();
    //const first_courses_soup: MealData[] = getLunchData();
    //const Main_courses: MealData[] = getDinnerData();
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
    useEffect(() => {
        let sundayImageArr: any[] = [];
        sundayImageArr.push(sundayImage);
        let sundayLabelArr: any[] = [];
        sundayLabelArr.push(sundayLabel); //111
        let sundayCountArr: any[] = [];
        sundayCountArr.push(count);
        let countIngredients: any[] = []; //умноженный вес ингридиентов
        for (let i = 0; i < sundayValue.length; i++) {
            countIngredients.push(sundayValue[i][0]);
            countIngredients.push(sundayValue[i][1] * count);
        }
        if (count === 1) {
            sundayLabelArr.push(`Для ${count} человека.`); //2222
        } else if (count > 1) {
            sundayLabelArr.push(`Для ${count} человек.`);
        }
        sundayLabelArr.push(sundayImageArr); ///3333
        sundayValue.length > 0 ? props.setLabel(sundayLabelArr) : false;
        sundayValue.length > 0 ? props.setIngredients(countIngredients) : false;
    }, [sunday, count, props.setIngredients]);

    return (
        <>
            <div className={styles.container_top}>
                <div className={styles.image}>{sundayImage !== '' && <img src={sundayImage} alt='Image' />}</div>
                <div>
                    <div className={styles.container}>
                        <select onChange={handleSelectChange}>
                            <option value=''>Вторые блюда</option>
                            {Starters_dessert.map((option, index) => (
                                <option key={index} value={option.label}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.container_button}>
                        <div className={styles.container_text}>колличество порций</div>
                        <button type='button' onClick={() => setCount(count < 2 ? 1 : count - 1)}>
                            -
                        </button>
                        <b>{count}</b>
                        <button type='button' onClick={() => setCount(count > 99 ? 100 : count + 1)}>
                            +
                        </button>
                    </div>
                </div>
            </div>
            <div className={styles.container_ingredients}>
                {sundayValue.map(([key, value], index) => (
                    <div key={index}>{`${key}: ${value * count}`}</div>
                ))}
            </div>
        </>
    );
};
export default Monday;
