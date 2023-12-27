'use client';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
//import validator from "email-validator";
//import axios from 'axios';
//import axios, { AxiosResponse } from 'axios';


const ViberForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    language: "",
    them: "",
    //subject: "",
    message: "",
    access_key: "",
  });
 
  useEffect(() => {
    setFormData({
      ...formData,
      name: name,
      email: email,
      message: message,
      access_key: "60829245",
    });
  }, [name, email, message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = JSON.stringify(formData);
    //console.log('data=', JSON.stringify(formData), data);
    fetch("", {
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
      })
      .catch((err) => {
        console.log(err);
      });
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <>
        <div className={styles.containerForm}>
          <form onSubmit={handleSubmit} >
            <ul className={styles.wrapperForm}>
              <li>
              <h3 style={name==='' ? {color: 'red'}: {color: 'black'}}>Как к вам обращаться?</h3>
                <label >
                  <input 
                  type="text" 
                  placeholder='Enter you Name'
                  value={name} 
                   onChange={(e) => {console.log(e.target?.value); setName(e.target.value)}} />
                </label>
              </li>
              <li>
                <h3 style={email==='' ? {color: 'red'}: {color: 'black'}}>Напишите адрес почты для ответа</h3>
                <label>
                  <input type="text" 
                  placeholder='Write an email address for a response'
                  value={email} 
                   onChange={(e) => setEmail(e.target.value)} />
                </label>
              </li>
              <li>
                <h3>Напишите ваше обращение</h3>
                <label>
                  <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
                </label>
              </li>
            </ul>
        <button className={styles.button} type="submit">Отправить</button>
          </form>
        </div>
    </>
  );
};

export default ViberForm;