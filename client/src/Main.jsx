import { click } from "@testing-library/user-event/dist/click";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

function Main() {
  const [arr, setarr] = useState("");
  const navigate = useNavigate();
  const users = useSelector((state) => state.userreducer.user);
  useEffect(() => {
    axios.defaults = true;
    axios
      .get("http://localhost:8000/api/cart/getproducts")
      .then((data) => {
        setarr(data.data);
      })
      .catch((err) => {
        // alert(err.message)//
        console.log(err);
      });
  }, []);
  function click(ele) {
    if (!users) {
      navigate("/login");
    } else {
      axios.defaults = true;
      axios
        .post("http://localhost:8000/api/cart/addtocart", ele)
        .then((data) => {
          console.log(data.data);
          toast.success("item added into cart succesfully");
        })
        .catch((err) => {
          // alert(err.message)//
          console.log(err);
        });
    }
  }
  return (
    <>
      {arr && arr.length > 0 ? (
        arr.map((ele, index) => {
          return (
            <>
              <div class="card" key={ele._id}>
                <img
                  src={ele.image}
                  alt="Denim Jeans"
                  style={{ width: "100%", height: "200px" }}
                />

                <p class="title">{ele.title}</p>
                <p class="rating">{ele.rating} *</p>
                <p class="price">${ele.price}</p>
                <p class="price">{ele.size}</p>

                <p>
                  <button onClick={() => click(ele)}>Add to Cart</button>
                </p>
              </div>
            </>
          );
        })
      ) : (
        <h>Loading...</h>
      )}
      <Toaster />
    </>
  );
}

export default Main;
