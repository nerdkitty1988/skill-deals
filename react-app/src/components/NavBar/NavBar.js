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
                    <NavLink to="/offers" exact={true} className="navbarButtons">Offers</NavLink>
                    <NavLink to="/requests" exact={true} className="navbarButtons">Requests</NavLink>
                    <NavLink to="/user" exact={true} className="navbarButtons">{sessionUser.username}'s Page</NavLink>
                    <form
						id="header-search-form"
						className="site-search-form"
						title="Search Site"
					>
						<label className="sr-only">Enter search term</label>
						<input
							className="input-medium site-search-input"
							id="site-search-input"
							type="text"
							placeholder="Find..."
						/>
						<button className="submit-btn" type="button">
							<i className="fas fa-search-dollar"></i>
						</button>
					</form>
                    <i className="fas fa-plus"></i>
					<LogoutButton />
				</div>
			</nav>
		</div>
	);
};

export default NavBar;
