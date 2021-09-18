import Logo from "../img/logo.png";

import React from "react";

export const Header = ({ menus, selectedIndex, onMenuChange }) => (
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
                    {menus.map((menu, index) => (
                        <li
                            key={`menu_${menu.id}`}
                            className={`nav-item show-only-large-devices ${
                                index === selectedIndex ? "active" : ""
                            }`}
                            onClick={() => onMenuChange(index)}
                        >
                            <div className={`nav-link ${menu.id}`}>
                                {menu.img ? <img src={menu.img} /> : <i className="zmdi zmdi-assignment" />}
                                {menu.name}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    </div>
);
