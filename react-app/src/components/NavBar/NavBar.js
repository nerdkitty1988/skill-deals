import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import { useSelector } from "react-redux";
import "./NavBar.css"

const NavBar = () => {
	const sessionUser = useSelector((state) => state.session.user);
	return (
		<div className="navContainer">
			<nav id="navbar" hidden={!sessionUser}>
				<div className="navbarLinks">
					<NavLink to="/" exact={true} className="homeNav" />
					<LogoutButton />
				</div>
			</nav>
		</div>
	);
};

export default NavBar;
