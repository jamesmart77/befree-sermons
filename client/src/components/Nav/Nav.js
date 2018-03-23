import React from "react";

// materialize navbar
const Nav = () => (
    <header>
        <nav className="white">
            {/* <!-- Navigation Bar --> */}
            <div className="nav-wrapper">
                <a className="logo-wrapper" href="/"><img className="header-logo" src="assets/img/logo.png"  alt="logo"/></a>
                <ul id="nav-mobile" className="right">
                    <li><a className="nav-link" href="admin">Admin Login</a></li>
                </ul>
            </div>
        </nav>
    </header>
    )


export default Nav;
