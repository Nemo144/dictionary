import React, { useState, useEffect } from "react";
import { BiBookAlt } from "react-icons/bi";

const fonts = [
  { name: "Serif", fontFamily: "PT Serif, sans-serif" },
  { name: "Open Sans", fontFamily: "Open Sans, sans-serif" },
  { name: "Monospace", fontFamily: "Roboto Mono, Monospace" },
];

const Dictionary = () => {
  //to manage the change in state of the fonts
  const [selectedFont, setSelectedFont] = useState(fonts[0]);

  //to manage the change in state of the themes
  const [darkTheme, setDarkTheme] = useState(undefined);

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

  //function to handle the font change upon selection
  const handleFontChange = (event) => {
    const fontName = event.target.value;
    const font = fonts.find((f) => f.name === fontName);
    setSelectedFont(font);
    document.body.style.fontFamily = font.fontFamily;
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
                  checked={darkTheme}
                  onChange={handleToggle}
                />
                <span className="slider"></span>
              </label>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dictionary;
