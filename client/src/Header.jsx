import React, { useContext, useState } from "react";
import { Usercontext } from "./context/usercontext";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { userlogout } from "./Reducer";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { NavLink } from "react-router-dom";

function Header() {
  const [arr, setarr] = useState("");
  const [Liopen, setLiopen] = false;
  const users = useSelector((state) => state.userreducer.user);
  const dispatch = useDispatch(userlogout);
  const navigate = useNavigate();
  console.log(users);
  function click() {
    dispatch(null);
    toast.success("user loggedout succesfully");
    navigate("/");
  }
  function change(e) {
    setarr(e.target.value);
  }

  return (
    <>
      <div id="main">
        <Link to="/">
          <img
            src={require("C:/Users/Vinod nagar/Downloads/logo_lens-1.png")}
            id="logo"
          />
        </Link>
        <Link to="/">
          <p id="home">Home</p>
        </Link>
        <input id="in1" name="search" onChange={change()}></input>
        <i class="fa fa-search" aria-hidden="true"></i>
        <Link to={users ? "/cart" : "/login"}>
          <i class="fa fa-shopping-cart" aria-hidden="true"></i>
        </Link>

        {users ? (
          <p id="aaa">
            {users.cart.reduce(function (acc, res) {
              return acc + res.quantity;
            }, 0)}
          </p>
        ) : (
          <p id="aaa"></p>
        )}
        {users ? (
          <p id="singup" onClick={click()}>
            Logout
          </p>
        ) : (
          <Link to="/signup">
            <p id="singup">Signup</p>
          </Link>
        )}
        {users ? (
          <>
            <p id="name">Vinod</p>

            <img src={users.avatar} id="im1" />
          </>
        ) : (
          <i className="fa-solid fa-user-tie"></i>
        )}
      </div>
      <ul>
        {users &&
          users.cart
            .filter((product) =>
              product.title.toLowerCase().includes(arr.toLowerCase())
            )
            .map((product) => (
              <li>
                <NavLink
                  to={`/getproductsone/${product._id}`}
                  onClick={() => setLiopen(true)}
                >
                  {product.title}
                </NavLink>
              </li>
            ))}
      </ul>
      <Toaster />
    </>
  );
}

export default Header;
