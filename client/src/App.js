import logo from "./logo.svg";
import "./App.css";
import Header from "./Header";
import Main from "./Main";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import  Usercontextprovider  from "./context/usercontext.js";

function App() {
  return (
    <> <Header />

    <Outlet />
    <Footer /></>
     
    
  );
}

export default App;
