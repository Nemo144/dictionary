import React, { useState, useEffect } from "react";
import { BiBookAlt } from "react-icons/bi";
import { GrFormSearch } from "react-icons/gr";
import { useDebounce } from "use-debounce";

const fonts = [
  { name: "Serif", fontFamily: "PT Serif, sans-serif" },
  { name: "Open Sans", fontFamily: "Open Sans, sans-serif" },
  { name: "Monospace", fontFamily: "Roboto Mono, Monospace" },
];

const apiKey = process.env.X_API_KEY;

const Dictionary = () => {
  //to manage the change in state of the fonts
  const [selectedFont, setSelectedFont] = useState(fonts[0]);

  //to manage the change in state of the themes
  const [darkTheme, setDarkTheme] = useState(undefined);

  //state for the word queried from the API
  const [word, setWord] = useState("");

  //state for the definitions fetched from the API
  const [definitions, setDefinitions] = useState("");

  //state to check for the existence of a word from the API
  const [valid, setValid] = useState(false);

  //state to control the fast changes when searching for a word from the API
  const [debouncedValue] = useDebounce(word, 500);

  //the effect hook to handle the debounceValue render of the searched word
  useEffect(() => {
    if (debouncedValue) {
      setWord(debouncedValue);
    }
  }, [debouncedValue]);

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

  //effect hook to fetch our data from the external API
  useEffect(() => {
    async function fetchDefinition() {
      const response = await fetch(
        `https://api.api-ninjas.com/v1/dictionary?word=${word}`,
        {
          method: "GET",
          headers: {
            "X-Api-Key": apiKey,
          },
          contentType: "application/json",
        }
      );
      const data = await response.json();
      setDefinitions(data.definition?.split(/\d+\.\s+/).filter(Boolean));
      setValid(data.valid);
    }
    fetchDefinition();
  }, [word]);

  //function to handle the font change upon selection
  const handleFontChange = (event) => {
    const fontName = event.target.value;
    const font = fonts.find((f) => f.name === fontName);
    setSelectedFont(font);
    document.body.style.fontFamily = font.fontFamily;
  };

  //function to handle the toggle between light and dark themes
  const handleToggle = (event) => {
    setDarkTheme(event.target.checked);
  };

  //function to handle word change
  const handleWordChange = (event) => {
    setWord(event.target.value);
  };

  return (
    <div className="container">
      <div className="navbar">
        <div>
          <BiBookAlt />
        </div>

        <div className="toggle">
          <div>
            <select
              className="font"
              value={selectedFont.name}
              onChange={handleFontChange}
            >
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

          <div className="slider-icons">{darkTheme ? "🌛" : "🌞"}</div>
        </div>
      </div>

      <div className="dictionary-input">
        <input
          className="input"
          type="text"
          value={word}
          placeholder="Search"
          onChange={handleWordChange}
        />
        <GrFormSearch className="search-icon" />
      </div>

      <div>
        {valid && (
          <div>
            <h2>{word}</h2>
            <ol>
              {definitions.map((definition, index) => (
                <li key={index}>{definition}</li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dictionary;
