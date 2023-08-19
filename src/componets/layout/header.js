import React from "react";
import logo from '../../Shopee-Food-Logo.png';

function Header(props) {
  const [show, setShow] = React.useState(false);
    return (
        <header className="App-header">
          <div className='container'>
            <div className="row">
              <img src={logo} className="App-logo" alt="logo" />
              <h2>WELCOME TO SHOPEE FOOD PIZZA</h2>
              <button href="/cart" className="cart-btn" onClick={()=>{setShow(!show)
                  props.showing(!show)
                  }}>
                    {show? "close": "View Cart"}
              </button>
            </div>
          </div>
        </header>
    );
  }
  
  export default Header;