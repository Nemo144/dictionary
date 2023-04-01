import { useState, useEffect } from "react";
import Head from "next/head";
import stylesLight from "./styles-light.module.css";
import stylesDark from "./styles-dark.module.css";

const Layout = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    //to know the classname of the element
    const bodyClassList = document.body.classList;

    if (isDarkMode) {
      bodyClassList.add("dark");
      bodyClassList.remove("light");
    } else {
      bodyClassList.add("light");
      bodyClassList.remove("dark");
    }
  }, [isDarkMode]);

  //function to handle the toggle of the light/dark modes
  const handleDarkModeToggle = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href={`/${
            isDarkMode
              ? stylesDark.locals?.filename
              : stylesLight.locals?.filename
          }`}
        />
      </Head>

      <button onClick={handleDarkModeToggle}>
        {isDarkMode ? "Light Mode💡" : "dark Mode 🌛"}
      </button>

      {children}
    </>
  );
};

export default Layout;
