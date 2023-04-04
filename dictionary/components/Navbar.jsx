import React, { useState, useEffect } from "react";
import { BiBookAlt } from "react-icons/bi";

const fonts = [
  { name: "Serif", fontFamily: "PT Serif, sans-serif" },
  { name: "Open Sans", fontFamily: "Open Sans, sans-serif" },
  { name: "Monospace", fontFamily: "Roboto Mono, Monospace" },
];

const Navbar = () => {
  const [selectedFont, setSelectedFont] = useState(fonts[0]);
  const [theme, setTheme] = useState(undefined);

  const handleToggle = (event) => {
    setTheme(event.target.checked);
  };

  //function to handle the font change upon selection
  const handleFontChange = (event) => {
    const fontName = event.target.value;
    const font = fonts.find((f) => f.name === fontName);
    setSelectedFont(font);
    document.body.style.fontFamily = font.fontFamily;
  };

  return (
    <div className="container">
      <div>
        <BiBookAlt />
      </div>

      <div>
        <select value={selectedFont.name} onChange={handleFontChange}>
          {fonts.map((font) => (
            <option key={font.name} value={font.name}>
              {font.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <form action="#">
          <label className="switch">
            <input type="checkbox" checked={theme} onChange={handleToggle} />
            <span className="slider"></span>
          </label>
        </form>
      </div>
    </div>
  );
};

export default Navbar;
