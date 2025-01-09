import Slideshow from "@/components/slideshow";
import UserLocationInfo from "@/components/user-location-information";
import styles from "@/styles/home.module.css";

export default function Home() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.slideshowSection}>
        <Slideshow />
      </div>
      <div className={styles.descriptionSection}>
        <h1 className={styles.title}>Welcome </h1>
        <UserLocationInfo/>
      </div>
    </div>
  );
}
