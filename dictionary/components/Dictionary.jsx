import React, { useState, useEffect } from "react";
import { BiBookAlt } from "react-icons/bi";

const fonts = [
  { name: "Serif", fontFamily: "PT Serif, sans-serif" },
  { name: "Open Sans", fontFamily: "Open Sans, sans-serif" },
  { name: "Monospace", fontFamily: "Roboto Mono, Monospace" },
];

const baseUrl = "https://lexicala1.p.rapidapi.com/search";

export const getServerSideProps = async () => {
  // to fetch data from the external dictionary API
  const res = await fetch(baseUrl, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "baa38db7a9msh64dd74fda66bb72p14a910jsn16c29cf81576",
      "X-RapidAPI-Host": "lexicala1.p.rapidapi.com",
    },
  });

  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};

const Dictionary = ({ data }) => {
  console.log(data);
  //to manage the change in state of the fonts
  const [selectedFont, setSelectedFont] = useState(fonts[0]);

  //to manage the change in state of the themes
  const [darkTheme, setDarkTheme] = useState(undefined);

  //to manage the state of the input the text
  const [text, setText] = useState({
    firstText: "",
  });

  //function to handle the toggle between light and dark themes
  const handleToggle = (event) => {
    setDarkTheme(event.target.checked);
  };

  //the effect hook to handle the (re)rendering of the the themes
  useEffect(() => {
    if (darkTheme !== undefined) {
      if (darkTheme) {
        document.documentElement.setAttribute("data-theme", "dark");
        window.localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.removeAttribute("data-theme");
        window.localStorage.setItem("theme", "light");
      }
    }
  }, [darkTheme]);

  //another effect hook to handle the initial-color-mode
  useEffect(() => {
    const root = window.document.documentElement;
    const initialColorValue = root.style.getPropertyValue(
      "--initial-color-mode"
    );
    setDarkTheme(initialColorValue === "dark");
  }, []);

  // useEffect(() => {
  //   fetch("https://lexicala1.p.rapidapi.com/search", {
  //     method: "GET",
  //     headers: {
  //       "X-RapidAPI-Key": "baa38db7a9msh64dd74fda66bb72p14a910jsn16c29cf81576",
  //       "X-RapidAPI-Host": "lexicala1.p.rapidapi.com",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));
  // });

  //function to handle the font change upon selection
  const handleFontChange = (event) => {
    const fontName = event.target.value;
    const font = fonts.find((f) => f.name === fontName);
    setSelectedFont(font);
    document.body.style.fontFamily = font.fontFamily;
  };

  //function to handle the change in input text
  const handleTextChange = (event) => {
    //using the previous state to determine new state
    setText(
      (prevText) => (prevText, ([event.target.name] = event.target.value))
    );
  };

  return (
    <div className="container">
      <div className="navbar">
        <div>
          <BiBookAlt />
        </div>

        <div className="toggle">
          <div>
            <select value={selectedFont.name} onChange={handleFontChange}>
              {fonts.map((font) => (
                <option key={font.name} value={font.name}>
                  {font.name}
                </option>
              ))}
            </select>
          </div>

          <div className="nav-switch">
            <form action="#">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={!!darkTheme}
                  onChange={handleToggle}
                />
                <span className="slider"></span>
              </label>
            </form>
          </div>
        </div>
      </div>

      <div className="dictionary-input">
        <input
          className="input"
          type="text"
          name="firstText"
          value={text.firstText}
          onChange={handleTextChange}
          placeholder="Search"
        />
      </div>
    </div>
  );
};

export default Dictionary;
