import React from "react";
import { useHistory } from "react-router-dom";
import Search from "./Search";
import "./style/nav.css"
const Nav = () => {
    const history = useHistory()
    return (
        <ul className="navbar">
            <li className="nav-items" onClick={() => history.push('/')}>
                My Weather App</li>
            <li className="nav-items">
                <Search />
            </li>
        </ul>
    )
}

export default Nav
