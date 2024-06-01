import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

function Login() {
  const [obj, setobj] = useState({
    username: "",

    password: "",
  });
  const navigate = useNavigate();
  function Change(e) {
    setobj((pre) => {
      return { ...pre, [e.target.name]: e.target.value };
    });
  }
  function Submit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/users/login", obj)
      .then((result) => {
        console.log(result.data);
        if (result.data?.error) {
          toast.error(result.data.error);
        } else {
          toast.success(result.data.message);
        }
      })
      .catch((err) => {
        alert(err);
      });
  }
  return (
    <div>
      <form onSubmit={Submit()} style={{ border: "1px solid #ccc" }}>
        <div class="container">
          <h1>Sign Up</h1>
          <p>Please fill in this form to create an account.</p>
          <hr />
          <label for="username">
            <b>Username or email</b>
          </label>

          <label for="password">
            <b>Password</b>
          </label>

          <label for="psw-repeat">
            <b>confirm password </b>
          </label>
          <input
            type="text"
            placeholder="enter username"
            name="username"
            onChange={Change()}
            required
          />
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            onChange={Change()}
          />
          <button type="submit" class="signupbtn">
            Login
          </button>
          <button
            onClick={() => {
              navigate("/signup");
            }}
            class="signupbtn"
          >
            Dont have an account? Sign up here{" "}
          </button>
        </div>
      </form>
      <Toaster />
    </div>
  );
}

export default Login;
