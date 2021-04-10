import React, { useState, useEffect } from 'react'
import { Products } from './components/index'
import { getItems, postItems } from './components/index'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
    
    const fetchItems = async () => {
        fetch(getItems)
            .then(response => response.json())
            .then(data => { 
                console.log(data)})
    }

    const pushItems = async () => {
        
    }

    useEffect(() => {
        fetchItems();
    }, []);


    return (
        <Router>
            <div className="App">
                <Products/>
            </div>
        </Router>
    )
}

export default App
