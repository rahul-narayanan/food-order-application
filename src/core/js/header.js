import Logo from "../img/logo.png";

import React from "react";
import { Menus } from "./constants";
import { Link, useLocation } from "react-router-dom";

export const Header = ({ hideMenus = false }) => {
    const location = useLocation();

    return (
        <div
            className="header animate__animated animate__fadeInDown wow"
            data-wow-duration=".5s"
        >
            <nav className="navbar align-items-center" style={{ flexWrap: "unset" }}>
                <div
                    className="nav-item  ml-lg-2 ml-xl-0 logo"
                    style={{ minWidth: "fit-content" }}
                >
                    <a className="navbar-brand nav-link px-0">
                        <img src={Logo} className="img-fluid" style={{ height: "60px" }} />
                    </a>
                </div>
                <div className="nav-inner ml-5 pl-4 w-100">
                    <ul className="navbar-nav d-flex align-items-center w-100">
                        {!hideMenus && Menus.map((menu) => (
                            <Link to={menu.route} key={`menu_${menu.id}`}>
                                <li className={`nav-item ${menu.route === location.pathname ? "active" : ""}`}>
                                    <div className={`nav-link ${menu.id}`}>
                                        {menu.img ? <img src={menu.img} /> : (menu.icon || "")}
                                        {menu.name}
                                    </div>
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>
            </nav>
        </div>
    );
};
