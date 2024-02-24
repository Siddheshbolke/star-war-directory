
import React, { useState, useEffect } from 'react';
import "./App.css"

const App = () => {
  const [planets, setPlanets] = useState([]);
  const [nextPage, setNextPage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlanets('https://swapi.dev/api/planets/?format=json');
  }, []);

  const fetchPlanets = (url) => {
    setLoading(true);
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setPlanets(data.results);
        setNextPage(data.next);
        setLoading(false);

      })

      .catch(error => console.log(error));
  };

  const fetchNextPage = () => {
    if (nextPage) {
      fetchPlanets(nextPage);
    }
  };

  return (
    <div className="app">
      <h1>Star Wars Planets Directory</h1>
      {loading ? (
        <div className='parent'>
        <div className='loader'></div>
        </div>
      ) : (
        <>
          <div className="planet-list">
            {planets?.map(planet => (
              <div className="planet-card" key={planet?.url}>
                <h2>{planet?.name}</h2>
                <p>Climate: {planet?.climate}</p>
                <p>Population: {planet?.population}</p>
                <p>Terrain: {planet?.terrain}</p>
                <h3>Residents:</h3>
                <ul>
                  {planet?.residents?.map(residentUrl => (
                    <li key={residentUrl}>{residentUrl}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <button onClick={fetchNextPage}>Load More</button>
        </>
      )}
    </div>
  );
};

export default App