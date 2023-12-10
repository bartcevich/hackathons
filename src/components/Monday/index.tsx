'use client';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
  
interface LanguageOption {
    value: string | object;
    label: string;
  }

const LANGUAGE_OPTIONS: LanguageOption[] = [
  { label: 'Гренки', value: { Сахар_гр: 25, Milk_гр: 20 }},
  { label: 'Омлет', value: { Яйца_шт: 1, Сахар_гр: 5, Milk_гр: 100 }},
  { label: 'Суп с фрикадельками и булгуром',value:{Фарш_мясной_гр:75, Булгур_гр:15, Морковь_шт:0.3, Картофель_шт:0.8,Лук_репчатый_шт:0.3,Помидор_шт:0.3,Лавровый_лист_шт:0.3,Вода_л:0.4,Масло_растительное_ст_л:0.8, Соль_по_вкусу_и_по_желанию_специи:0 }},
  { label: 'Щи из свежей капусты', value:{Капуста_белокочанная_гр:100,Говядина_гр:100,Лук_репчатый_гр:33,Морковь_гр:25,Помидор_шт:0.3,Картофель_шт:0.5,Зелень_веточка:1,Чеснок_зуб:0.5,Лавровый_лист_шт:0.5,Перец_душистый_шт:1,Масло_растительное_ст_л:0.5, Приправа_по_вкусу:0 ,Вода_л:0.3, }},
  { label: 'Пшенный суп с яйцом', value:{Картофель_шт:0.5, Яйцо_куриное_шт:0.5,Пшено_ст_л:0.8, Морковь_шт:0.3, Лук_репчатый_шт:0.3, Масло_растительное_ст_л:0.5, Вода_л:0.5, Соль_по_вкусу: 0, Перец_черный_по_вкусу: 0, Зелень_по_вкусу: 0,}},
  { label: 'Бендерики', value: { Мука_пшеничная_г : 37, Вода_мл: 93 , Яйцо_куриное_шт: 0.7, Соль_ч_л: 0.1, Сахар_ч_л: 0.1, Масло_растительное_ст_л: 0.5, Грудка_куриная_г: 100, Лук_репчатый_шт: 0.2, Чеснок_зуб:0.3, Перец_красный_жгучий_по_вкусу: 0,}},
];

  const ViberForm: React.FC = () => {
    const [sunday, setSunday] = useState('');
    const [sundayLunch, setSundayLunch] = useState('');
    const [sundayDinner, setSundayDinner] = useState('');
    const [count, setCount] = useState(1);
    const [countLunch, setCountLunch] = useState(1);
    const [countDinner, setCountDinner] = useState(1);
      const handleIncrease = () => {setCount(count > 99 ? 100 : count + 1);};
      const handleDecrease = () => {setCount(count < 2 ? 1 : count - 1);};
      
      const sundayArr: any[] = [];
      const calculateValues: any = sunday;
      for (let key in calculateValues) {
        let temp = calculateValues[key]*count;
        sundayArr.push(key);
        sundayArr.push(temp);
        console.log(sundayArr);
      }
      const sundayLunchArr: any[] = [];
      const calculateLunchValues: any = sundayLunch;
      for (let key in calculateLunchValues) {
        let temp = calculateLunchValues[key]*countLunch;
        sundayLunchArr.push(key);
        sundayLunchArr.push(temp);
      }
      const sundayDinnerArr: any[] = [];
      const calculateDinnerValues: any = sundayDinner;
      for (let key in calculateDinnerValues) {
        let temp = calculateDinnerValues[key]*countDinner;
        sundayDinnerArr.push(key);
        sundayDinnerArr.push(temp);
      }

    return (
        <>
         <div>
          <label>
            <h3 style={sunday==='' ? {color: 'red'}: {color: 'black'}}>Monday</h3>
            <div className={styles.container}>
              <select   value={JSON.stringify(sunday)}   onChange={(e) => setSunday(JSON.parse(e.target.value))}>
                {LANGUAGE_OPTIONS.map((option) => (
                <option key={option.label} value={JSON.stringify(option.value)}> {option.label}</option> ))}
              </select>
              <div className={styles.container}>
                <button type="button" onClick={handleDecrease}>-</button>
                <b>{count}</b>
                <button type="button" onClick={handleIncrease}>+</button>
              </div>
              <div className={styles.container}> {sundayArr.map((item, index) => (<p key={index}>{item}</p>))} </div>
            </div>
            <div className={styles.container}>
              <select   value={JSON.stringify(sundayLunch)}   onChange={(e) => setSundayLunch(JSON.parse(e.target.value))}>
                {LANGUAGE_OPTIONS.map((option) => (
                <option key={option.label} value={JSON.stringify(option.value)}> {option.label}</option> ))}
              </select>
              <div className={styles.container}>
                <button type="button" onClick={() => setCountLunch(countLunch < 2 ? 1 : countLunch - 1)}>-</button>
                <b>{countLunch}</b>
                <button type="button" onClick={() => setCountLunch(countLunch > 99 ? 100 : countLunch + 1)}>+</button>
              </div>
              <div className={styles.container}> {sundayLunchArr.map((item, index) => (<p key={index}>{item}</p>))} </div>
            </div> 
            <div className={styles.container}>
              <select   value={JSON.stringify(sundayDinner)}   onChange={(e) => setSundayDinner(JSON.parse(e.target.value))}>
                {LANGUAGE_OPTIONS.map((option) => (
                <option key={option.label} value={JSON.stringify(option.value)}> {option.label}</option> ))}
              </select>
              <div className={styles.container}>
                <button type="button" onClick={() => setCountDinner(countDinner < 2 ? 1 : countDinner - 1)}>-</button>
                <b>{countDinner}</b>
                <button type="button" onClick={() => setCountDinner(countDinner > 99 ? 100 : countDinner + 1)}>+</button>
              </div>
              <div className={styles.container}> {sundayDinnerArr.map((item, index) => (<p key={index}>{item}</p>))} </div>
            </div>
          </label>
          </div>
          
        </>
      );
  }
  export default ViberForm;