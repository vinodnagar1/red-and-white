import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

function Signup() {
  const navigate = useNavigate();
  const [obj, setobj] = useState({
    username: "",
    avatar: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    education: "",
  });
  function newchange(e) {
    let arr = [];
    arr.push(e.target.checked);
    setobj((pre) => {
      return { ...pre, education: arr };
    });
  }
  function Submit(e) {
    e.preventDefault();
    if (obj.username.length < 2) {
      return toast.error("username must be atleast 2 characters long");
    }
    if (obj.email.length === 0) {
      return toast.error("email is required");
    }
    if (
      !obj.email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      return toast.error("not a valid email  ");
    }
    let pattern = "^[+]{1}(?:[0-9\\-\\(\\)\\/" + "\\.]\\s?){6,15}[0-9]{1}$";
    if (!obj.phone.match(pattern)) {
      return toast.error("not a valid phone number  ");
    }

    axios.defaults.withCredentials = true;
    const formdata = new FormData();
    formdata.append("username", obj.username);
    formdata.append("phone", obj.phone);
    formdata.append("password", obj.password);
    formdata.append("email", obj.email);
    formdata.append("gender", obj.gender);
    formdata.append("avatar", obj.avatar);
    formdata.append("education", obj.education);
    console.log(obj);

    // formdata.append("avatar",obj.avatar)
    axios
      .post("http://localhost:8000/api/users/register", obj)
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
  function Change(e) {
    setobj((pre) => {
      return { ...pre, [e.target.name]: e.target.value };
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
            <b>Username</b>
          </label>
          <label for="email">
            <b>Email</b>
          </label>

          <label for="password">
            <b>Password</b>
          </label>

          <label for="psw-repeat">
            <b>confirm password </b>
          </label>
          <label for="phone">
            <b>phone</b>
          </label>
          <label for="avatar">
            <b>upload image</b>
          </label>

          <label></label>
          <input
            type="text"
            placeholder="enter username"
            name="username"
            onChange={Change()}
            required
          />
          <input
            type="email"
            placeholder="Enter Email"
            name="email"
            onChange={Change()}
            required
          />
          <p>
            By creating an account you agree to our{" "}
            <a href="#" style={{ color: "dodgerblue" }}>
              Terms & Privacy
            </a>
            .
          </p>

          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            onChange={Change()}
            required
          />
          <input
            type="tel"
            placeholder="Enter phone number"
            name="phone"
            onChange={Change()}
            required
          />
          <div class="clearfix">
            <button type="button" class="cancelbtn">
              Cancel
            </button>
            <input
              type="password"
              placeholder="Repeat Password"
              name="psw-repeat"
              required
            />
            <input
              type="radio"
              id="html"
              name="gender"
              value="Male"
              onChange={Change()}
              required
            />
            <label for="html">Male</label>
            <br />
            <input
              type="radio"
              id="css"
              name="gender"
              value="Female"
              onChange={Change()}
              required
            />
            <label for="css">Female</label>
            <br />
            <input
              type="radio"
              id="javascript"
              name="gender"
              value="other"
              onChange={Change()}
              required
            />
            <label for="javascript">other</label>
            <br />
            <input
              type="checkbox"
              id="vehicle1"
              name="graduation"
              onChange={newchange()}
              required
              value="graduation"
            />
            <label for="vehicle1"> graduation</label>
            <br />
            <input
              type="checkbox"
              id="vehicle2"
              name="postgraduation"
              onChange={newchange()}
              required
              value="postgraduation"
            />
            <label for="vehicle2"> postgraduation</label>
            <br />
            <input
              type="checkbox"
              id="vehicle3"
              name="inter"
              onChange={newchange()}
              value="inter"
              required
            />
            <label for="vehicle3"> inter</label>
            <br></br>
            <input
              type="file"
              onChange={(e) =>
                setobj((pre) => {
                  return { ...pre, avatar: e.target.value };
                })
              }
              name="avatar"
            />
            <button type="submit" class="signupbtn">
              Sign Up
            </button>
            <button
              onClick={() => {
                navigate("/login");
              }}
              class="signupbtn"
            >
              Already have an account? login here{" "}
            </button>
          </div>
        </div>
      </form>
      <Toaster />
    </div>
  );
}

export default Signup;
