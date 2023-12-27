'use client';
import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface BuyForDayProps {
    ingredients: any[];
    label: any[];
    image: any[];
    numberHuman: any[];
    isOpen: boolean;
}

const BuyForDay: React.FC<BuyForDayProps> = (props) => {
    const [labelPrev, setLabelPrev] = useState<any[]>([]);
    const [prevPrevHistory, setPrevPrevHistory] = useState<any[]>([]);

    const [ingredientHistory, setIngredientHistory] = useState<BuyForDayProps[]>([]);
    let updatedHistory: any[] = [];
    useEffect(() => {
        const newIngredient: BuyForDayProps = {
            ingredients: props.ingredients,
            label: props.label[0],
            image: props.label[2] === props.label[0] ? [] : props.label[2],
            numberHuman: props.label[1],
            isOpen: false,
        };
        console.log(newIngredient);
        setIngredientHistory((prevHistory) => {
            if (props.label[0] !== labelPrev[0]) {
                //проверяю ? для нового блюда ингредиенты
                setPrevPrevHistory(prevHistory); //сохраняю состояние до изменения ингредиентов
                updatedHistory = [...prevHistory, newIngredient]; //к старым добавляю новое
                setLabelPrev(props.label); //сохраняю имя последнего блюда
            } else {
                updatedHistory = [...prevPrevHistory, newIngredient]; //только обновляется последнее блюдо
            }
            if (updatedHistory.length > 5) {
                return updatedHistory.slice(1);
            }
            return updatedHistory;
        });
    }, [props.ingredients, props.label, props.image]);
    const [openMenu, setOpenMenu] = useState(false);
    const handleClick = () => {
        setOpenMenu((prevValue) => !prevValue);
    };
    const handleRemove = (indexToRemove: number) => {
        setIngredientHistory((prev) => prev.filter((_, index) => index !== indexToRemove));
    };
    const handleViewIngredients = (index: number) => {
        setIngredientHistory((prevHistory) => {
            const updatedHistory = prevHistory.map((item, idx) => {
                if (idx === index) {
                    return { ...item, isOpen: !item.isOpen };
                }
                return item;
            });
            return updatedHistory;
        });
    };
    const allIngredients: any[] = [];
    let oneArrIngredients: any[] = []; //один массив всех ингридиентов
    const sumArrPrint: any[] = []; //массив с суммированными значениями
    ingredientHistory.map((ingredient, index) => {
        sumArrPrint.length = 0;
        allIngredients.length = 0;
        allIngredients.push(ingredient.ingredients); //массив с массивами всех ингридиентов
        allIngredients.forEach((el) => (oneArrIngredients = oneArrIngredients.concat(el)));
        //console.log(oneArrIngredients);
        const uniqueIngredients = new Set(oneArrIngredients); //уникальные элементы
        const uniqueIngredientsArr = Array.from(uniqueIngredients); // массив уникальных элементов
        //console.log(uniqueIngredientsArr);
        for (let i = 0; i < uniqueIngredientsArr.length; i++) {
            typeof uniqueIngredientsArr[i] === 'string' ? search(uniqueIngredientsArr[i]) : i;
        }
    });
    function search(ingredients: any) {
        let tempNumber = 0;
        let tempString = '';
        for (let r = 0; r < oneArrIngredients.length; r++) {
            typeof oneArrIngredients[r] === 'string'
                ? (tempString = oneArrIngredients[r])
                : (tempString = oneArrIngredients[r]);
            if (ingredients === tempString) {
                tempNumber = tempNumber + oneArrIngredients[r + 1];
            }
        }
        sumArrPrint.push(ingredients);
        sumArrPrint.push(tempNumber);
    }
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const handleToggle = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };
    const [sumIngredients, setSumIngredients] = useState(false);
    const handleIngredients = () => {
        setSumIngredients((prevValue) => !prevValue);
    };

    return (
        <>
            {ingredientHistory.map((ingredient, index) => (
                <div key={index}>
                    <div className={styles.container}>
                        <div className={styles.image}>
                            {ingredient.image.join('') !== '' && <img src={ingredient.image.join('')} alt='Image' />}
                        </div>
                        <div>
                            <div className={styles.label}>
                                {ingredient.numberHuman}
                                {ingredient.label}
                            </div>
                            <div className={styles.button}>
                                {activeIndex === index && (
                                    <div className={styles.dropdownContent}>
                                        <button type='button' onClick={() => handleViewIngredients(index)}>
                                            Смотреть состав.
                                        </button>
                                        <button type='button' onClick={() => handleRemove(index)}>
                                            Удалить.
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className={styles.dropdownIcon} onClick={() => handleToggle(index)}>
                                &#8942;
                            </div>
                            {ingredient.isOpen && (
                                <div className={styles.ingredientCourse}>
                                    {ingredient.ingredients.map((item, idx) => (
                                        <p key={idx}>{item}</p>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
            <button onClick={handleIngredients}>
                <FontAwesomeIcon icon={faCartShopping} />
            </button>
            {sumIngredients && <div>{sumArrPrint.join(',  ')}</div>}
        </>
    );
};

export default BuyForDay;
