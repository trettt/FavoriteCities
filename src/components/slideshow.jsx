import React, { useState, useEffect, useRef } from "react";
import styles from "@/styles/slideshow.module.css";

const imageData = [
  { src: "/tokyo-japan.jpg", alt: "Tokyo, Japan", caption: "Tokyo, Japan" },
  { src: "/cairo-egypt.jpg", alt: "Cairo, Egypt", caption: "Cairo, Egypt" },
  {
    src: "/seoul-korea.jpg",
    alt: "Seoul, South Korea",
    caption: "Seoul, South Korea",
  },
  {
    src: "/sydney-australia.jpg",
    alt: "Sydney, Australia",
    caption: "Sydney, Australia",
  },
  {
    src: "/brasov-romania.jpg",
    alt: "Brasov, Romania",
    caption: "Brasov, Romania",
  },
];

export default function Slideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideInterval = useRef(null);

  const resetTimer = () => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
    slideInterval.current = setInterval(nextSlide, 3000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % imageData.length);
    resetTimer();
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + imageData.length) % imageData.length);
    resetTimer();
  };

  useEffect(() => {
    slideInterval.current = setInterval(nextSlide, 3000);
    return () => clearInterval(slideInterval.current);
  }, []);

  return (
    <div className={styles.slideshow}>
      <div className={styles.slideContainer}>
        <div className={styles.caption}>{imageData[currentSlide].caption}</div>
        <img
          src={imageData[currentSlide].src}
          alt={imageData[currentSlide].alt}
          className={styles.image}
        />
      </div>
      <button onClick={prevSlide} className={styles.navButton}>
        ❮
      </button>
      <button onClick={nextSlide} className={styles.navButton}>
        ❯
      </button>
      <div className={styles.indicators}>
        {imageData.map((_, index) => (
          <span
            key={index}
            onClick={() => {
              setCurrentSlide(index);
              resetTimer();
            }}
            className={`${styles.indicator} ${
              currentSlide === index ? styles.active : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
}
