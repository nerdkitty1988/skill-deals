import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import { useSelector } from "react-redux";
import { useState } from "react";
import "./NavBar.css";
import ReactModal from "react-modal";
import TradeForm from "../NewTrade/NewTrade"

const NavBar = () => {
	const [showCreateModal, setShowCreateModal] = useState(false);
	const sessionUser = useSelector((state) => state.session.user);

	return (
		<div className="navContainer">
			<nav id="navbar" hidden={!sessionUser}>
				<div className="navbarLinks">
					<NavLink to="/" exact={true} className="homeNav">
						<img
							src="https://github.com/nerdkitty1988/skill-deals/blob/main/react-app/src/components/NavBar/logo.jpg?raw=true"
							alt="logo"
							id="navLogo"
						/>
					</NavLink>
					<NavLink
						to="/offers"
						exact={true}
						className="navbarButtons"
					>
						All Offers
					</NavLink>
					<NavLink
						to="/requests"
						exact={true}
						className="navbarButtons"
					>
						All Requests
					</NavLink>
					<NavLink
						to={`/users/${sessionUser?.id}`}
						exact={true}
						className="navbarButtons"
					>
						{sessionUser?.username}'s Profile
					</NavLink>
					<button
						className="navbarButtons"
						id="addCard"
						onClick={() => setShowCreateModal(true)}
					>
						Add Offer or Request <i className="fas fa-plus-circle"></i>
					</button>
					<ReactModal
						isOpen={showCreateModal}
						contentLabel="CreateModal"
						className="loginModal"
					>
						<TradeForm setShowCreateModal = {setShowCreateModal}/>
						<button
							className="windowCloseButton"
							onClick={() => setShowCreateModal(false)}
						>
							<i className="fas fa-window-close"></i>
						</button>
					</ReactModal>
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
