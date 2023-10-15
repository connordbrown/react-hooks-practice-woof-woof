import React, { useState, useEffect } from "react";
import DogInfo from "./DogInfo";

function App() {
  const [dogList, setDogList] = useState([]);
  const [filteredDogList, setFilteredDogList] = useState([]);
  const [dogToDisplay, setDogToDisplay] = useState();
  const [goodDogFilter, setGoodDogFilter] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3001/pups")
    .then(response => response.json())
    .then(data => setDogList(data))
  }, [])


  useEffect(() => {
    if (goodDogFilter) {
      setFilteredDogList(dogList.filter(dog => dog.isGoodDog === true));
    } else {
      setFilteredDogList(dogList);
    }
  }, [dogList, goodDogFilter])


  const dogBtns = filteredDogList.map(dog => {
      return <span key={dog.id} onClick={() => setDogToDisplay(dog)}>{dog.name}</span>
    })

  return (
    <div className="App">
      <div id="filter-div">
        <button id="good-dog-filter" onClick={() => setGoodDogFilter(!goodDogFilter)}>Filter good dogs: {goodDogFilter ? "ON" : "OFF"}</button>
      </div>
      <div id="dog-bar">
      {dogBtns}
      </div>
      <div id="dog-summary-container">
        <h1>DOGGO:</h1>
        <div id="dog-info">
          {dogToDisplay ? <DogInfo dogToDisplay={dogToDisplay} setDogToDisplay={setDogToDisplay} dogList={dogList} setDogList={setDogList} /> : null}
        </div>
      </div>
    </div>
  );
}

export default App;
