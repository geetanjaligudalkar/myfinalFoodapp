import {React, useState} from 'react'
import Header from "./componets/layout/header";
import Foods from "./componets/foods/index";
import './App.css';

function App() {
 
  // function to get state of cart button
  const [show, setShow] = useState(false);
  const getDta =  (a) => {
    setShow(a);
  }

  return (
    <div className="App">
      <Header showing={getDta} />
      <section className="container">
        <div className="row">
         
              <Foods  toshow={show}/>
      
        </div>
      </section>
    </div>
  );
}

export default App;
