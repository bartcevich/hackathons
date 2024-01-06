/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect, useContext } from "react";
import styles from "./styles.module.scss";
import { IIngredients } from "@/types/common";
import { IngredientsContext } from "@/context/IngredientsContext";

interface BuyForDayProps {
  ingredients: any[];
  label: any[];
  image: any[];
  numberHuman: any[];
  isOpen: boolean;
  setMenuUser?: React.Dispatch<React.SetStateAction<any[]>> | undefined;
}

const BuyForDay: React.FC<BuyForDayProps> = (props) => {
  const [labelPrev, setLabelPrev] = useState<any[]>([]);
  const [prevPrevHistory, setPrevPrevHistory] = useState<any[]>([]);
  const [ingredientHistory, setIngredientHistory] = useState<IIngredients[]>(
    []
  );
  //const { ingredientHistory, setIngredientHistory } = useContext(IngredientsContext);
  let updatedHistory: any[] = [];
  useEffect(() => {
    const newIngredient: IIngredients = {
      ingredients: props.ingredients,
      label: props.label[0],
      image: props.label[2] === props.label[0] ? [] : props.label[2],
      numberHuman: props.label[1],
      isOpen: false,
    };
    setIngredientHistory((prevHistory) => {
      if (props.label[0] !== labelPrev[0]) {
        //проверяю ? для нового блюда ингредиенты
        setPrevPrevHistory(prevHistory); //сохраняю состояние до изменения ингредиентов
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

  useEffect(() => {
    if (props.setMenuUser) {
      props.setMenuUser(ingredientHistory);
      //console.log(ingredientHistory);
    }
  }, [ingredientHistory, props.setMenuUser]);

  const handleRemove = (indexToRemove: number) => {
    setIngredientHistory((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
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

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      {ingredientHistory.map((ingredient, index) => (
        <div key={index}>
          <div className={styles.container}>
            <div className={styles.image}>
              {ingredient.image.join("") !== "" && (
                <img src={ingredient.image.join("")} alt="Image" />
              )}
            </div>
            <div>
              <div className={styles.label}>
                {ingredient.numberHuman}
                {ingredient.label}
              </div>
              <div className={styles.button}>
                {activeIndex === index && (
                  <div className={styles.dropdownContent}>
                    <button
                      type="button"
                      onClick={() => handleViewIngredients(index)}
                    >
                      {ingredient.isOpen ? "Cвернуть.  " : "Смотреть состав.  "}
                    </button>
                    <button type="button" onClick={() => handleRemove(index)}>
                      Удалить.
                    </button>
                  </div>
                )}
              </div>
              <div
                className={styles.dropdownIcon}
                onClick={() => handleToggle(index)}
              >
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
    </>
  );
};

export default BuyForDay;
