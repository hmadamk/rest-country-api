import React, { useEffect } from "react";
import ArrowBack from "../Svg/backArrow";
import { useLocation, Link } from "react-router-dom";
const Country = ({ current, setCurrent }) => {
  const location = useLocation();
  useEffect(() => {
    async function makeCurrent() {
      if (current === "") {
        let res = await fetch(
          `https://restcountries.com/v3.1/name${location.pathname}`
        );
        res = await res.json();
        setCurrent(res[0]);
      }
    }
    makeCurrent();
  }, [current, location.pathname, setCurrent]);
  const arrCurrencies = [];
  const arrLangs = [];
  let arrBorders;
  if (current !== "") {
    Object.keys(current.currencies).forEach((e) =>
      arrCurrencies.push(current.currencies[e].name)
    );
    Object.keys(current.languages).forEach((e) =>
      arrLangs.push(current.languages[e])
    );
    arrBorders = current.borders && current.borders.map((e) => e + " ");
  }

  return (
    <div className="container">
      <div className="country">
        <Link to="/">
          <ArrowBack style={{ marginRight: "10px" }} />
          Back
        </Link>
        {current !== "" && (
          <div className="country-display">
            <div className="img-container">
              <img
                src={current.flags.svg}
                alt={`${current.name.common} flag`}
              />
            </div>
            <div>
              <h2>{current.name.common}</h2>
              <div className="display-info">
                <div>
                  <p>
                    <b>Native Name:</b>{" "}
                    {
                      current.name.nativeName[
                        Object.keys(current.name.nativeName)[0]
                      ].common
                    }
                  </p>
                  <p>
                    <b>Population: </b>
                    {current.population.toLocaleString()}
                  </p>
                  <p>
                    <b>Region: </b>
                    {current.region}
                  </p>
                  <p>
                    <b>Sub Region: </b>
                    {current.subregion}
                  </p>
                  <p>
                    <b>Capital: </b>
                    {current.capital}
                  </p>
                </div>
                <div>
                  <p>
                    <b>Top Level Domain: </b>
                    {current.tld[0]}
                  </p>
                  <p>
                    <b>Currencies: </b>
                    {arrCurrencies}
                  </p>
                  <p>
                    <b>Languages: </b>
                    {arrLangs + " "}
                  </p>
                </div>
              </div>
              <div>
                <b>Border Countrie: </b>
                {arrBorders}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Country;
