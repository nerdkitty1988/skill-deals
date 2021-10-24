import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import { useSelector } from "react-redux";
import "./NavBar.css"
import { logout } from "../../store/session";

const NavBar = () => {
	const sessionUser = useSelector((state) => state.session.user);
	return (
		<div className="navContainer">
			<nav id="navbar" hidden={!sessionUser}>
				<div className="navbarLinks">
					<NavLink to="/" exact={true} className="homeNav"><img src="https://github.com/nerdkitty1988/skill-deals/blob/main/react-app/src/components/NavBar/logo.jpg?raw=true" alt="logo" id="navLogo" /></NavLink>
                    <NavLink to="/offers" exact={true} className="navbarButtons">Offers</NavLink>
                    <NavLink to="/requests" exact={true} className="navbarButtons">Requests</NavLink>
                    <NavLink to={`/user/${sessionUser?.id}`} exact={true} className="navbarButtons">{sessionUser?.username}'s Profile</NavLink>
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
					<LogoutButton />
				</div>
			</nav>
		</div>
	);
};

export default NavBar;
