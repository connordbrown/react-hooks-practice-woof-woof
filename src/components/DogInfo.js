import React from 'react';

function DogInfo({ dogToDisplay, setDogToDisplay, dogList, setDogList }) {
    const {id, name, isGoodDog, image} = dogToDisplay;

    function handleGoodBadDog(dogId) {
      fetch(`http://localhost:3001/pups/${dogId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({"isGoodDog": !isGoodDog})
      })
      .then(response => response.json())
      .then(updatedDog => {
        const updatedDogList = dogList.map(dog => {
            if (dog.id === updatedDog.id) {
                return updatedDog;
            } else {
                return dog;
            }
        });
        setDogList(updatedDogList);
        setDogToDisplay(updatedDog);
      })
    }

    return (
        <div>
            <img src={image} alt={name} />
            <h2>{name}</h2>
            <button onClick={() => handleGoodBadDog(id)}>{isGoodDog ? "Good" : "Bad"} Dog!</button>
        </div>
    )
}

export default DogInfo;