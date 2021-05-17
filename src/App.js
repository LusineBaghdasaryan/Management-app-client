import React from 'react';
import {ToastContainer, Flip, toast} from 'react-toastify';
// Redux
import {useSelector} from "react-redux";

// Components
import Header from "./components/Header";
import Clients from "./components/Clients";
import Footer from "./components/Footer";

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';



function App() {
    
    const {error} = useSelector(state => state);
    !!error && toast.error(`${error}`)
    return (
            <div className="App">
                <Header/>
                <Clients/>
                <Footer/>
                <ToastContainer autoClose={2500} transition={Flip}/>
            </div>
    
    );
}

export default App;
