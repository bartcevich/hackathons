/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import {
  getBreakfastData,
  getLunchData,
  getDinnerData,
} from "@/services/getData";
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
  const [sunday, setSunday] = useState("");
  const [sundayValue, setSundayValue] = useState<any[]>([]);
  const [sundayImage, setSundayImage] = useState("");
  const [sundayLabel, setSundayLabel] = useState("");
  const [count, setCount] = useState(1);
  const [prevCount, setPrevCount] = useState(0);
  const [prevLabel, setPrevLabel] = useState("");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLabel = event.target.value;
    const selectedOption = Starters_dessert.find(
      (option) => option.label === selectedLabel
    );

    if (selectedOption) {
      setSunday(selectedLabel);
      setSundayImage(selectedOption.Image);
      setSundayLabel(selectedOption.label);
      setSundayValue(Object.entries(selectedOption.value));
      //props.setIngredients(Object.entries(selectedOption.value));
    }
  };

  useEffect(() => {
    //как применить здесь useContext
    if (sunday !== "" && (prevLabel !== sundayLabel || prevCount !== count)) {
      setPrevLabel(sundayLabel);
      setPrevCount(count);
      let sundayLabelArr: any[] = [];
      sundayLabelArr.push(sundayLabel);
      let sundayImageArr: any[] = [];
      sundayImageArr.push(sundayImage); //111
      let countIngredients: any[] = []; //умноженный вес ингридиентов
      for (let i = 0; i < sundayValue.length; i++) {
        countIngredients.push(sundayValue[i][0]);
        countIngredients.push(sundayValue[i][1] * count);
      }
      if (count === 1) {
        sundayLabelArr.push(`Для ${count} человека.`); //222
      } else if (count > 1) {
        sundayLabelArr.push(`Для ${count} человек.`);
      }
      sundayLabelArr.push(sundayImageArr); //333

      props.setLabel(sundayLabelArr);
      props.setIngredients(countIngredients);
    }
  }, [
    sunday,
    count,
    sundayImage,
    sundayLabel,
    sundayValue,
    props,
    prevLabel,
    prevCount,
  ]);

  return (
    <>
      <div className={styles.container_top}>
        <div className={styles.image}>
          {sundayImage !== "" && <img src={sundayImage} alt="Image" />}
        </div>
        <div>
          <div className={styles.container}>
            <select onChange={handleSelectChange}>
              <option value="">Вторые блюда</option>
              {Starters_dessert.map((option, index) => (
                <option key={index} value={option.label}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.container_button}>
            <div className={styles.container_text}>количество порций</div>
            <div
              className={styles.button}
              onClick={() => setCount(count < 2 ? 1 : count - 1)}
            >
              -
            </div>
            <div className={styles.button2}>{count}</div>
            <div
              className={styles.button}
              onClick={() => setCount(count > 99 ? 100 : count + 1)}
            >
              +
            </div>
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
