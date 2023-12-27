'use client';
import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import BuyForDay from '@/components/BuyForDay';
import Dinner from '@/components/Dinner';
import Starters from '@/components/Starters';

export default function Temp() {
    const [ingredients, setIngredients] = useState<any[]>([]);
    const [label, setLabel] = useState<any[]>([]);
    const [image, setImage] = useState<any[]>([]);
    const [numberHuman, setNumberHuman] = useState<any[]>([]);
    const [openMenu, setOpenMenu] = useState(true);
    const handleClick = () => {
        setOpenMenu((prevValue) => !prevValue);
    };

    return (
        <>
            <div className={styles.container_top}>
                <button type='button' className={styles.menuGroup} onClick={handleClick}>
                    {openMenu ? 'Возврат к меню' : 'Выбор категорий'}
                </button>
                {openMenu && (
                    <div className={styles.container_popup}>
                        <Starters setIngredients={setIngredients} setLabel={setLabel} />
                        <Starters setIngredients={setIngredients} setLabel={setLabel} />
                        <Starters setIngredients={setIngredients} setLabel={setLabel} />
                        <Starters setIngredients={setIngredients} setLabel={setLabel} />
                        <Dinner setIngredients={setIngredients} />
                    </div>
                )}
            </div>
            <BuyForDay ingredients={ingredients} label={label} image={image} numberHuman={numberHuman} isOpen={false} />
        </>
    );
}
