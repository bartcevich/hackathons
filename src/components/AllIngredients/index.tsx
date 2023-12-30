"use client";

import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import MenuGroups from "@/components/MenuGroups";
import MenuGroupsOpen from "@/components/MenuGroupsOpen";

type UserInput = { [key: string]: string | undefined };
type UserInput1 = { [key: string]: string | undefined };

const inputIdentifiers = [
  "input2",
  "input3",
  "input4",
  "input5",
  "input6",
  "input7",
] as const;

export default function AllIngredients() {
  const [userInput, setUserInput] = useState<UserInput>({});
  const [userInput1, setUserInput1] = useState<UserInput1>({});

  useEffect(() => {
    const savedInputs: string | null = localStorage.getItem("userInputs");
    if (savedInputs) {
      const parsedInputs: UserInput = JSON.parse(savedInputs);
      setUserInput(parsedInputs);
    }

    const savedInput1: string | null = localStorage.getItem("userInputs");
    if (savedInput1) {
      const parsedInput1: UserInput1 = JSON.parse(savedInput1);
      setUserInput1(parsedInput1);
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    identifier: (typeof inputIdentifiers)[number] | "input1"
  ) => {
    if (identifier === "input1") {
      const newInputs1: UserInput1 = {
        ...userInput,
        input1: e.target.value,
      };
      setUserInput1(newInputs1);
      localStorage.setItem("userInputs", JSON.stringify(newInputs1));
    } else {
      const newInputs: UserInput = {
        ...userInput,
        [identifier]: e.target.value,
      };
      setUserInput(newInputs);
      localStorage.setItem("userInputs", JSON.stringify(userInput));
    }
  };

  return (
    <>
      <div className={styles.container_top}>
        <div className={styles.container_text}>
          <div>
            <MenuGroupsOpen />
          </div>
          <input
            className={styles.container_input}
            type="text"
            value={userInput1["input1"] || ""}
            maxLength={27}
            onChange={(e) => handleInputChange(e, "input1")}
            placeholder="Меню для..."
          />
        </div>
        {inputIdentifiers.map((identifier) => (
          <div key={identifier} className={styles.container_text}>
            <div>
              <MenuGroups />
            </div>
            <input
              className={styles.container_input}
              type="text"
              value={userInput[identifier] || ""}
              maxLength={27}
              onChange={(e) => handleInputChange(e, identifier)}
              placeholder="Меню для..."
            />
          </div>
        ))}
      </div>
    </>
  );
}
