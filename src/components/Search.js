import React, { useEffect, useState } from "react";
import SearchIcon from "../Svg/search";
import Arrow from "../Svg/arrow";
import Exit from "../Svg/exit";

const cache = {};

const Search = ({ setData, stateOfData, setStateOfData }) => {
  const [isActive, setisActive] = useState(false);
  const [selectedOption, setselectedOption] = useState(-1);
  const [searchValue, setSearchValue] = useState("/");
  const [notValid, setNotValid] = useState(false);
  const [input, setInput] = useState("");
  const [region, setRegion] = useState("");
  const optionsList = ["Africa", "America", "Asia", "Europe", "Oceania"];
  const toggleOptions = () => {
    setisActive(!isActive);
  };
  useEffect(() => {
    async function handleInputChange() {
      if (input.search(/[^A-Za-z ]/) !== -1) {
        setNotValid(true);
        return;
      } else {
        setNotValid(false);
      }
      let value =
        (input[0] === " " && input[1] !== " ") ||
        (input[0] === " " && input[1] !== undefined)
          ? " " + input.trim()
          : input.trim();
      if (value === " ") {
        setNotValid(true);
        return;
      } else {
        setNotValid(false);
      }

      if (searchValue.value === value && searchValue.region === region) {
        return;
      }
      let placeInCache;
      function checkIfExists(country) {
        let cacheKeys = Object.keys(cache);
        for (let i = 0; i < cacheKeys.length; i++) {
          placeInCache = cacheKeys[i];
          if (country.search(placeInCache) !== -1) {
            return true;
          }
        }
        return false;
      }
      let firstLetter = value[0];
      const regex = new RegExp(value, "i");
      if (cache[firstLetter] && value.length === 1 && region !== "") {
        let filteredCache = cache[firstLetter].filter((obj) => {
          return obj.region.search(region) !== -1;
        });
        setData(filteredCache);
      } else if (cache[firstLetter] && value.length === 1) {
        setData(cache[firstLetter]);
        setStateOfData(firstLetter);
      } else if (region && cache[region]) {
        if (value !== "") {
          let filteredCache = cache[region].filter((obj) => {
            if (obj.name.common.search(regex) !== -1) {
              return true;
            }
            for (let i = 0; i < obj.altSpellings.length; i++) {
              if (obj.altSpellings[i].search(regex) !== -1) {
                return true;
              }
            }
            return false;
          });
          setData(filteredCache);
        } else {
          setData(cache[region]);
        }
        setStateOfData(region);
      } else if (stateOfData === "initialData") {
        if (region !== "") {
          let res = await fetch(
            `https://restcountries.com/v3.1/region/${region}`
          );
          res = await res.json();
          setData(res);
          cache[region] = res;
          setStateOfData(region);
        } else if (value === "") {
          setStateOfData("initialData");
        } else {
          let res = await fetch(`https://restcountries.com/v3.1/name/${value}`);
          res = await res.json();
          setData(res);
          if (value.length === 1) {
            cache[value] = res;
            setStateOfData(firstLetter);
          } else {
            setStateOfData(value);
          }
        }
      } else if (value === "" && region) {
        let res = await fetch(
          `https://restcountries.com/v3.1/region/${region}`
        );
        res = await res.json();
        setData(res);
        cache[region] = res;
        setStateOfData(region);
      } else if (value === "") {
        setStateOfData("initialData");
      } else if (cache[firstLetter]) {
        let filteredData = cache[firstLetter].filter((obj) => {
          for (let i = 0; i < obj.altSpellings.length; i++) {
            if (obj.altSpellings[i].search(regex) !== -1) {
              return true;
            }
          }
          return false;
        });
        setData(filteredData);
      } else {
        if (checkIfExists(value)) {
          let filteredData = cache[placeInCache].filter((obj) => {
            for (let i = 0; i < obj.altSpellings.length; i++) {
              if (obj.altSpellings[i].search(regex) !== -1) {
                return true;
              }
            }
            return false;
          });
          setData(filteredData);
        } else {
          let res = await fetch(`https://restcountries.com/v3.1/name/${value}`);
          res = await res.json();
          setData(res);
          setStateOfData(value);
        }
      }

      setSearchValue({ value: value, region: region });
    }
    handleInputChange();
  }, [
    input,
    region,
    searchValue.region,
    searchValue.value,
    setData,
    setStateOfData,
    stateOfData,
  ]);
  const handleKeyDown = (index) => (e) => {
    switch (e.key) {
      case " ":
      case "SpaceBar":
      case "Enter":
        e.preventDefault();
        setselectedOption(index);
        setisActive(false);
        setRegion(optionsList[index]);
        break;
      default:
        break;
    }
  };

  return (
    <section aria-label="Search And filter" className="search">
      <div className="container flex">
        <label>
          <SearchIcon className="search-icon" />
          <input
            onChange={(e) => setInput(e.target.value)}
            type="search"
            placeholder="Search for a country..."
          />
          {notValid && (
            <span className="not-valid">Not a Valid Country Name!</span>
          )}
        </label>
        <div className={isActive ? "dropdown droped" : "dropdown"}>
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={isActive}
            className={isActive ? "expanded" : ""}
            onClick={toggleOptions}
          >
            {optionsList[selectedOption] || "Filter by Region"}
            {optionsList[selectedOption] ? (
              <Exit
                tabIndex={0}
                style={{
                  width: "10px",
                }}
                onClick={() => {
                  setselectedOption(-1);
                  setRegion("");
                  setisActive(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setselectedOption(-1);
                    setRegion("");
                    setisActive(false);
                  }
                }}
              />
            ) : (
              <Arrow
                style={{ width: "10px" }}
                fill={isActive ? "#333" : "hsl(0,0%,57%)"}
              />
            )}
          </button>
          <ul
            className={`options ${isActive ? "show" : ""}`}
            role="listbox"
            aria-activedescendant={optionsList[selectedOption]}
            tabIndex={-1}
          >
            {optionsList.map((option, index) => (
              <li
                id={option}
                role="option"
                aria-selected={selectedOption === index}
                key={option}
                tabIndex={0}
                onKeyDown={handleKeyDown(index)}
                onClick={() => {
                  setselectedOption(index);
                  setRegion(optionsList[index]);
                  setisActive(false);
                }}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Search;
