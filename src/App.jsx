import React, { useEffect, useState } from "react";
import "./App.scss";

import Select from "react-select";

const options = [
  { value: "HTML", label: "HTML" },
  { value: "CSS", label: "Css" },
  { value: "JavaScript", label: "JavaScript" },
  { value: "Python", label: "Python" },
  { value: "React", label: "React" },
  { value: "Sass", label: "Sass" },
  { value: "Ruby", label: "Ruby" },
  { value: "RoR", label: "RoR" },
  { value: "Vue", label: "Vue" },
  { value: "Django", label: "Django" },
];

function App() {
  const [Data, setData] = useState(0);
  const [Selected, setSelected] = useState([]);

  function filterArray() {
    if (Data) {
      let _ = [...Data];
      if (Selected.length>0) {
        let _sel = Selected.map((e) => e.value);
        _ = Data.filter((e) => e.languages.some((lang) => _sel.includes(lang))||e.tools.some((tool) => _sel.includes(tool)));
        console.log(_, "e");
      }
      return _;
    } else {
      return null;
    }
  }
  useEffect(() => {
    fetch(`./data.json`)
      .then((e) => e.json())
      .then((e) => setData(e));
  }, [0]);

  return (
    <div>
      <div className="Header">
        <div className="Input">
          <Select
            onChange={(e) => {
              
              setSelected(e);
            }}
            isMulti
            options={options}
          />
        </div>
      </div>
      <div className="Cont">
        {filterArray() &&
          filterArray().map((e) => (
            <div className="Item">
              <div className="_img">
                <img src={e.logo} alt="" />
              </div>
              <div>
                <div className="__top">
                  <div className="comp">{e.company}</div>
                  {e.new && <div className="new">New!</div>}
                  {e.featured && <div className="featured">Featured</div>}
                </div>
                <div>
                  <h3>{e.position}</h3>
                </div>
                <div className="_bo">
                  <span>{e.postedAt}</span>
                  <span>{e.contract}</span>
                  <span>{e.location}</span>
                </div>
              </div>
              <div className="toolsAndLang">
                {e.languages.map((e) => (
                  <span>{e}</span>
                ))}
                {e.tools.map((e) => (
                  <span>{e}</span>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
