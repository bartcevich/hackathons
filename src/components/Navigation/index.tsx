"use client";
import styles from "./styles.module.scss";
import Link from "next/link";
import Image from "next/image";
import logoImage from "../../assets/images/logo.png";
import React, { useState, useEffect } from "react";
import logo from "@/assets/images/logo.png";
import { px } from "framer-motion";

const Navigation: React.FC = () => {
  const [isTop, setIsTop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      //console.log("1=", lastScrollY, currentScrollY);
      if (currentScrollY > lastScrollY) {
        setIsTop(true);
        //console.log("2=", isTop);
      } else if (currentScrollY < lastScrollY) {
        setIsTop(false);
        //console.log("3=", isTop);
      }
      lastScrollY = currentScrollY;
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 700);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    handleScroll();
    handleResize();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [isTop]);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [openMenu1, setOpenMenu1] = useState(false);
  const handleClick1 = () => {
    setOpenMenu1((prevValue) => !prevValue);
  };
  const [openMenu2, setOpenMenu2] = useState(false);
  const handleClick2 = () => {
    setOpenMenu2((prevValue) => !prevValue);
  };

  return (
    <>
      <nav
        className={`${styles.siteNav} ${isTop ? styles.top : ""} ${
          isMobile ? styles.mobile : ""
        }`}
      >
        <div className={styles.logoContainer}>
          <div className={styles.logo}>
            <Image src={logo} alt="image" />
          </div>
          <a className={styles.siteName} href="/">
            Список продуктов
            <br />в пару кликов
          </a>
        </div>
        {(!isMobile || isMenuOpen) && (
          <div className={styles.mobileMenu}>
            <Link className={styles.dropdownTitle} href="/kids">
              О сайте
            </Link>
            <div className={styles.dropdown}>
              <div className={styles.dropdownTitle} onClick={handleClick2}>
                Советы нутрициолога:
              </div>
              {openMenu2 && (
                <div
                  className={
                    !isMobile
                      ? styles.dropdownContent
                      : styles.dropdownContentMobile
                  }
                >
                  <Link href="/programs">
                    Витамины - какие, когда и сколько?
                  </Link>
                  <a href="/">О чём молчат анализы?</a>
                  <a href="/">Диеты - мифы и реальность?</a>
                </div>
              )}
            </div>
            <div className={styles.dropdown}>
              <div className={styles.dropdownTitle} onClick={handleClick1}>
                Полезные статьи:
              </div>
              {openMenu1 && (
                <div
                  className={
                    !isMobile
                      ? styles.dropdownContent
                      : styles.dropdownContentMobile
                  }
                >
                  <Link href="/programs">правильное питание</Link>
                  <a href="/">организация пространства на кухне</a>
                  <a href="/">лайфхаки по хранению продуктов</a>
                  <a href="/">советы по выбору продуктов</a>
                </div>
              )}
            </div>
          </div>
        )}
        <div
          className={`${styles.burgerMenu} ${isMenuOpen ? styles.active : ""}
        }`}
          onClick={handleMenuToggle}
        >
          ☰
        </div>
      </nav>
    </>
  );
};
export default Navigation;
