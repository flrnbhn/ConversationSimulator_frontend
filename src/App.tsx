import React from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import {Main} from "./layouts/main/Main";
import {NavBar} from "./components/navbar/NavBar";
import {useLocation} from "react-router";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <LayoutWithNavbar/>
            </BrowserRouter>
        </div>
    );
}

function LayoutWithNavbar() {
    const location = useLocation();
    const hideNavbar = location.pathname === '/login' || location.pathname === '/registration' || location.pathname === '/chat';

    return (
        <>
            {!hideNavbar && <NavBar/>}
            <Main/>
        </>
    );
}

export default App;
