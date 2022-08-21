import React, { useState } from "react";
import Navbar from "./components/Header";
import Context from "./ThemeContext";
import ErrorBoudary from "./ErrorBoundary";
import Search from "./components/Search";
import Main from "./components/Main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Country from "./components/Country";
function App() {
  const [error] = useState(false);
  const [data, setData] = useState("");
  const [stateOfData, setStateOfData] = useState("initialData");
  const [theme, setTheme] = useState("light");
  const [current, setCurrent] = useState("");
  return (
    <ErrorBoudary error={error}>
      <div
        className={theme === "light" ? "light" : "dark"}
        style={{
          backgroundColor:
            theme === "light"
              ? "var(--Very-Light-Gray)"
              : "var(--Dark-Blue-body)",
          minHeight: "100vh",
        }}
      >
        <Context.Provider value={[theme, setTheme]}>
          <Navbar />
          <BrowserRouter>
            <Routes>
              <Route
                path="/:index"
                element={<Country current={current} setCurrent={setCurrent} />}
              />
              <Route
                path="/"
                element={
                  <>
                    <Search
                      setData={setData}
                      stateOfData={stateOfData}
                      setStateOfData={setStateOfData}
                    />
                    <Main
                      data={data}
                      setData={setData}
                      stateOfData={stateOfData}
                      setStateOfData={setStateOfData}
                      setCurrent={setCurrent}
                    />
                  </>
                }
              />
            </Routes>
          </BrowserRouter>
        </Context.Provider>
      </div>
    </ErrorBoudary>
  );
}

export default App;
