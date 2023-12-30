"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./styles.module.scss";
import BuyForDay from "@/components/BuyForDay";
import Dinner from "@/components/Dinner";
import Starters from "@/components/Starters";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faCopy } from "@fortawesome/free-solid-svg-icons";

export default function MenuGroups() {
  const [ingredients, setIngredients] = useState<any[]>([]);
  const [label, setLabel] = useState<any[]>([]);
  const [image, setImage] = useState<any[]>([]);
  const [numberHuman, setNumberHuman] = useState<any[]>([]);
  const [openMenu, setOpenMenu] = useState(true);
  const handleClick = () => {
    setOpenMenu((prevValue) => !prevValue);
  };

  const [menuUser, setMenuUser] = useState<any[]>([]);
  console.log(menuUser);
  const allIngredients: any[] = [];
  let oneArrIngredients: any[] = []; //один массив всех ингридиентов
  const sumArrPrint: any[] = []; //массив с суммированными значениями
  menuUser.map((ingredient, index) => {
    sumArrPrint.length = 0;
    allIngredients.length = 0;
    allIngredients.push(ingredient.ingredients); //массив с массивами всех ингридиентов
    allIngredients.forEach(
      (el) => (oneArrIngredients = oneArrIngredients.concat(el))
    );
    //console.log(oneArrIngredients);
    const uniqueIngredients = new Set(oneArrIngredients); //уникальные элементы
    const uniqueIngredientsArr = Array.from(uniqueIngredients); // массив уникальных элементов
    //console.log(uniqueIngredientsArr);
    for (let i = 0; i < uniqueIngredientsArr.length; i++) {
      typeof uniqueIngredientsArr[i] === "string"
        ? search(uniqueIngredientsArr[i])
        : i;
    }
  });
  function search(ingredients: any) {
    let tempNumber = 0;
    let tempString = "";
    for (let r = 0; r < oneArrIngredients.length; r++) {
      typeof oneArrIngredients[r] === "string"
        ? (tempString = oneArrIngredients[r])
        : (tempString = oneArrIngredients[r]);
      if (ingredients === tempString) {
        tempNumber = tempNumber + oneArrIngredients[r + 1];
      }
    }
    sumArrPrint.push(ingredients);
    sumArrPrint.push(tempNumber);
  }

  const [showTooltip, setShowTooltip] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const handleCopy = () => {
    if (textareaRef.current) {
      textareaRef.current.value = sumArrPrint.join(", ");
      textareaRef.current.select();
      document.execCommand("copy");
      setShowTooltip(true);
      // Hide the tooltip after a duration (e.g., 2 seconds)
      setTimeout(() => {
        setShowTooltip(false);
      }, 5000);
    }
  };

  const [sumIngredients, setSumIngredients] = useState(false);
  const handleIngredients = () => {
    setSumIngredients((prevValue) => !prevValue);
  };

  return (
    <>
      <div className={styles.container_top}>
        <button
          type="button"
          className={styles.menuGroup}
          onClick={handleClick}
        >
          {openMenu ? "Возврат к меню" : "Тип блюда"}
        </button>
        {openMenu && (
          <div className={styles.container_popup}>
            <Starters setIngredients={setIngredients} setLabel={setLabel} />
            <Starters setIngredients={setIngredients} setLabel={setLabel} />
            <Starters setIngredients={setIngredients} setLabel={setLabel} />
            <Starters setIngredients={setIngredients} setLabel={setLabel} />
            <Starters setIngredients={setIngredients} setLabel={setLabel} />
            {/* <Dinner setIngredients={setIngredients} /> */}
          </div>
        )}
      </div>
      <div>
        <BuyForDay
          setMenuUser={setMenuUser}
          ingredients={ingredients}
          label={label}
          image={image}
          numberHuman={numberHuman}
          isOpen={false}
        />
      </div>
      <div>
        {sumIngredients && (
          <div>
            {sumArrPrint.join(",  ")}
            <textarea
              ref={textareaRef}
              style={{ position: "absolute", left: "-9999px" }} // Hide the textarea off-screen
              readOnly
            />
          </div>
        )}
        <button
          className={styles.handleIngredients}
          onClick={handleIngredients}
        >
          <FontAwesomeIcon icon={faCartShopping} />
        </button>
        {sumIngredients && (
          <button className={styles.handleCopy} onClick={handleCopy}>
            <FontAwesomeIcon icon={faCopy} /> {/* Copy button */}
          </button>
        )}
        {showTooltip && (
          <div className={styles.tooltip}>Cписок скопирован!</div>
        )}
      </div>
    </>
  );
}
