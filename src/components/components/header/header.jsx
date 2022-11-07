import React from "react"
import logo from "./../../../images/logo.png"
import styles from "./header.module.css"

const Header = () => {
    return (
        <nav>
            <ul>
                <li>
                    <img src={logo} alt="logo"/>
                </li>
            </ul>
        </nav>
    )
}

export default Header;
