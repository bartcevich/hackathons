'use client';
import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import json1 from '@/assets/images/recept.json';
import json2 from '@/assets/images/recept2.json';
import json3 from '@/assets/images/recept3.json';

  interface LanguageOption {value: { [key: string]: number | undefined };label: string;}
  const Starters_dessert: LanguageOption[] = json1;
  const first_courses_soup: LanguageOption[] = json2;
  const Main_courses: LanguageOption[] = json3;

  const ViberForm: React.FC = () => {
    const [sunday, setSunday] = useState('');
    const [sundayLunch, setSundayLunch] = useState('');
    const [sundayDinner, setSundayDinner] = useState('');
    const [count, setCount] = useState(1);
    const [countLunch, setCountLunch] = useState(1);
    const [countDinner, setCountDinner] = useState(1);
      const handleIncrease = () => {setCount(count > 99 ? 100 : count + 1);};
      const handleDecrease = () => {setCount(count < 2 ? 1 : count - 1);};

      const sundayArr: any[] = [];//умноженный вес ингридиентов
      const calculateValues: any = sunday;
      for (let key in calculateValues) {
        let temp = calculateValues[key]*count;
        sundayArr.push(key);
        sundayArr.push(temp);
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
      let sumArr: any[] = [];// исходный с данными для суммирования
      let sumArrSet: Set<any> = new Set();//уникальные строки
      let sumArrWork: any[] = [];//уникальные строки в виде массива
      const sumArrPrint: any[] = [];//массив с суммированными значениями
      let sumArrPrintStr = '';//строка с суммированными значениями
        sumArr = [...sundayDinnerArr, ...sundayLunchArr, ...sundayArr];
        sumArrSet = new Set(sumArr);
        sumArrWork = Array.from(sumArrSet);
        for (let i = 0; i < sumArrSet.size; i++){
          typeof sumArrWork[i] === 'string' ? search(sumArrWork[i]) : i;
          }
      function search(ingredients: any) {
        sumArrPrint.push(ingredients);
        let tempNumber = 0;
        let tempString = '';
        for (let r = 0; r < sumArr.length; r++){
          typeof sumArr[r] === 'string' ? tempString = sumArr[r].slice(0, 3) : tempString = sumArr[r];
          //sumArr[r];
          ingredients.slice(0, 3) === tempString ? tempNumber = tempNumber + sumArr[r+1] : r;
        }
        sumArrPrint.push(tempNumber);
        sumArrPrintStr = sumArrPrint.join(',  ');
      }

    return (
        <>
         <div className={styles.container_top}>
          <label>
            <h3 style={sunday==='' ? {color: 'red'}: {color: 'black'}}>Sunday</h3>
            <div className={styles.container}>
              <select   value={JSON.stringify(sunday)}   onChange={(e) => setSunday(JSON.parse(e.target.value))}>
                {Starters_dessert.map((option) => (
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
                {first_courses_soup.map((option) => (
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
                {Main_courses.map((option) => (
                <option key={option.label} value={JSON.stringify(option.value)}> {option.label}</option> ))}
              </select>
              <div className={styles.container}>
                <button type="button" onClick={() => setCountDinner(countDinner < 2 ? 1 : countDinner - 1)}> - </button>
                <b> {countDinner} </b>
                <button type="button" onClick={() => setCountDinner(countDinner > 99 ? 100 : countDinner + 1)}> + </button>
              </div>
              <div className={styles.container}> {sundayDinnerArr.map((item, index) => (<p key={index}>{item}</p>))} </div>
            </div>
            <div>
              <h3>Summarized Ingredients:</h3>
              <p>{sumArrPrintStr}</p>
              {/* <ul>{sumArrPrint.map((item, index) => (<li key={index}>{item}</li>))}</ul> */}
            </div>
          </label>
          </div>
        </>
      );
  }
  export default ViberForm;