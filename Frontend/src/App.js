import React from 'react';
import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import {About} from './components/About'
import {Navbar} from './components/Navbar'
import {Books} from './components/Books'

function App() {
  return (
    <Router>
        <Navbar/>

        <div className="container-fluid p-4">


        <Switch>
          <Route path="/about" component={About} />
          <Route path="/" component={Books}/>

        </Switch>
        
      </div>
    </Router>
  );
}

export default App;
