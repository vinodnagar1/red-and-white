import React, { useEffect } from "react";
import { useSelector, userreducer } from "react-redux";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

function Cart() {
  const users = useSelector((state) => state.userreducer.user);
  function remove(ele) {
    axios.defaults = true;
    axios
      .delete("http://localhost:8000/api/cart/deleteitemfromcart", ele.item._id)
      .then((data) => {
        console.log(data.data);
        toast.delete("item removed from cart successfully");
      })
      .catch((err) => {
        // alert(err.message)//
        console.log(err);
      });
  }
  function removeall() {
    axios.defaults = true;
    axios
      .delete("http://localhost:8000/api/cart/clearcart")
      .then((data) => {
        console.log(data.data);
        toast.delete("cart removed successfully");
      })
      .catch((err) => {
        // alert(err.message)//
        console.log(err);
      });
  }
  return (
    <>
      <center>
        <h1> Shopping cart</h1>
        {users && users.cart.length > 0 ? (
          users.cart.map((ele) => {
            return (
              <>
                <div className="top">
                  <div className="cart">
                    <img
                      src={ele.item.avatar}
                      id="im2"
                    />
                    <p id="pri">${ele.item.price}</p>
                    <p id="quan">quantity {ele.item.quantity}</p>
                    <button id="butre" onClick={() => remove(ele)}>
                      Remove
                    </button>
                  </div>
                </div>
              </>
            );
          })
        ) : (
          <h1>your cart is empty please do some shopping</h1>
        )}

        <p id="total">
          Total:
          {users.cart.reduce(function (accum, res) {
            return accum + res.item.price;
          }, 0)}
        </p>
        <button id="rmal " onClick={() => removeall()}>
          Remove all
        </button>
        <button id="byal">buy all</button>
      </center>
      <Toaster />
    </>
  );
}

export default Cart;
