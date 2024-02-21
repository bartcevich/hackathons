"use client";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import validator from "email-validator";
import AllIngredients from "@/components/AllIngredients";
import Image from "next/image";
import test from "@/assets/images/test.jpg";

const RIGHT_ANSWER = [
  { value: "", label: "" },
  { value: "голубь", label: "голубь" },
  { value: "сорока", label: "сорока" },
  { value: "ворона", label: "ворона" },
];
const Form = () => {
  const [ref, inView] = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  const [today, setToday] = useState(new Date().toDateString());
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState(false);
  const [answer, setAnswer] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    key: "",
    answer: "",
    access_key: "",
    today: "",
  });

  useEffect(() => {
    //localStorage.setItem("formData", JSON.stringify(formData));
    //console.log("DataAuthentication=", localStorage.getItem("formData"));
    const savedFormData = localStorage.getItem("formData");
    if (savedFormData) {
      const parsedFormData = JSON.parse(savedFormData);
      setFormData(parsedFormData);
      setShow(parsedFormData.today === today);
    }
  }, [today]);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleInputFocus = (errorStateSetter: {
    (value: React.SetStateAction<boolean>): void;
    (value: React.SetStateAction<boolean>): void;
    (value: React.SetStateAction<boolean>): void;
    (value: React.SetStateAction<boolean>): void;
    (arg0: boolean): void;
  }) => {
    errorStateSetter(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    formData.key === "" ? setPassword(true) : setPassword(false);
    formData.email === "" || !validator.validate(formData.email)
      ? setEmailError(true)
      : setEmailError(false);
    if (
      answer ||
      password ||
      emailError ||
      !validator.validate(formData.email) ||
      formData.email === "" ||
      formData.key === "" ||
      formData.answer === ""
    ) {
      setFormData({
        ...formData,
        email: "",
      });
      setSending(false);
      setFailed(true);
      return;
    }

    if (
      formData.answer === "голубь" ||
      formData.answer === "ворона" ||
      formData.answer === ""
    ) {
      setAnswer(true);
      return;
    } else {
      setShow(true);
    }
    setSending(true);

    formData["today"] = today;
    formData["access_key"] = "60829245-4068-4083-bc62-2704f53261e7";
    localStorage.setItem("formData", JSON.stringify(formData));

    const data = JSON.stringify(formData);
    //console.log("data=", JSON.stringify(formData), data);
    fetch("https://api.web3forms.com/submit", {
      //fetch("", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("promise=", data);
        setSending(false);
        setSuccess(true);
        setFailed(false);
        setFormData({
          ...formData,
          email: "",
          key: "",
          answer: "",
        });
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        setSending(false);
        setFailed(true);
      });
  };

  const handleButtonText = () => {
    if (sending) {
      return "Пожалуйста подождите";
    } else if (success) {
      return "Сообщение отправлено";
    } else if (failed || emailError || password || answer) {
      return "Пробовать снова";
    } else {
      return "Войти";
    }
  };
  //console.log(show);

  return (
    <>
      {!show && (
        <div className={styles.containerFormMap}>
          <motion.form
            action=""
            ref={ref}
            className={styles.containerInForm}
            initial={{ x: "-10vw", opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : { x: "-10vw", opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onSubmit={handleSubmit}
          >
            <h3>Регистрация.</h3>
            <h3>Введите адрес вашей электронной почты</h3>
            <input
              type="text"
              className={`formControl ${emailError ? "formError" : ""}`}
              onFocus={() => {
                handleInputFocus(setEmailError);
              }}
              onChange={handleChange}
              value={formData.email}
              id="contactEmail"
              name="email"
              placeholder={`${
                emailError ? "Enter a valid email address" : "Email"
              }`}
            />
            <h3>Введите ваш пароль</h3>
            <input
              type="password"
              className={`formControl ${password ? "formError" : ""}`}
              onFocus={() => {
                handleInputFocus(setPassword);
              }}
              onChange={handleChange}
              value={formData.key}
              id="contactKey"
              name="key"
              placeholder={`${password ? "Enter your password" : "password"}`}
            />
            <h3>Выберите правильный ответ</h3>
            <div className={styles.imageTest}>
              <Image src={test} alt="image" />
            </div>
            <select
              className={`formControl ${answer ? "formError" : ""}`}
              onFocus={() => {
                handleInputFocus(setAnswer);
              }}
              onChange={handleChange}
              value={formData.answer}
              id="contactAnswer"
              name="answer"
              placeholder={`${answer ? "Enter your answer" : "answer"}`}
            >
              {RIGHT_ANSWER.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="col-12 formGroup formSubmit">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                disabled={
                  emailError || password || answer || sending || success
                }
                className="btn"
              >
                <div className={styles.button}>{handleButtonText()}</div>
              </motion.button>
            </div>
          </motion.form>
        </div>
      )}
      <div
        className={`${styles.componentShow} ${
          show ? styles["image-appear"] : ""
        }`}
      >
        {show && <AllIngredients />}
      </div>
    </>
  );
};

export default Form;
