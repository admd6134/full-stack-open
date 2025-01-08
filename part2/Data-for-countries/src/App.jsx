import { useEffect, useState } from "react";
import countries from "./services/countries";

function App() {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    countries.getCountry("all").then((returnedData) => {
      const savedResult = returnedData.filter((x) => {
        return (
          x.name.common.toLowerCase().includes(search.toLowerCase()) ||
          x.name.official.toLowerCase().includes(search.toLowerCase())
        );
      });
      setResult(savedResult);
      if (savedResult.length === 1) {
        console.log(savedResult[0].name.common);

        countries.getCountry(`name/${savedResult[0].name.common}`).then((y) => {
          setResult(y);
        });
      }
    });
  }, [search]);

  const handleShow = (name) => {
    countries.getCountry(`name/${name}`).then((y) => {
      setResult(y);
    });
  };

  return (
    <>
      <div>
        find countries <input value={search} onChange={handleSearch} />
      </div>
      {result.length > 10 && "too many matches, specify another filter"}
      {result.length === undefined && (
        <div>
          <h1>{result.name.common}</h1>
          <div>capital : {result.capital}</div>
          <h2>languages</h2>
          <ul>
            {Object.values(result.languages).map((language) => {
              return <li key={language}>{language}</li>;
            })}
          </ul>
          <img src={result.flags.png} alt="" />
        </div>
      )}
      {result.length <= 10 &&
        result.map((x) => {
          return (
            <div key={x.name.common}>
              {x.name.common}
              <button onClick={() => handleShow(x.name.common)}>show</button>
            </div>
          );
        })}
    </>
  );
}

export default App;
