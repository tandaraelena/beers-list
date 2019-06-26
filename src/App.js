import React from 'react';
import './App.css';
import BeersList from './components/beers-list/beers-list';
import BeerDetails from './components/beer-details/beer-details';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={BeersList}/>
        <Route path="/beer-details" component={BeerDetails}/>
      </Switch>
    </Router>
    
  );
}

export default App;
