import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Main = ({ data, setData, stateOfData, setStateOfData, setCurrent }) => {
  const [initialData, setInitialData] = useState("");
  useEffect(() => {
    async function bringData() {
      if (!initialData) {
        let res = await Promise.all([
          fetch("https://restcountries.com/v3.1/name/germany"),
          fetch("https://restcountries.com/v3.1/name/United States of America"),
          fetch("https://restcountries.com/v3.1/name/Brazil"),
          fetch("https://restcountries.com/v3.1/name/Iceland"),
          fetch("https://restcountries.com/v3.1/name/Afghanistan"),
          fetch("https://restcountries.com/v3.1/name/Åland Islands"),
          fetch("https://restcountries.com/v3.1/name/Albania"),
          fetch("https://restcountries.com/v3.1/name/Algeria"),
        ]);
        for (let i = 0; i < res.length; i++) {
          res[i] = await res[i].json();
        }
        res = res.flat();
        setData(res);
        setInitialData(res);
      } else {
        setData(initialData);
      }
      setStateOfData("initialData");
    }
    if (stateOfData === "initialData") {
      bringData();
    }
  }, [initialData, setData, setStateOfData, stateOfData]);
  function format(num) {
    return num.toLocaleString();
  }
  return (
    <div className="container">
      <div className="flex-box">
        {data && data.status !== 404
          ? data.map((e) => (
            <Link
              to={`/${e.name.common}`}
              className="country-box"
              key={e.name.common}
              onClick={() => {
                setCurrent(e);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setCurrent(e);
                }
              }}
            >
              <img src={e.flags.png} alt={e.name.common + "Flag"} />
              <div className="country-info">
                <h3>{e.name.common}</h3>
                <p>
                  <b>Population:</b> {format(e.population)}
                </p>
                <p>
                  <b>Region:</b> {e.region}
                </p>
                <p>
                  <b>Capital:</b> {e.capital && e.capital[0]}
                </p>
              </div>
            </Link>
          ))
          : data.status === 404 && (
            <div className="not-found">404 No Such country Name</div>
          )}
      </div>
    </div>
  );
};
export default Main;
