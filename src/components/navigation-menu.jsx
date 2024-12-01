import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthentication } from "@/utils/authenticationProvider";
import styles from "@/styles/navigation-menu.module.css";

const pages = [
  {
    text: "Home",
    icon: <span className="material-symbols-outlined">house</span>,
    path: "/home",
  },
  {
    text: "Search",
    icon: <span className="material-symbols-outlined">location_searching</span>,
    path: "/search",
  },
  {
    text: "Favorites",
    icon: <span className="material-symbols-outlined">favorite</span>,
    path: "/favorites",
  },
];

export default function NavigationMenu() {
  const router = useRouter();

  const { isUserAuthenticated, setIsUserAuthenticated } = useAuthentication();

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsUserAuthenticated(!!user);
  }, []);

  const handleNavigation = (path) => {
    router.push(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsUserAuthenticated(false);
  };

  return (
    <>
      <nav className={styles.navbar}>
        <ul className={styles.navList}>
          {pages.map(({ text, icon, path }) => (
            <li key={text} className={styles.navItem}>
              <button
                onClick={() => handleNavigation(path)}
                className={styles.navButton}
              >
                {icon}
                <span className={styles.navText}>{text}</span>
              </button>
            </li>
          ))}
        </ul>

        <div>
          {isUserAuthenticated ? (
            <button
              className={styles.authButton}
              onClick={() => {
                handleLogout();
              }}
            >
              <span className="material-symbols-outlined">logout</span>
              <span className={styles.authText}> Log Out </span>
            </button>
          ) : (
            <button
              className={styles.authButton}
              onClick={() => {
                handleNavigation("/authentication");
              }}
            >
              <span className="material-symbols-outlined">login</span>
              <span className={styles.authText}> Authenticate</span>
            </button>
          )}
        </div>
      </nav>
    </>
  );
}
