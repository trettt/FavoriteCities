import Slideshow from "@/components/slideshow";
import styles from "@/styles/home.module.css";

export default function Home() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.slideshowSection}>
        <Slideshow />
      </div>
      <div className={styles.descriptionSection}>
        <h1 className={styles.title}>Welcome </h1>
        <p className={styles.description}>Some description</p>
      </div>
    </div>
  );
}
