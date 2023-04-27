import React, { useState, useEffect } from "react";
import { BiBookAlt } from "react-icons/bi";

const fonts = [
  { name: "Serif", fontFamily: "PT Serif, sans-serif" },
  { name: "Open Sans", fontFamily: "Open Sans, sans-serif" },
  { name: "Monospace", fontFamily: "Roboto Mono, Monospace" },
];

const baseUrl = "";
const apiKey = process.env.X_API_KEY;

const Dictionary = () => {
  //to manage the change in state of the fonts
  const [selectedFont, setSelectedFont] = useState(fonts[0]);

  //to manage the change in state of the themes
  const [darkTheme, setDarkTheme] = useState(undefined);

  //to manage the state of the input the text
  const [text, setText] = useState({
    firstText: "",
  });

  //state for the word queried from the API
  const [word, setWord] = useState("code");

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

  useEffect(() => {
    fetch(`https://api.api-ninjas.com/v1/dictionary?word=${word}`, {
      method: "GET",
      headers: {
        "X-Api-Key": process.env.X_API_KEY,
      },
      contentType: "application/json",
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }, [word]);

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

// export const getServerSideProps = async () => {
//   // to fetch data from the external dictionary API
//   const res = await fetch(
//     `https://api.api-ninjas.com/v1/dictionary?word=${word}`,
//     {
//       method: "GET",
//       headers: {
//         "X-Api-Key": "Wktrjn2RFl4QHiIzAKHE3Q==cYgYKOxELBRP0dVX",
//       },
//       contentType: "application/json",
//     }
//   );

//   const data = await res.json();

//   return {
//     props: {
//       data,
//     },
//   };
// };

export default Dictionary;
