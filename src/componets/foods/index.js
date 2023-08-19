import { React, useState, useEffect } from "react";
import { HandleFetch } from "./api";
import Checkout from "./checkout";
import axios from "axios";

function Food (props) {

  const [pro, setPro] = useState([]);
  //  new state for cart
  const [cart, addToCart] = useState([]);

  const [value, setValue] = useState("");
  //const [selectedCat, setSelectedCat] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [isCheckout, setIsCheckout] = useState([]);
  



  useEffect(() => {
    const getList = async () => {
      try {
        await HandleFetch().then((data) => {
          setPro(data);
          setFiltered(data)
        });
      } catch (err) {
        console.log(err);
      }
    };
    getList();
  }, []);

  const handleSearchResults = () => {
    if (value !== "") {
      return pro.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
    } else if (value === "" && pro !== []) {
      return pro;
    }
  };

  // const filterByCat = () => {
  //   // Avoid filter for empty string

  //   if (value !== "") {
  //     return pro.filter((item) =>
  //       item.category.split(" ").indexOf(selectedCat) !== -1
  //     );
  //   } else if (value === "" && pro !== []) {
  //     return pro;
  //   }
    
  // };

  const CheckoutHandler = () => {
    setIsCheckout(false);

  }

  useEffect(() => {
    // Search for food
    let filtered = handleSearchResults();
    
     //filtered = filterByCat();
    setFiltered(filtered);
  }, [value]);

  
  const hideCartHandler = () => {
    setIsCheckout(true);
  };
  const submitOrderHandler = (userData) => {
    axios.post("https://api.buttercms.com/v2/content/butters_pizza/?auth_token=767c664c86c2ff763b469e66e988781c473129ae", {
      user: userData,
      orderedItems: [...cart]
    })
    .then((response) => {
      setFiltered(response);
      console.log(response);
    });

  };

  return (
    <div className="listingPage">
      <section className="container">
        <div className="sectionFilters">
          <div className="searchbox">
            <input
              className="input"
              placeholder="search for food"
              type="text"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}

            />
          </div>
<br/><br/>
<br/><br/>
          {/* <div className="cat-filter">
            <div>Filter by :</div>
            <select
             className="selectbox"
              id="cat-input"
              value={selectedCat}
              onChange={(e) => {
                setSelectedCat(e.target.value);
              }}
            >
              <option value="">All</option>
              <option value="Veg">Veg</option>
              <option value="Non-Veg">Non Veg</option>
            </select>
          </div> */}

        </div>
        <div className={props.toshow ? "hide" : "row"} >
          {filtered &&
            filtered.map((item) => {
              return (
                <div className="service" >
                  <div className="prdimag"><img src={item.image} alt={item.name} /></div>

                  <h3>{item.name}</h3>
                  <p>RS. {item.amount}</p>
                  {/* <p><strong className={item.category == "Veg" ? "veg" : "nonveg"}>{item.category}</strong></p> */}
                  <p>{item.decription}</p>

                  <button className="btn" onClick={() => {
                  
                    alert(`${item.name} has been added to cart`);

                    addToCart([...cart, item]);
                    console.log(item, 'item');
                  }}
                  >
                    Add to basket
                  </button>

                </div>

              );
            })}
        </div>

        {props.toshow ? (
          <div className=" cart-cont">
            <div className="cart-list">
              <h1>Cart</h1>
              {/* cart items */}
              <div className="row">
              {cart && cart.map((item, index) => {
                return (
                  <div className="service" >
                  <div className="prdimag"><img src={item.image} alt={item.name} /></div>

                  <h3>{item.name}</h3>
                  <p>RS. {item.amount}</p>
                  {/* <p><strong className={item.category == "Veg" ? "veg" : "nonveg"}>{item.category}</strong></p> */}
                  <p>{item.decription}</p>

                  <button className="btn" onClick={(e) => {
                      // remove item from cart
                      cart.splice(index, 1);
                      let x = cart;
                      addToCart([...x]);
                    }} >Remove Item</button>

                </div>
                  
                );
              })}
              </div>
            </div>
            <div className="total">
              <h1>Total</h1>
              <p>Rs. {cart.reduce((a, b) => a + b.amount, 0)}</p>
              
              {isCheckout && <button className="btn" onClick={CheckoutHandler}>Check out</button>}

            </div>
            {!isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={hideCartHandler}/>}
          </div>
          
        ) : null}
      </section>
    </div>
  );
}

export default Food;
