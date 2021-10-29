import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import './NavDrop.css'

function NavDrop() {
	const [showDrop, setShowDrop] = useState(false);
	const sessionUser = useSelector((state) => state.session?.user);
	const userId = sessionUser?.id;

	const dropDown = () => {
		setShowDrop(true);
	};
	useEffect(() => {
		if (!showDrop) return;

		const closeDrop = () => {
			setShowDrop(false);
		};

		document.addEventListener("click", closeDrop);

		return () => document.removeEventListener("click", closeDrop);
	}, [showDrop]);

	return (
		<>
			<div className="profileButtonDiv">
				<img
					src={sessionUser.profilePic}
					id="navProfilePic"
					alt="avatar"
					onClick={dropDown}
				/>
				{showDrop && (
					<div id="profileNav">
						<ul className="profile-dropdown">
							<li>
								<NavLink
									to={`/users/${sessionUser?.id}`}
									exact={true}
									className="navbarDropList"
								>
									{sessionUser?.username}'s Profile
								</NavLink>
							</li>
							<li>
								<NavLink
									to={`/chats`}
									exact={true}
									className="navbarDropList"
								>
									{sessionUser?.username}'s Messages
								</NavLink>
							</li>
						    <LogoutButton />
						</ul>
					</div>
				)}
			</div>
		</>
	);
}


export default NavDrop;
