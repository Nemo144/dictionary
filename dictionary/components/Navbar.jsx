import React, { useState } from "react";
import { BiBookAlt } from "react-icons/bi";

const fonts = [
  { name: "Serif", fontFamily: "PT Serif, sans-serif" },
  { name: "Open Sans", fontFamily: "Open Sans, sans-serif" },
  { name: "Monospace", fontFamily: "Roboto Mono, Monospace" },
];

const Navbar = ({ handleMode, mode, setMode }) => {
  const [selectedFont, setSelectedFont] = useState(fonts[0]);

  //function to handle the font change upon selection
  const handleFontChange = (event) => {
    const fontName = event.target.value;
    const font = fonts.find((f) => f.name === fontName);
    setSelectedFont(font);
    document.body.style.fontFamily = font.fontFamily;
  };

  return (
    <div>
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
        <button onClick={handleMode}></button>
      </div>
    </div>
  );
};

export default Navbar;
