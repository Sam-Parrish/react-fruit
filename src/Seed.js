import React, { useEffect, useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import Fruit from './Fruit';

import _ from 'lodash';

function Seed() {

const[allFruits, setAllFruits] = useState(null);
const[searchResults, setSearchResults] = useState(null);
const[keywords, setKeywords] = useState("");
const[name, setName] = useState("");
const[color, setColor] = useState("");

useEffect(() => {
    if(localStorage){
        const fruits = JSON.parse(localStorage.getItem('fruits'));
        if(fruits){
            setAllFruits(fruits);
            setSearchResults(fruits);
        }
    }
}, []);

function resetFruits() {
//Save the car data to local storage

const seedFruitData = [{
    "name": "Apple",
    "color": "Red",
}, {
    "name": "Banana",
    "color": "Yellow",
}, {
    "name": "Orange",
    "color": "Orange",
}, {
    "name": "Blueberry",
    "color": "Purple",
}, {
    "name": "Kiwi",
    "color": "Green",
}, {
    "name": "Strawberry",
    "color": "Red",
}, {
    "name": "Tomato",
    "color": "Red",
}, {
    "name": "Dragon Fruit",
    "color": "Pink",
}, {
    "name": "Lemon",
    "color": "Yellow",
}, {
    "name": "Pear",
    "color": "Green",
}, {
    "name": "Raspberry",
    "color": "Pink",
}, {
    "name": "Blackberry",
    "color": "Purple",
}];
setAllFruits(seedFruitData);

saveFruits(seedFruitData);

};
function addFruit(newFruit) {
    const newAllFruits = [...allFruits,newFruit];
    setAllFruits(newAllFruits);
    setSearchResults([...searchResults,newFruit]);

   saveFruits(newAllFruits);
}

//local storage save
function saveFruits(allFruits){
    if(localStorage) {
        localStorage.setItem('fruits',JSON.stringify(allFruits));
        console.log('Saved fruits to local storage');
    }

}

function searchFruits(evt){
    evt.preventDefault();
    let keywordsArray = [];
     if(keywords){
         keywordsArray = keywords.toLowerCase().split(' ');
     }
     if(name){
         keywordsArray.push(name.toLowerCase());
     }
     if(color){
         keywordsArray.push(color.toLowerCase());
     }

     if(keywordsArray.length > 0){
         const results = allFruits.filter(fruit => {
             //return keywordsArray.includes(car.make.toLowerCase()) || keywordsArray.includes(car.model.toLowerCase());
             for(const word of keywordsArray){
                 if(fruit.name.toLowerCase().includes(word) || 
                 fruit.color.toLowerCase().includes(word)){
                     return true;
                 }
             }
             return false;
         });
         setSearchResults(results);
     }
     else{
         setSearchResults(allFruits);
     }
 }
    return (
        <div className="container">
            <h1> Fruit Data </h1>
            <form>
                <div className="mb-3">
                    <input type="text" className="form-control" placeholder="Search by Name or Color" onChange={(evt) => setKeywords(evt.currentTarget.value)}></input>
                    <h5 className="ms-3">or</h5>
                    <select className="mt-1" id="dropDown1" value={color} onChange={evt => setColor(evt.currentTarget.value)}>
                        <option value="">Select a Color:</option>
                        {_(allFruits).map(fruit => fruit.color).sort().uniq().map(color => <option key={color} value={color}>{color}</option>).value()}
                        {/* <option value="Red">Red</option>
                        <option value="Green">Green</option>
                        <option value="Yellow">Yellow</option>
                        <option value="Pink">Pink</option>
                        <option value="Purple">Purple</option>
                        <option value="Orange">Orange</option> */}
                    </select>
                    <h5 className="ms-3">or</h5>
                    <select className="mt-1" id="dropDown2" value={name} onChange={evt => setName(evt.currentTarget.value)}>
                        <option value="">Select Fruit:</option>
                        {_(allFruits).map(fruit => fruit.name).sort().uniq().map(name => <option key={name} value={name}>{name}</option>).value()}
                        {/* <option value="">Select a Fruit</option>
                        <option value="Apple">Apple</option>
                        <option value="Banana">Banana</option>
                        <option value="Orange">Orange</option>
                        <option value="Blueberry">Blueberry</option>
                        <option value="Kiwi">Kiwi</option>
                        <option value="Strawberry">Strawberry</option>
                        <option value="Tomato">Tomato</option>
                        <option value="Dragon Fruit">Dragon Fruit</option>
                        <option value="Lemon">Lemon</option> */}
                    </select>
                    </div>
                    <button type="submit" className="btn btn-outline-primary mb-3" onClick={searchFruits}>Search</button>
            </form>
           
            <div className="row">
                {!allFruits && <button className="btn btn-lg btn-warning" onClick={resetFruits}>Save Seed Data to Local Storage</button>}
                {searchResults && searchResults.map((fruit, index) => {
                    return <div className="col-md-3 mb-4" key={index}>
                       <Fruit fruit={fruit} color={index % 2 ? 'danger' : ''} />
                    </div> 
                })}
            </div>
        </div> 
    );

}

export default Seed;