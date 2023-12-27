'use client';

import React from 'react';
import { FixedSizeList } from 'react-window';
import styles from './styles.module.scss';
import json from '@/assets/images/yandex_preds.json';
import { useState } from "react";

const LANGUAGE_OPTIONS: LanguageOption[] = [
  {  label: 'Генкиbeeg', value: { Сахар_гр: 25, Milk_гр: 20 },},
  { value: { Яйца_шт: 1, Сахар_гр: 5, Milk_гр: 100 }, label: 'Омлет'},
  {label: 'Бендерики', value: { Мука_пшеничная_г : 37, Вода_мл: 93 , Яйцо_куриное_шт: 0.7, Соль_ч_л: 0.1, Сахар_ч_л: 0.1, Масло_растительное_ст_л: 0.5, Грудка_куриная_г: 100, Лук_репчатый_шт: 0.2, Чеснок_зуб:0.3, Перец_красный_жгучий_по_вкусу: 0, }},
];
interface LanguageOption {
  value: string | object;
  label: string;
}

const LANGUAGE_OPTION = json;
interface RowProps {
  index: number;
  style: React.CSSProperties;
}

const Row: React.FC<RowProps> = ({ index, style }) => (
  <div style={style}>    {LANGUAGE_OPTION[index][0]}  {LANGUAGE_OPTION[index][1]}  </div>
);

export default function Form() {
  
  const [counter, setCounter] = useState(3);
  return (
    <div className={styles.containerForm}>
      <FixedSizeList
        height={300}
        width={800}
        itemCount={LANGUAGE_OPTION.length}
        itemSize={130}
      >
        {Row}
      </FixedSizeList>
      <button onClick={() => setCounter(counter < 1 ? 0 : counter - 1)}>-</button>
      <div>{counter}</div>
      <button onClick={() => setCounter(counter > 4 ? 5 : counter + 1)}>+</button>
    </div>
    
  );
}

